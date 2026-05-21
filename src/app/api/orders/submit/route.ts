import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customer_name,
      phone,
      email,
      address,
      products,
      amount,
      utr_number,
      screenshot_url,
    } = body;

    // Validate request inputs
    if (!customer_name || !phone || !email || !address || !products || !amount) {
      return NextResponse.json(
        { error: "Missing required order fields" },
        { status: 400 }
      );
    }

    if (!utr_number && !screenshot_url) {
      return NextResponse.json(
        { error: "Either UTR number or screenshot upload is required" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase environment variables are missing");
      return NextResponse.json(
        { error: "Database configuration error" },
        { status: 500 }
      );
    }

    // 1. Insert order into the Supabase database using REST API
    const dbRes = await fetch(`${supabaseUrl}/rest/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        customer_name,
        phone,
        email,
        address,
        products,
        amount,
        utr_number,
        screenshot_url,
        payment_status: "PENDING",
      }),
    });

    if (!dbRes.ok) {
      const dbErr = await dbRes.text();
      console.error("Failed to insert order into Supabase database:", dbErr);
      return NextResponse.json(
        { error: `Database insert failed: ${dbErr}` },
        { status: 500 }
      );
    }

    const dbData = await dbRes.json();
    const orderRecord = dbData[0];

    // Prepare notifications status tracker
    const notifications = {
      whatsapp: false,
      email: false,
    };

    // 2. Trigger Twilio WhatsApp Notification
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";
    const twilioTo = process.env.TWILIO_WHATSAPP_TO || "whatsapp:+918946097349";

    if (twilioSid && twilioAuthToken) {
      try {
        const formattedProducts = products
          .map((p: any) => `${p.name} (Qty: ${p.quantity})`)
          .join(", ");

        const messageBody = `🛒 New Order Received

Customer: ${customer_name}
Phone: ${phone}
Amount: ₹${amount.toFixed(2)}
Products: ${formattedProducts}
UTR: ${utr_number || "N/A"}
Screenshot: ${screenshot_url || "N/A"}`;

        const authString = Buffer.from(`${twilioSid}:${twilioAuthToken}`).toString("base64");
        
        // URL encoded body for Twilio
        const params = new URLSearchParams();
        params.append("From", twilioFrom);
        params.append("To", twilioTo);
        params.append("Body", messageBody);

        const twilioRes = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${authString}`,
            },
            body: params.toString(),
          }
        );

        if (twilioRes.ok) {
          notifications.whatsapp = true;
        } else {
          const twilioErr = await twilioRes.text();
          console.error("Twilio API responded with error:", twilioErr);
        }
      } catch (e) {
        console.error("Failed to send Twilio WhatsApp notification:", e);
      }
    } else {
      console.warn("Twilio credentials missing. Skipping WhatsApp notification.");
    }

    // 3. Trigger Resend Email Notification
    const resendApiKey = process.env.RESEND_API_KEY;
    const merchantEmail = process.env.MERCHANT_EMAIL || "selvakumarsrinivasan17@gmail.com";

    if (resendApiKey) {
      try {
        const emailHtml = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0c0c0e; color: #ffffff; padding: 20px; margin: 0; }
    .card { background-color: #16161a; border: 1px solid #27272a; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); }
    .header { border-bottom: 2px solid #ff9900; padding-bottom: 15px; margin-bottom: 20px; }
    .title { color: #ff9900; margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
    .detail-row { margin-bottom: 12px; font-size: 14px; line-height: 1.5; }
    .label { color: #a1a1aa; font-weight: bold; width: 140px; display: inline-block; }
    .value { color: #ffffff; }
    .product-table { width: 100%; border-collapse: collapse; margin-top: 25px; margin-bottom: 25px; }
    .product-table th, .product-table td { border-bottom: 1px solid #27272a; padding: 12px; text-align: left; }
    .product-table th { color: #a1a1aa; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    .product-table td { font-size: 14px; }
    .price-total { font-size: 20px; font-weight: 900; color: #ff9900; }
    .btn { display: inline-block; background-color: #ff9900; color: #000000; font-weight: bold; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 15px; text-align: center; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2 class="title">🛒 New Order Received</h2>
    </div>
    <div style="margin-top: 10px;">
      <div class="detail-row"><span class="label">Customer Name:</span> <span class="value">${customer_name}</span></div>
      <div class="detail-row"><span class="label">Phone:</span> <span class="value">${phone}</span></div>
      <div class="detail-row"><span class="label">Email:</span> <span class="value">${email}</span></div>
      <div class="detail-row"><span class="label">Address:</span> <span class="value">${address}</span></div>
      <div class="detail-row"><span class="label">UTR Number:</span> <span class="value" style="font-family: monospace; background: #27272a; padding: 2px 6px; border-radius: 4px;">${utr_number || "N/A"}</span></div>
    </div>
    
    <table class="product-table">
      <thead>
        <tr>
          <th>Product</th>
          <th style="width: 50px; text-align: center;">Qty</th>
          <th style="width: 100px; text-align: right;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${products
          .map(
            (p: any) => `
          <tr>
            <td style="color: #ffffff; font-weight: bold;">${p.name}</td>
            <td style="color: #ffffff; text-align: center;">${p.quantity}</td>
            <td style="color: #ff9900; text-align: right; font-weight: bold;">₹${p.price.toFixed(2)}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
    
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #27272a; padding-top: 15px; margin-bottom: 20px;">
      <span style="font-size: 16px; font-weight: bold; color: #ffffff; text-transform: uppercase;">Total Amount:</span>
      <span class="price-total">₹${amount.toFixed(2)}</span>
    </div>
    
    ${
      screenshot_url
        ? `
      <div style="text-align: center; margin-top: 30px; border-top: 1px dashed #27272a; padding-top: 20px;">
        <p class="label" style="margin-bottom: 12px; width: auto; display: block; font-size: 13px;">Payment Verification Image:</p>
        <a href="${screenshot_url}" target="_blank" class="btn">View Screenshot</a>
      </div>
    `
        : ""
    }
  </div>
</body>
</html>`;

        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "SS Fitness Solutions <onboarding@resend.dev>",
            to: [merchantEmail],
            subject: `🛒 New Order Received - ₹${amount.toFixed(2)} (${customer_name})`,
            html: emailHtml,
          }),
        });

        if (resendRes.ok) {
          notifications.email = true;
        } else {
          const resendErr = await resendRes.text();
          console.error("Resend API responded with error:", resendErr);
        }
      } catch (e) {
        console.error("Failed to send email via Resend:", e);
      }
    } else {
      console.warn("Resend API key missing. Skipping email notification.");
    }

    return NextResponse.json({
      success: true,
      order: orderRecord,
      notifications,
    });
  } catch (error: any) {
    console.error("ORDER_SUBMIT_ERROR", error);
    return NextResponse.json(
      { error: `Internal server error: ${error?.message || error || "Unknown error"}` },
      { status: 500 }
    );
  }
}
