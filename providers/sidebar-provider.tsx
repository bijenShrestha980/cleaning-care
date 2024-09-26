"use client";

import { createContext, useState } from "react";

export const SidebarContext = createContext({
  openSidenav: false,
  setOpenSidenav: (value: boolean) => {},
});

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSidenav, setOpenSidenav] = useState(false);
  return (
    <SidebarContext.Provider value={{ openSidenav, setOpenSidenav }}>
      {children}
    </SidebarContext.Provider>
  );
}
