import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "../ui/navigation-menu";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface NavBarProps {
  // For the edge case in the future if a user manages to access this site without an SCU Email (they shouldn't be able to access resources)
  isLoggedIn: boolean;
  selectedPage: string;
}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <NavigationMenu className="mt-4 w-full">
      <NavigationMenuList className="flex justify-end space-x-6">
        <NavigationMenuItem>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/"
            passHref
          >
            <NavigationMenuLink className="text-base text-white">
              Plan
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/"
            passHref
          >
            <NavigationMenuLink className="text-base text-white">
              Tools and Useful Links{" "}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
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
  );
};

export default NavBar;
