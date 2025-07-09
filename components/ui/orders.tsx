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
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

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

// Helper to generate and download PDF invoice for an order
async function generateInvoicePDF(order: Order) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 600]);
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let y = height - 40;

  // Header
  page.drawText('INVOICE', { x: 30, y, size: 24, font, color: rgb(0, 0.5, 0) });
  y -= 40;
  page.drawText(`Order ID: ${order.id.slice(-8)}`, { x: 30, y, size: 12, font });
  y -= 20;
  page.drawText(`Date: ${new Date(order.created_at).toLocaleDateString()}`, { x: 30, y, size: 12, font });
  y -= 20;
  page.drawText(`Status: ${order.status}`, { x: 30, y, size: 12, font });
  y -= 20;
  page.drawText(`Total: $${order.total_amount.toFixed(2)}`, { x: 30, y, size: 12, font });
  y -= 30;

  // Table header
  page.drawText('Items:', { x: 30, y, size: 14, font });
  y -= 20;
  page.drawText('Product', { x: 30, y, size: 12, font });
  page.drawText('Qty', { x: 180, y, size: 12, font });
  page.drawText('Unit Price', { x: 230, y, size: 12, font });
  page.drawText('Total', { x: 320, y, size: 12, font });
  y -= 15;
  page.drawLine({ start: { x: 30, y }, end: { x: 370, y }, thickness: 1, color: rgb(0.8,0.8,0.8) });
  y -= 10;

  // Items
  order.order_items.forEach(item => {
    page.drawText(item.product_id, { x: 30, y, size: 11, font });
    page.drawText(String(item.quantity), { x: 180, y, size: 11, font });
    page.drawText(`$${item.unit_price.toFixed(2)}`, { x: 230, y, size: 11, font });
    page.drawText(`$${(item.unit_price * item.quantity).toFixed(2)}`, { x: 320, y, size: 11, font });
    y -= 15;
  });

  // Footer
  y -= 30;
  page.drawText('Thank you for your purchase!', { x: 30, y, size: 13, font, color: rgb(0,0.4,0.2) });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Invoice_${order.id.slice(-8)}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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
                    <Button size="sm" variant="outline" className="ml-2" onClick={() => generateInvoicePDF(order)}>
                      🧾 Invoice
                    </Button>
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