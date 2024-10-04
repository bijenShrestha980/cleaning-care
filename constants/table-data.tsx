import {
  AlarmClockCheck,
  BadgeDollarSign,
  Ban,
  CircleCheck,
  CircleDashed,
  ClipboardCheck,
  LoaderCircle,
  ShieldCheck,
  SquareUser,
  UserRoundCheck,
  UserRoundPlus,
  X,
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

export const quoteStatuses = [
  {
    value: "received_from_user",
    label: "Received from user",
    icon: UserRoundPlus,
  },
  {
    value: "quote_sent_to_user",
    label: "Quote sent to user",
    icon: UserRoundCheck,
  },
  {
    value: "work_in_progress",
    label: "Work in progress",
    icon: LoaderCircle,
  },
  {
    value: "completed",
    label: "Completed",
    icon: ShieldCheck,
  },
  {
    value: "invoice_sent",
    label: "Invoice sent",
    icon: ClipboardCheck,
  },
  {
    value: "payment_complete",
    label: "Payment complete",
    icon: BadgeDollarSign,
  },
];
