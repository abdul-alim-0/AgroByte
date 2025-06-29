import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function LandingCTA() {
  return (
    <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Join the Global Agricultural Community
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl/relaxed">
              Connect with farmers, buyers, and agricultural experts from around the world. 
              Share knowledge, trade products, and grow together.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 min-[400px]:flex-row justify-center">
            <Button size="lg" variant="secondary" className="min-w-[140px]" asChild>
              <Link href="/auth/signup">Sign Up Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="min-w-[140px] text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}