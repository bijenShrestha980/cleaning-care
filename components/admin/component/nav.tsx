"use client";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, Menu } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { SidebarContext } from "@/provider/sidebar-provider";

const Nav = () => {
  const pathname = usePathname();
  let { openSidenav, setOpenSidenav } = useContext(SidebarContext);

  return (
    <nav className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-primary capitalize">
          {pathname.split("/")[2]?.split("-").join(" ")}
        </h1>
        <Breadcrumb className="mt-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/${pathname.split("/")[1]}/${pathname.split("/")[2]}`}
                className="text-[#596579] text-sm font-medium uppercase"
              >
                {pathname.split("/").length <= 3
                  ? "View and analyze overall performance of the system."
                  : pathname.split("/")[2]?.split("-").join(" ")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathname.split("/").length > 3 && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/${pathname.split("/")[1]}/${
                      pathname.split("/")[2]
                    }/${pathname.split("/")[3]}/${pathname.split("/")[4]}`}
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
      </div>
      <div className="flex justify-between items-center gap-5">
        {/* {pathname.split("/").length === 4 && (
          <Link href="/artists/dashboard/art-details/add-art">
            <Button variant={"default"} animation={"scale_in"}>
              <Plus size={20} className="mr-2" />
              Add Art
            </Button>
          </Link>
        )} */}

        <Button
          variant={"link"}
          animation={"scale_in"}
          type="button"
          className="p-0 m-0 flex xl:hidden"
          onClick={() => setOpenSidenav(!openSidenav)}
        >
          <Menu size={20} className="mr-2 text-primary" />
        </Button>
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
                <p className="BodyText-Medium">Oilva Rhye</p>
                <p className="SmallText-Regular text-grey-70">
                  olivia@untitledui.com
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href="/admin"
                className="BodyText-Regular px-4 py-2 text-error flex items-center gap-2 cursor-pointer"
              >
                Logout
                <LogOut size={16} />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Nav;
