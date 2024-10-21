import {
  AlarmClockCheck,
  BadgeDollarSign,
  Ban,
  BookCheck,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleOff,
  ClipboardCheck,
  Disc,
  Grab,
  HandHeart,
  Handshake,
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
    value: "work_in_process",
    label: "Work in process",
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

export const types = [
  {
    value: "chooseus",
    label: "Choose us",
    icon: Handshake,
  },
  {
    value: "values",
    label: "Values",
    icon: HandHeart,
  },
  {
    value: "bookservice",
    label: "Book service",
    icon: BookCheck,
  },
];

export const confirmations = [
  {
    value: "accept",
    label: "Accept",
    icon: CircleCheck,
  },
  {
    value: "decline",
    label: "Decline",
    icon: CircleOff,
  },
];
