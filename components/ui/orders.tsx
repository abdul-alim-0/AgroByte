import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Package } from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  seller_id: string;
  // Add more fields if needed
}

export interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  order_items: OrderItem[];
  payments?: any[];
}

interface OrdersProps {
  orders: Order[];
  loading: boolean;
}

export function Orders({ orders, loading }: OrdersProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Package className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>My Orders</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-muted-foreground">You have no orders yet.</p>
          ) : (
            <ScrollArea className="h-[60vh] pr-4">
              {orders.map((order) => (
                <div key={order.id} className="mb-6 border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Order #{order.id.slice(-6)}</span>
                    <span className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Status: <span className="font-semibold">{order.status}</span></span>
                    <span className="text-sm">Total: ${order.total_amount.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="space-y-2">
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        {/* Optionally show product image if available */}
                        {/* <Image src={item.image} alt={item.name} width={40} height={40} className="rounded" /> */}
                        <div className="flex-1">
                          <span className="font-medium">{item.product_id}</span>
                          <span className="ml-2 text-xs text-muted-foreground">Qty: {item.quantity}</span>
                        </div>
                        <span className="text-sm">${item.unit_price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
} 