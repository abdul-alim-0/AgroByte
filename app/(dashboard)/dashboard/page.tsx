"use client";

import React from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Feed } from '@/components/dashboard/feed';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/components/auth-provider';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    window.location.href = '/auth/login';
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 px-4 py-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}!</h1>
          <Feed />
        </main>
      </div>
    </div>
  );
}