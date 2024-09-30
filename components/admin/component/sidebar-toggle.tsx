"use client";
import React, { useContext } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarContext } from "@/providers/sidebar-provider";

const SidebarToggle = ({ icon }: { icon: string }) => {
  let { openSidenav, setOpenSidenav } = useContext(SidebarContext);

  return (
    <Button
      animation={"scale_in"}
      type="button"
      className="shadow-[rgba(255, 255, 255, 0.945)_0px_7px_29px_0px] bg-gradient-to-r from-slate-600 to-slate-500 rounded-full p-0 xl:hidden w-10 h-10"
      onClick={() => setOpenSidenav(!openSidenav)}
    >
      {icon === "menu" ? (
        <Menu size={20} className="text-primary-foreground" />
      ) : (
        <X size={20} className="text-primary-foreground" />
      )}
    </Button>
  );
};

export default SidebarToggle;
