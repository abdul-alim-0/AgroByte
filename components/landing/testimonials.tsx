import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "AgroByte has transformed how I sell my organic produce. I've connected with buyers from across the country and increased my revenue by 40%.",
    name: "Rajiv Patel",
    role: "Organic Farmer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "As a first-time farmer, the knowledge I've gained from AgroByte's learning platform and community has been invaluable. The AI disease detection saved my tomato crop last season.",
    name: "Sarah Johnson",
    role: "Small-scale Farmer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "I use AgroByte to source fresh produce directly from farmers for my restaurant. The quality is exceptional, and I love supporting local agriculture.",
    name: "Miguel Rodriguez",
    role: "Restaurant Owner",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    quote: "Teaching agricultural techniques on AgroByte has allowed me to reach farmers across three continents. The platform makes it easy to create and sell courses.",
    name: "Dr. Amina Khalid",
    role: "Agricultural Scientist",
    avatar: "https://randomuser.me/api/portraits/women/46.jpg"
  }
];

export function LandingTestimonials() {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Hear from Our Community
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover how AgroByte is making a difference for farmers, buyers, and agricultural experts worldwide.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 p-4">
                  <Card className="h-full card-hover">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <svg
                            className="h-8 w-8 text-primary/60"
                            fill="currentColor"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                          >
                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                          </svg>
                        </div>
                        <p className="text-center text-lg text-muted-foreground">
                          {testimonial.quote}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-center border-t px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="relative mr-2" />
              <CarouselNext className="relative ml-2" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}