"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useAuth } from '@/components/auth-provider';
import { useLanguage } from '@/components/language-provider';
import { Sprout, Bell, MessageSquare, Menu, X, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : 'U';

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <div className="container px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block">AgroByte</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-1 flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 bg-muted/50"
            />
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowSearchBar(!showSearchBar)}>
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" asChild>
            <Link href="/messages">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild>
            <Link href="/notifications">
              <div className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
          
          <LanguageToggle />
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              {user?.role === 'farmer' && (
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/diary">Krishi Diary</Link>
                </DropdownMenuItem>
              )}
              {user?.role === 'admin' && (
                <DropdownMenuItem asChild>
                  <Link href="/admin">Admin Panel</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {showSearchBar && (
        <div className="md:hidden px-4 py-2 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 bg-muted/50"
              autoFocus
            />
          </div>
        </div>
      )}
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b animate-in">
          <nav className="px-4 py-3">
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/dashboard" 
                  className="flex items-center space-x-2 text-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/marketplace" 
                  className="flex items-center space-x-2 text-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Marketplace</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/learning" 
                  className="flex items-center space-x-2 text-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                  <span>Learning</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/messages" 
                  className="flex items-center space-x-2 text-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/ai-tools" 
                  className="flex items-center space-x-2 text-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>AI Tools</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/weather" 
                  className="flex items-center space-x-2 text-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <span>Weather</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}