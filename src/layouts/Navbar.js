"use client";

import * as React from "react";
import Link from "next/link";
import { logout } from "@/client/auth.api";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };
  return (
    <NavigationMenu className="flex justify-center items-center px-4 py-4 bg-white elevation-10 min-w-screen shadow-lg">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/journal">Journal</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/signup">Signup</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="login">Login</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem onClick={handleLogout}>Logout</NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
