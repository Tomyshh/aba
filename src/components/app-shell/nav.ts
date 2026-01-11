import type { LucideIcon } from "lucide-react";
import { BookOpenText, LayoutDashboard, Settings, SpellCheck2 } from "lucide-react";

export type NavItem = {
  href: string;
  icon: LucideIcon;
  key: "dashboard" | "jobs" | "glossary" | "settings";
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, key: "dashboard" },
  { href: "/jobs", icon: BookOpenText, key: "jobs" },
  { href: "/glossary", icon: SpellCheck2, key: "glossary" },
  { href: "/settings", icon: Settings, key: "settings" },
];


