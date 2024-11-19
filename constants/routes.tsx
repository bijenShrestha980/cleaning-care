import {
  HandPlatter,
  LayoutDashboard,
  MessageCircleQuestion,
  Quote,
  ReceiptText,
  Settings,
  Undo2,
} from "lucide-react";

const adminRoutes = [
  {
    layout: "cleaning-care-admin/dashboard",
    sidebar: true,
    pages: [
      {
        icon: <LayoutDashboard width={20} height={20} />,
        name: "Dashboard",
        path: "/",
        sidebar: true,
      },
      {
        icon: <Quote width={20} height={20} />,
        name: "Quotes",
        path: "/quote",
        sidebar: true,
      },
      {
        icon: <Undo2 width={20} height={20} />,
        name: "Request Callback",
        path: "/request-callback",
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
            name: "Service List",
            path: "/service-list",
            sidebar: true,
            notificationCount: 0,
          },
        ],
      },
      {
        icon: <ReceiptText width={20} height={20} />,
        name: "Invoice",
        path: "/invoice",
        sidebar: true,
      },
      {
        icon: <MessageCircleQuestion width={20} height={20} />,
        name: "Why choose us",
        path: "/why-choose-us",
        sidebar: true,
        level: true,
        notification: false,
        sub: [
          {
            name: "Heading",
            path: "/heading",
            sidebar: true,
            notificationCount: 0,
          },
          {
            name: "Features",
            path: "/features",
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
            name: "Bank",
            path: "/bank",
            sidebar: true,
            notificationCount: 0,
          },
          // {
          //   name: "Testimonial",
          //   path: "/testimonial",
          //   sidebar: true,
          //   notificationCount: 0,
          // },
          // {
          //   name: "FAQs",
          //   path: "/faqs",
          //   sidebar: true,
          //   notificationCount: 0,
          // },
        ],
      },
    ],
  },
];

export { adminRoutes };
