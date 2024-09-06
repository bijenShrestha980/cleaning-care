"use client";

import { createContext, useState } from "react";

export const SidebarContext = createContext({
  openSidenav: true,
  setOpenSidenav: (value: boolean) => {},
});

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSidenav, setOpenSidenav] = useState(true);
  return (
    <SidebarContext.Provider value={{ openSidenav, setOpenSidenav }}>
      {children}
    </SidebarContext.Provider>
  );
}
