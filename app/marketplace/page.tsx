import { Suspense } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import MarketplaceClient from './marketplace-client';

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <MarketplaceClient />
        </Suspense>
      </div>
    </div>
  );
}