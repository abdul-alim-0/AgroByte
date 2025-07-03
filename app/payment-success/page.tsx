"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // You can handle any post-payment tasks here
    // For example, clearing the cart, updating order status, etc.
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold">Payment Successful!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="space-y-4">
          <Button onClick={() => router.push('/marketplace')}>
            Return to Marketplace
          </Button>
          <div>
            <Button variant="link" onClick={() => router.push('/dashboard')}>
              View Order History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 