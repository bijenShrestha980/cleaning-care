import { HandPlatter, LayoutDashboard, Settings } from "lucide-react";

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
        icon: <HandPlatter width={20} height={20} />,
        name: "Service Details",
        path: "/service",
        sidebar: true,
        level: true,
        notification: false,
        sub: [
          {
            name: "Categories",
            path: "/categories",
            sidebar: true,
            notificationCount: 0,
          },
          {
            name: "Types",
            path: "/types",
            sidebar: true,
            notificationCount: 0,
          },
          {
            name: "Service List",
            path: "/service-list",
            sidebar: true,
            notificationCount: 0,
          },
        ],
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
            name: "Fundamental",
            path: "/fundamental",
            sidebar: true,
            notificationCount: 0,
          },
          {
            name: "Landing page",
            path: "/landing-page",
            sidebar: true,
            notificationCount: 0,
          },
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
