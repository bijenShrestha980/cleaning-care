import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
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
import { CustomImage } from "@/components/ui/custom-image";
import { logo } from "@/constants/images";
import QuoteDialogue from "@/features/quote/components/quote-dialogue";
import { fetchAllServices } from "@/features/services/api/use-service";

export const Navbar = async () => {
  const servicesData = await fetchAllServices();
  return (
    <div className="max-w-full flex items-center justify-between py-3 px-10">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>
                <CustomImage
                  src={logo}
                  alt="Logo"
                  priority
                  fill
                  sizes="(max-width: 640px) 55px, 77px"
                  containerClassName="w-[57px] md:w-[67px] h-[60px] md:h-[70px]"
                />
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
                      {servicesData.map((component) => (
                        <ListItem
                          key={component.id}
                          title={component.service_name}
                          href={component.service_category_id?.toString()}
                        />
                      ))}
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
                {servicesData.map((component) => (
                  <ListItem
                    key={component.id}
                    title={component.service_name}
                    href={component.service_category_id?.toString()}
                  />
                ))}
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
};

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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground",
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
