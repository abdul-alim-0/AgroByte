"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Search, ShoppingCart } from 'lucide-react';
import { Cart, CartItem } from '@/components/ui/cart';
import { Checkout } from '@/components/ui/checkout';
import { Orders, Order } from '@/components/ui/orders';
import { getOrdersByUser } from '@/lib/services/order.service';
import { useAuth } from '@/components/auth-provider';

// Sample product data
const products = [
  {
    id: '1',
    name: 'Fresh Organic Tomatoes',
    price: 2.99,
    seller: 'Green Valley Farms',
    sellerId: 'gvf123',
    location: 'Springfield, IL',
    image: 'https://images.pexels.com/photos/5529599/pexels-photo-5529599.jpeg',
    category: 'vegetables',
    stock: 50,
  },
  {
    id: '2',
    name: 'Premium Rice (25kg)',
    price: 42.50,
    seller: 'Golden Harvest Co.',
    sellerId: 'ghc456',
    location: 'Sacramento, CA',
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
    category: 'grains',
    stock: 100,
  },
  {
    id: '3',
    name: 'Heirloom Apple Variety Pack',
    price: 15.99,
    seller: 'Hillside Orchards',
    sellerId: 'ho789',
    location: 'Eugene, OR',
    image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg',
    category: 'fruits',
    stock: 30,
  },
  {
    id: '4',
    name: 'Handheld Garden Tiller',
    price: 29.99,
    seller: 'AgriTools Shop',
    sellerId: 'ats101',
    location: 'Columbus, OH',
    image: 'https://images.pexels.com/photos/369267/pexels-photo-369267.jpeg',
    category: 'tools',
    stock: 15,
  },
  {
    id: '5',
    name: 'Organic Fertilizer (10kg)',
    price: 18.75,
    seller: 'Natural Growth Inc.',
    sellerId: 'ngi202',
    location: 'Portland, OR',
    image: 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg',
    category: 'supplies',
    stock: 200,
  },
  {
    id: '6',
    name: 'Artisanal Honey (1L)',
    price: 22.50,
    seller: 'Sunny Apiaries',
    sellerId: 'sa303',
    location: 'Austin, TX',
    image: 'https://images.pexels.com/photos/1027810/pexels-photo-1027810.jpeg',
    category: 'specialty',
    stock: 40,
  }
];

export default function MarketplaceClient() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      setOrdersLoading(true);
      getOrdersByUser(user.id)
        .then((data) => setOrders(data || []))
        .finally(() => setOrdersLoading(false));
    }
  }, [user?.id]);
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        sellerId: product.sellerId,
      }];
    });

    toast({
      title: 'Added to cart',
      description: 'This product has been added to your cart.',
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handlePaymentComplete = () => {
    setCartItems([]);
    setIsCheckoutOpen(false);
    toast({
      title: 'Order placed successfully',
      description: 'Thank you for your purchase!',
    });
  };
  
  return (
    <main className="flex-1 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Agricultural Marketplace</h1>
          <div className="flex gap-4">
            <Cart
              items={cartItems}
              onRemoveItem={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              onCheckout={handleCheckout}
            />
            <Orders orders={orders} loading={ordersLoading} />
            <Button className="w-full md:w-auto" onClick={() => toast({ title: "Create listing feature coming soon" })}>
              Sell Your Products
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, sellers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="grains">Grains</SelectItem>
              <SelectItem value="tools">Tools</SelectItem>
              <SelectItem value="supplies">Supplies</SelectItem>
              <SelectItem value="specialty">Specialty</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No products found</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden card-hover">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>{product.seller}</p>
                    <p>{product.location}</p>
                    <p className="mt-1">Stock: {product.stock} units</p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" className="flex-1 mr-2" onClick={() => toast({ title: "View details coming soon" })}>
                    Details
                  </Button>
                  <Button className="flex-1" onClick={() => handleAddToCart(product.id)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onPaymentComplete={handlePaymentComplete}
      />
    </main>
  );
} 