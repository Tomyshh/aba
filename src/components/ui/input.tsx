"use client";

import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 text-sm outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]",
        className,
      )}
      {...props}
    />
  );
}


