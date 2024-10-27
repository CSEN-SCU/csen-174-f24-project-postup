import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "../ui/navigation-menu";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";

interface NavBarProps {
  // For the edge case in the future if a user manages to access this site without an SCU Email (they shouldn't be able to access resources)
  isLoggedIn: boolean;
  selectedPage: string;
}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <div className="flex flex-row w-full justify-between border-b-2 pb-4 #000">
      <div className="mt-4">
        <Sheet>
          <SheetTrigger
            className={
              buttonVariants({ variant: "outline" }) + "items-center ml-4"
            }
          >
            <SheetContent side={"left"}></SheetContent>
            <p className="text-base text-white">Menu</p>
          </SheetTrigger>
        </Sheet>
      </div>
      <NavigationMenu className="flex mt-4 w-screen">
        <NavigationMenuList className="space-x-6">
          <NavigationMenuItem>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/"
              passHref
            >
              <NavigationMenuLink className="text-base text-white">
                Academic Plan
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/tools"
              passHref
            >
              <NavigationMenuLink className="text-base text-white">
                Tools and Useful Links{" "}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="pr-4">
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/"
              passHref
            >
              <NavigationMenuLink className="text-base text-white">
                Search Class
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavBar;
