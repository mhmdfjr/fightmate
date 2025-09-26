// src/components/PublicNavbar.tsx
"use client";

import Link from "next/link";
import { Swords } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function PublicNavbar() {
  const pathname = usePathname();

  // Don't render the navbar on the main app pages
  if (
    pathname.startsWith("/fighter") ||
    pathname.startsWith("/referee") ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Swords className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
          <span className="text-xl sm:text-2xl font-bold">FightMate</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/login"
            className="text-muted-foreground hover:text-accent transition-colors text-sm font-semibold"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-accent rounded-md px-3 py-2 hover:bg-accent/90 text-accent-foreground text-sm font-semibold"
          >
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
