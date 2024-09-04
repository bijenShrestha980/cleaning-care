import { LayoutDashboard, Settings } from "lucide-react";

const adminRoutes = [
  {
    layout: "admin/dashboard",
    sidebar: true,
    pages: [
      {
        icon: <LayoutDashboard width={20} height={20} />,
        name: "Dashboard",
        path: "/",
        sidebar: true,
      },

      {
        icon: <Settings width={20} height={20} />,
        name: "Settings",
        path: "/settings",
        sidebar: true,
        level: true,
        notification: false,
        sub: [
          {
            name: "About",
            path: "/about",
            sidebar: true,
            notificationCount: 0,
          },
          {
            name: "Testimonial",
            path: "/testimonial",
            sidebar: true,
            notificationCount: 0,
          },
          {
            name: "FAQs",
            path: "/faqs",
            sidebar: true,
            notificationCount: 0,
          },
        ],
      },
    ],
  },
];

export { adminRoutes };
