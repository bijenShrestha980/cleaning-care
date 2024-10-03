"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Home, LogOut } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { user_1 } from "@/constants/images";
import { axiosLocal } from "@/lib/axios";
import SidebarToggle from "./sidebar-toggle";

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await axiosLocal.get("/logout");
    router.refresh();
  };

  return (
    <nav className="mb-8">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-primary capitalize">
          {pathname.split("/")[2]?.split("-").join(" ")}
        </h1>
        <div className="flex justify-between items-center gap-2 md:gap-5">
          <SidebarToggle icon="menu" />
          <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-none h-10 flex justify-between items-center gap-1">
              <Image
                src={user_1}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <ChevronDown size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5 rounded w-[240px]">
              <div className="flex gap-3 px-4 py-[14px]">
                <div className="relative">
                  <Image
                    src={user_1}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10"
                  />
                  <div className="bg-success w-[10px] h-[10px] rounded-full absolute bottom-1 right-0 ring-2 ring-green-400 bg-green-400"></div>
                </div>
                <div>
                  <p className="BodyText-Medium">Admin</p>
                  <p className="SmallText-Regular text-grey-70">
                    Cleaning care
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="BodyText-Regular px-4 py-2 text-error flex gap-2 cursor-pointer"
                onClick={() => logout()}
              >
                Logout
                <LogOut size={16} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Breadcrumb className="w-full mt-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}`}
              className="text-[#596579] text-sm font-medium uppercase line-clamp-1 sm:line-clamp-none"
            >
              {pathname.split("/").length <= 3 ? (
                "View and analyze overall performance of the system."
              ) : (
                <Home size={16} />
              )}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathname.split("/").length > 3 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="text-sm font-medium uppercase text-[#596579]">
                {pathname.split("/")[3]?.split("-").join(" ")}
              </BreadcrumbItem>
            </>
          )}
          {pathname.split("/").length > 4 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}/${
                    pathname.split("/")[3]
                  }/${pathname.split("/")[4]}`}
                  className="text-sm font-medium uppercase text-[#596579]"
                >
                  {pathname.split("/")[4]?.split("-").join(" ")}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {pathname.split("/").length > 5 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium uppercase text-[#596579]">
                  {pathname.split("/")[5]?.split("-").join(" ")}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default Nav;
