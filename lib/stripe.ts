import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

export const stripe = loadStripe(stripePublicKey);

// This is a placeholder function - you'll need to implement the actual API route
export const createPaymentIntent = async (amount: number) => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}; 