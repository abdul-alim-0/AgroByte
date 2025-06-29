import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container px-4 md:px-6 mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
        <div className="flex flex-col justify-center space-y-4 flex-1 text-center lg:text-left">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Connecting Farmers, Buyers & Experts Worldwide
            </h1>
            <p className="mx-auto lg:mx-0 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              AgroByte is a global platform where agricultural communities thrive through knowledge sharing,
              commerce, and education.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mx-auto lg:mx-0 max-w-sm sm:max-w-none justify-center lg:justify-start">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Join Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/marketplace">Explore Marketplace</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 w-full max-w-3xl">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src="https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg"
              alt="Farmer using a digital tablet in a field"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
      
      <div className="container px-4 md:px-6 mx-auto mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M3 9.5a9 9 0 0 1 9-9 9 9 0 0 1 6 2.2M12 18.5a9 9 0 0 0 9-9 9 9 0 0 0-2.2-6" />
                <path d="M3 4.5a9 9 0 0 1 12-1" />
                <path d="M21 10.5a9 9 0 0 1-1 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Global Reach</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connect with agricultural communities worldwide
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
                <path d="m12 12 4 10 1.7-4.3L22 16Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Expert Support</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get advice from agricultural specialists
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="m2 9 3.5 3.5L12 6" />
                <path d="m2 19 3.5 3.5L12 16" />
                <path d="M22 6h-5" />
                <path d="M22 16h-5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">AI Disease Detection</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Identify crop diseases with our AI tools
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Educational Resources</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Access courses and learning materials
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}