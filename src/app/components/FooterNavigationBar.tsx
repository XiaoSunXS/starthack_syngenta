import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { CircleUser, Clapperboard, Clock, Home, Sprout } from "lucide-react";
import Link from "next/link";

export const FooterNavigationBar = ()=>       
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
          <NavigationMenu className="mx-auto w-full">
            <NavigationMenuList className="flex adjust-between w-full">
              <NavigationMenuItem>
               <Link href="/">
               <Button variant="ghost" size="icon" className="h-12 w-12">
                    <Home className="h-12 w-12" />
                </Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/windows" legacyBehavior passHref>
                 <Button variant="ghost" size="icon" className="h-12 w-12">
                    <Clock className="h-6 w-6" />
                </Button>
                </Link>
              </NavigationMenuItem>



              <NavigationMenuItem>
                <Link href="/history" legacyBehavior passHref>
                 <Button variant="ghost" size="icon" className="h-12 w-12">
                    <Sprout className="h-6 w-6" />
                </Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/reels" legacyBehavior passHref>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                    <Clapperboard className="h-6 w-6" />
                </Button>
                </Link>
              </NavigationMenuItem>


              <NavigationMenuItem>
                <Link href="/user" legacyBehavior passHref>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                    <CircleUser className="h-6 w-6" />
                </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>