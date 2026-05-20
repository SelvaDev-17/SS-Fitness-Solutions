import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "rzp_test_mock",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "secret_mock",
});

export async function POST(req: Request) {
  try {
    const { items, total, name, email, address, city, state, zip, phone } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    if (!name || !email || !address || !city || !state || !zip || !phone) {
      return NextResponse.json({ error: "Incomplete checkout details" }, { status: 400 });
    }

    // Find or create user dynamically by email
    let dbUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          name: name,
          email: email.toLowerCase(),
          role: "USER"
        }
      });
    } else if (name && dbUser.name !== name) {
      dbUser = await prisma.user.update({
        where: { id: dbUser.id },
        data: { name: name }
      });
    }

    // 1. Create a Razorpay Order
    const options = {
      amount: Math.round(total * 100), // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // 2. Save the order in the database
    const dbOrder = await prisma.order.create({
      data: {
        userId: dbUser.id,
        total: total,
        paymentId: order.id, // Store Razorpay order ID temporarily, update on success
        status: "PENDING",
        address,
        city,
        state,
        zip,
        phone,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      dbOrderId: dbOrder.id,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "rzp_test_mock"
    });
  } catch (error: any) {
    console.error("ORDER_CREATE_ERROR", error);
    return NextResponse.json(
      { error: `Failed to create order: ${error?.message || error || "Unknown error"}` },
      { status: 500 }
    );
  }
}
