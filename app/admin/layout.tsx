import SidebarProvider from "@/provider/sidebar-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
