"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/client/auth.api";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar({ isLoggedIn }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  return (
    <NavigationMenu className="w-full px-6 py-4 bg-white shadow-lg min-w-screen">
      <div className="flex w-full items-center justify-between">
        <NavigationMenuList className="flex gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {isLoggedIn && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/journal">Journal</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>

        <NavigationMenuList className="flex gap-2">
          {!isLoggedIn && (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/login">Login</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/signup">Signup</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}

          {isLoggedIn && (
            <NavigationMenuItem
              className="cursor-pointer px-4 py-2"
              onClick={handleLogout}
            >
              Logout
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
