import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import Image from 'next/image';
import { LandingHero } from '@/components/landing/hero';
import { LandingFeatures } from '@/components/landing/features';
import { LandingTestimonials } from '@/components/landing/testimonials';
import { LandingCTA } from '@/components/landing/cta';
import { LandingFooter } from '@/components/landing/footer';
import { LandingHeader } from '@/components/landing/header';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingTestimonials />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}