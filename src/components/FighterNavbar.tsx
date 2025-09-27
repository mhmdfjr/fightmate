// src/components/FighterNavbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, MessageSquare, User, Swords } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FighterNavbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/fighter", label: "Home", icon: Home },
    { href: "/fighter/matches", label: "Matches", icon: MessageSquare },
    { href: "/fighter/categories", label: "Categories", icon: LayoutGrid },
    { href: "/fighter/profile", label: "Profile", icon: User },
  ];

  return (
    <>
      {/* --- Desktop Navbar (Top) --- */}
      <nav
        className={cn(
          "hidden md:flex justify-between items-center border-b border-gray-800",
          "fixed top-0 left-0 right-0 z-20 bg-gray-900/80 backdrop-blur-sm"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/fighter" className="flex items-center gap-2">
            <Swords className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
            <span className="text-xl sm:text-2xl font-bold">FightMate</span>
          </Link>
          <div className="flex items-center gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 transition-colors text-sm font-semibold",
                    isActive
                      ? "bg-accent hover:bg-accent/90 text-white"
                      : "text-muted-foreground hover:text-accent "
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* --- Mobile Navbar (Bottom) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-sm border-t border-gray-800 p-2 flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-md transition-colors w-full",
                isActive ? "text-red-500" : "text-gray-400"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
