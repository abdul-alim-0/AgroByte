"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          English {language === "en" && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("bn")}>
          বাংলা (Bangla) {language === "bn" && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ar")}>
          العربية (Arabic) {language === "ar" && "✓"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}