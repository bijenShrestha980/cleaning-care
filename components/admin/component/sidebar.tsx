"use client";
import React, { Fragment, createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminRoutes } from "@/constants/routes";
import { formatToCapitalize } from "@/lib/format-to-capitalize";
import { SidebarContext } from "@/providers/sidebar-provider";

const Sidebar = () => {
  const pathname = usePathname();
  let { openSidenav, setOpenSidenav } = useContext(SidebarContext);
  return (
    <aside
      className={`${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 h-[calc(100vh-32px)] w-72 transition-transform duration-300 xl:translate-x-0 xl:translate-y-0 bg-primary my-4 ml-4 px-4 py-6 rounded-xl`}
    >
      <div className="px-2">
        <div className="flex justify-between items-center">
          <h5 className="text-primary-foreground my-[10px]">Cleaning Care</h5>
          <Button
            variant={"link"}
            animation={"scale_in"}
            type="button"
            className="p-0 m-0 flex xl:hidden"
            onClick={() => setOpenSidenav(!openSidenav)}
          >
            <X size={20} className="mr-2 text-primary-foreground" />
          </Button>
        </div>
        <div className="relative">
          <Input
            placeholder="Search"
            className="w-full h-10 mt-6 border-grey-50 text-primary-foreground placeholder:text-grey-50 rounded-[8px] bg-transparent focus:bg-transparent pl-[30px] pr-[14px] py-[10px]"
          />
          <Search
            color="#D0D7E2"
            height={15}
            width={15}
            className="absolute left-[10px] top-3"
          />
        </div>
      </div>
      <div className="no-scrollbar mt-6 h-[calc(100vh-183px)] xl:h-[calc(100vh-163px)] overflow-y-auto scroll-hide">
        {adminRoutes.map(({ layout, pages, sidebar }, key) => (
          <Fragment key={key}>
            {sidebar && (
              <ul className="mb-4 flex flex-col gap-1">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue={formatToCapitalize(pathname.split("/")[3])}
                >
                  {pages.map(
                    ({
                      icon,
                      name,
                      path,
                      sidebar,
                      level,
                      sub,
                      notification,
                    }) => (
                      <Fragment key={name}>
                        {sidebar && (
                          <li>
                            {level ? (
                              <AccordionItem
                                value={name}
                                className="border-none"
                              >
                                <AccordionTrigger
                                  className={`flex w-full h-10 items-center gap-4 rounded-lg hover:no-underline py-2 px-3 capitalize transition-all text-[#F4F7FB] hover:bg-white/10 hover:text-white active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-1
                                  ${
                                    pathname.split("/")[3] ===
                                    path.split("/")[1]
                                      ? "bg-[#343030] border border-[#8E7755]"
                                      : ""
                                  }`}
                                >
                                  <div className="flex items-center text-sm justify-start gap-3 w-full">
                                    <div>{icon}</div>
                                    {name}
                                    {notification && (
                                      <div className="bg-secondary h-2 w-2 rounded-full"></div>
                                    )}
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="py-1">
                                  {sub.map((item) => (
                                    <Link
                                      href={`/${layout}${path}${item.path}`}
                                      key={item.name}
                                    >
                                      <Button
                                        className={`flex items-center text-sm justify-between gap-3 py-2 pl-[43px] pr-3 w-full mb-1 hover:bg-white/10 hover:text-white active:bg-white/30 rounded-lg  ${
                                          pathname.split("/")[4] ===
                                          item.path.split("/")[1]
                                            ? "bg-[#343030]"
                                            : ""
                                        }`}
                                        onClick={() => setOpenSidenav(false)}
                                      >
                                        <p
                                          color="inherit"
                                          className="font-medium capitalize"
                                        >
                                          {item.name}
                                        </p>
                                        {notification &&
                                          item.notificationCount > 0 && (
                                            <div className="bg-secondary h-6 py-[2px] px-[10px] rounded-2xl SmallText-Regular text-grey-20">
                                              {item.notificationCount} new
                                            </div>
                                          )}
                                      </Button>
                                    </Link>
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            ) : (
                              <Link href={`/${layout}${path}`}>
                                <Button
                                  className={`flex items-center text-sm justify-start gap-3 py-2 px-3 w-full h-10 mb-1 hover:bg-white/10 hover:text-white active:bg-white/30 rounded-lg ${
                                    pathname.split("/")[3] ===
                                      path.split("/")[1] ||
                                    (pathname.split("/").length <= 3 &&
                                      pathname.split("/")[2] ===
                                        name.toLocaleLowerCase())
                                      ? "bg-[#343030] border border-[#8E7755]"
                                      : ""
                                  }`}
                                  onClick={() => setOpenSidenav(false)}
                                >
                                  {icon}
                                  <p
                                    color="inherit"
                                    className="font-medium capitalize"
                                  >
                                    {name}
                                  </p>
                                  {notification && (
                                    <div className="bg-secondary h-2 w-2 rounded-full"></div>
                                  )}
                                </Button>
                              </Link>
                            )}
                          </li>
                        )}
                      </Fragment>
                    )
                  )}
                </Accordion>
              </ul>
            )}
          </Fragment>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
