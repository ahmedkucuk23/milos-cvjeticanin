import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.text();

  const event = JSON.parse(body);
  console.log("WHOP_EVENT:", JSON.stringify(event).slice(0, 1000));

  const eventAction = event.action ?? event.event ?? event.type ?? "unknown";
  console.log("WHOP_ACTION:", eventAction);

  if (!eventAction.includes("payment") || !eventAction.includes("succeeded")) {
    console.log("WHOP_SKIP: not a payment.succeeded, got:", eventAction);
    return NextResponse.json({ ok: true, skipped: eventAction });
  }

  const data = event.data ?? event.payload ?? event;
  const email = data?.email ?? data?.user?.email ?? undefined;
  const amount = data?.final_amount != null ? data.final_amount / 100 : 49.99;
  const currency = (data?.currency ?? "EUR").toUpperCase();

  console.log("WHOP_DATA: email=", email, "amount=", amount, "currency=", currency);

  // Hash email for Meta (SHA-256)
  let hashedEmail: string | undefined;
  if (email) {
    const encoder = new TextEncoder();
    const buf = await crypto.subtle.digest(
      "SHA-256",
      encoder.encode(email.trim().toLowerCase())
    );
    hashedEmail = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // Send to Meta Conversions API
  const pixelId = process.env.PIXEL_ID;
  const token = process.env.META_TOKEN;
  const testCode = process.env.META_TEST_CODE;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        user_data: {
          ...(hashedEmail ? { em: [hashedEmail] } : {}),
          client_user_agent: request.headers.get("user-agent") ?? "",
        },
        custom_data: {
          currency,
          value: amount,
          content_name: "Warrior Stand-Up Program",
        },
      },
    ],
  };

  if (testCode) {
    payload.test_event_code = testCode;
  }

  console.log("META_PAYLOAD:", JSON.stringify(payload));

  const metaRes = await fetch(
    `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const metaJson = await metaRes.json();
  console.log("META_RESPONSE:", JSON.stringify(metaJson));

  return NextResponse.json({ ok: true, meta: metaJson });
}
