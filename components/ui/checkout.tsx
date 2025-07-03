import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CartItem } from './cart';
import { useToast } from '@/hooks/use-toast';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripe as stripePromise, createPaymentIntent } from '@/lib/stripe';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/components/auth-provider';

interface CheckoutFormProps {
  clientSecret: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
  formData: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
}

function CheckoutForm({ clientSecret, amount, onSuccess, onCancel, formData }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          payment_method_data: {
            billing_details: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              address: {
                line1: formData.address,
              },
            },
          },
        },
        redirect: 'if_required',
      });

      if (error) {
        toast({
          title: 'Payment failed',
          description: error.message || 'An error occurred during payment.',
          variant: 'destructive',
        });
      } else if (paymentIntent.status === 'succeeded') {
        toast({
          title: 'Payment successful',
          description: 'Your order has been placed successfully.',
        });
        onSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Payment failed',
        description: 'An error occurred during payment.',
        variant: 'destructive',
      });
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Card Details</Label>
        <PaymentElement />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </Button>
      </div>
    </form>
  );
}

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onPaymentComplete: () => void;
}

export function Checkout({ isOpen, onClose, items, onPaymentComplete }: CheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && items.length > 0 && user) {
      createPaymentIntent({
        amount: total,
        userId: user.id,
        items,
        shippingAddress: formData.address,
        contactEmail: formData.email,
        contactPhone: formData.phone,
        contactName: formData.name,
      })
        .then(({ clientSecret }) => setClientSecret(clientSecret))
        .catch((error) => {
          console.error('Error:', error);
          toast({
            title: 'Error',
            description: 'Failed to initialize payment. Please try again.',
            variant: 'destructive',
          });
        });
    }
  }, [isOpen, items, total, user, formData, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] p-0">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-full max-h-[calc(90vh-4rem)] px-4 pb-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-medium">Order Summary</h4>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-medium pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm
                  clientSecret={clientSecret}
                  amount={total}
                  onSuccess={onPaymentComplete}
                  onCancel={onClose}
                  formData={formData}
                />
              </Elements>
            ) : (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
} 