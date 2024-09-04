import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Ban,
  ChevronsDown,
  ChevronsLeftRight,
  ChevronsUp,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleHelp,
  CircleOff,
  Container,
  LoaderCircle,
  Minus,
  PackageOpen,
  ShieldCheck,
  Timer,
  TrendingDown,
  TrendingUp,
  Truck,
} from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const sellerTypes = [
  {
    value: "individual artist",
    label: "Individual Artist",
  },
  {
    value: "art store",
    label: "Art Store",
  },
];

export const reviews = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
];

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: CircleCheck,
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: Ban,
  },
];

export const accountStatuses = [
  {
    value: "pending",
    label: "Pending",
    icon: Timer,
  },
  {
    value: "verefied",
    label: "Verefied",
    icon: ShieldCheck,
  },
  {
    value: "rejected",
    label: "Rejected",
    icon: Ban,
  },
];

export const orderStatuses = [
  {
    value: "pending",
    label: "Pending",
    icon: CircleDashed,
  },
  {
    value: "ready to ship",
    label: "Ready to Ship",
    icon: Container,
  },
  {
    value: "shipped",
    label: "Shipped",
    icon: Truck,
  },
  {
    value: "delivered",
    label: "Delivered",
    icon: PackageOpen,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: CircleOff,
  },
];

export const trendings = [
  {
    value: "top",
    label: "Top",
    icon: TrendingUp,
  },
  {
    value: "medium",
    label: "Medium",
    icon: Minus,
  },
  {
    value: "low",
    label: "Low",
    icon: TrendingDown,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
];

export const categories = [
  {
    value: "Painting",
    label: "Painting",
  },
  {
    value: "Oil Painting",
    label: "Oil Painting",
  },
  {
    value: "Drawing",
    label: "Drawing",
  },
  {
    value: "Sculpture",
    label: "Sculpture",
  },
  {
    value: "Photography",
    label: "Photography",
  },
  {
    value: "Digital Art",
    label: "Digital Art",
  },
  {
    value: "Mixed Media",
    label: "Mixed Media",
  },
  {
    value: "Art",
    label: "Art",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const paymentMethods = [
  {
    value: "credit card",
    label: "Credit Card",
  },
  {
    value: "debit card",
    label: "Debit Card",
  },
  {
    value: "cash on delivery",
    label: "Cash on Delivery",
  },
  {
    value: "net banking",
    label: "Net Banking",
  },
  {
    value: "esewa",
    label: "Esewa",
  },
  {
    value: "khalti",
    label: "Khalti",
  },
];
