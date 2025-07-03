import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createOrder, createPayment } from '@/lib/services/order.service';
import { CartItem } from '@/components/ui/cart';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

interface CreatePaymentIntentBody {
  amount: number;
  userId: string;
  items: CartItem[];
  shippingAddress: string;
  contactEmail: string;
  contactPhone: string;
  contactName: string;
}

export async function POST(req: Request) {
  try {
    const body: CreatePaymentIntentBody = await req.json();
    const { amount, userId, items, shippingAddress, contactEmail, contactPhone, contactName } = body;

    // Create order first
    const order = await createOrder({
      userId,
      items,
      totalAmount: amount,
      shippingAddress,
      contactEmail,
      contactPhone,
      contactName,
    });

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amounts in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: order.id,
      },
    });

    // Create payment record
    await createPayment({
      orderId: order.id,
      amount,
      paymentIntentId: paymentIntent.id,
      paymentMethod: 'card', // Default to card, will be updated after payment completion
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    );
  }
} 