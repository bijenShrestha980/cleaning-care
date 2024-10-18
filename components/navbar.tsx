"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { logo } from "@/constants/images";
import { useAllServices } from "@/features/services/api/use-service";
import QuoteDialogue from "@/features/quote/components/quote-dialogue";

export function Navbar() {
  const { data: servicesData, isPending } = useAllServices();
  return (
    <div className="max-w-full flex items-center justify-between py-3 px-10">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>
                <Image src={logo} alt="Logo" width={77} height={80} priority />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="block md:hidden">
        <NavigationMenuList>
          <NavigationMenuItem className="border-none">
            <NavigationMenuTrigger className="flex sm:gap-2 items-center hover:bg-transparent">
              <span className="SmallText-Reg-Cap">Menu</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="m-0 flex flex-col w-[200px]">
              <Link
                href="/about-us"
                legacyBehavior
                passHref
                className="h-11 w-full"
              >
                <NavigationMenuLink className="px-4 py-2 h-11 w-full font-medium text-xl">
                  About us
                </NavigationMenuLink>
              </Link>
              <Link
                href="/contact-us"
                legacyBehavior
                passHref
                className="h-11 w-full"
              >
                <NavigationMenuLink className="px-4 py-2 h-11 w-full font-medium text-xl">
                  Contact
                </NavigationMenuLink>
              </Link>
              <Accordion type="single" collapsible>
                <AccordionItem
                  value="item-1"
                  className="no-underline focus:no-underline border-none"
                >
                  <AccordionTrigger className="no-underline focus:no-underline px-4 py-2 font-medium text-xl">
                    Services
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid w-full gap-1 px-1 md:grid-cols-1">
                      {isPending ? (
                        <Skeleton className="h-[40px] w-full" />
                      ) : (
                        servicesData &&
                        servicesData.map((component) => (
                          <ListItem
                            key={component.id}
                            title={component.service_name}
                            href={component.service_category_id?.toString()}
                          />
                        ))
                      )}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-1 ">
                {isPending ? (
                  <Skeleton className="h-[40px] w-full" />
                ) : (
                  servicesData &&
                  servicesData.map((component) => (
                    <ListItem
                      key={component.id}
                      title={component.service_name}
                      href={component.service_category_id?.toString()}
                    />
                  ))
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about-us" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact-us" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden lg:block">
            <QuoteDialogue />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
