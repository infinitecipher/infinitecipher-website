"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ICLogo } from "@/components/ICLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-ic-border backdrop-blur-md bg-ic-void/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <ICLogo size={26} />
          </Link>

          {/* Desktop Nav */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    href={link.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-ic-muted hover:text-ic-chalk font-mono text-[11px] tracking-widest uppercase",
                      pathname === link.href && "text-ic-chalk"
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact" className="hidden sm:block">
              <Button
                size="sm"
                className="bg-ic-deep-cipher hover:bg-ic-cipher-core text-purple-50 font-mono text-[11px] tracking-widest uppercase"
              >
                Get Started
              </Button>
            </Link>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <button
                    className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-ic-muted hover:text-ic-chalk transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                }
              />
              <SheetContent
                side="right"
                className="bg-ic-surface border-ic-border w-72"
              >
                <div className="flex flex-col gap-1 mt-8">
                  <div className="mb-6">
                    <ICLogo size={24} />
                  </div>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "font-mono text-[12px] tracking-widest uppercase py-3 px-2 border-b border-ic-border text-ic-muted hover:text-ic-chalk transition-colors",
                        pathname === link.href && "text-ic-lavender"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/contact" onClick={() => setOpen(false)} className="mt-6">
                    <Button className="w-full bg-ic-deep-cipher hover:bg-ic-cipher-core text-purple-50 font-mono text-[11px] tracking-widest uppercase">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
