import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { BookCheck, CircleUser, Home, ShieldAlert } from "lucide-react";
import Link from "next/link";

export const FooterNavigationBar = ({}:{})=>       
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
          <NavigationMenu className="mx-auto">
            <NavigationMenuList className="flex justify-around w-full">
              <NavigationMenuItem>
               <Link href="/">
               <Button variant="ghost" size="icon" className="h-12 w-12">
                    <Home className="h-6 w-6" />
                </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/products" legacyBehavior passHref>
                 <Button variant="ghost" size="icon" className="h-12 w-12">
                    <ShieldAlert className="h-6 w-6" />
                </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/services" legacyBehavior passHref>
                 <Button variant="ghost" size="icon" className="h-12 w-12">
                    <BookCheck className="h-6 w-6" />
                </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                    <CircleUser className="h-6 w-6" />
                </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>