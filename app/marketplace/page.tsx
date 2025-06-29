"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
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

// Sample product data
const products = [
  {
    id: '1',
    name: 'Fresh Organic Tomatoes',
    price: 2.99,
    seller: 'Green Valley Farms',
    location: 'Springfield, IL',
    image: 'https://images.pexels.com/photos/5529599/pexels-photo-5529599.jpeg',
    category: 'vegetables',
  },
  {
    id: '2',
    name: 'Premium Rice (25kg)',
    price: 42.50,
    seller: 'Golden Harvest Co.',
    location: 'Sacramento, CA',
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg',
    category: 'grains',
  },
  {
    id: '3',
    name: 'Heirloom Apple Variety Pack',
    price: 15.99,
    seller: 'Hillside Orchards',
    location: 'Eugene, OR',
    image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg',
    category: 'fruits',
  },
  {
    id: '4',
    name: 'Handheld Garden Tiller',
    price: 29.99,
    seller: 'AgriTools Shop',
    location: 'Columbus, OH',
    image: 'https://images.pexels.com/photos/369267/pexels-photo-369267.jpeg',
    category: 'tools',
  },
  {
    id: '5',
    name: 'Organic Fertilizer (10kg)',
    price: 18.75,
    seller: 'Natural Growth Inc.',
    location: 'Portland, OR',
    image: 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg',
    category: 'supplies',
  },
  {
    id: '6',
    name: 'Artisanal Honey (1L)',
    price: 22.50,
    seller: 'Sunny Apiaries',
    location: 'Austin, TX',
    image: 'https://images.pexels.com/photos/1027810/pexels-photo-1027810.jpeg',
    category: 'specialty',
  }
];

export default function MarketplacePage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleAddToCart = (productId: string) => {
    toast({
      title: 'Added to cart',
      description: 'This product has been added to your cart.',
    });
  };
  
  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">Agricultural Marketplace</h1>
              
              <Button className="w-full md:w-auto" onClick={() => toast({ title: "Create listing feature coming soon" })}>
                Sell Your Products
              </Button>
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
        </main>
      </div>
    </div>
  );
}