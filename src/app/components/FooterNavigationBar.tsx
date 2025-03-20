import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { BookCheck, CircleUser, Home, ShieldAlert, Video, VideoIcon } from "lucide-react";
import Link from "next/link";

export const FooterNavigationBar = ()=>       
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
          <NavigationMenu className="mx-auto w-full">
            <NavigationMenuList className="flex adjust-between w-full">
              <NavigationMenuItem>
               <Link href="/">
               <Button variant="ghost" size="icon" className="h-12 w-12">
                    <Home className="h-10 w-10" />
                </Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/alerts" legacyBehavior passHref>
                 <Button variant="ghost" size="icon" className="h-12 w-12">
                    <ShieldAlert className="h-6 w-6" />
                </Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/reels" legacyBehavior passHref>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                    <Video className="h-6 w-6" />
                </Button>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/history" legacyBehavior passHref>
                 <Button variant="ghost" size="icon" className="h-12 w-12">
                    <BookCheck className="h-6 w-6" />
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