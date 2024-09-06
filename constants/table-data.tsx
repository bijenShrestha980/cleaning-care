import {
  AlarmClockCheck,
  Ban,
  CircleCheck,
  CircleDashed,
  ClipboardCheck,
  LoaderCircle,
  ShieldCheck,
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
    value: "pending",
    label: "Pending",
    icon: CircleDashed,
  },
  {
    value: "processing",
    label: "Processing",
    icon: LoaderCircle,
  },
  {
    value: "accepted",
    label: "Accepted",
    icon: ClipboardCheck,
  },
  {
    value: "in_progress",
    label: "In Progress",
    icon: AlarmClockCheck,
  },
  {
    value: "rejected",
    label: "Rejected",
    icon: X,
  },
  {
    value: "completed",
    label: "Completed",
    icon: ShieldCheck,
  },
];
