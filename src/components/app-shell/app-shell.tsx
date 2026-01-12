"use client";

import type { PropsWithChildren } from "react";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh bg-[rgb(var(--bg))]">
      <div className="flex w-full gap-6 px-4 py-5 lg:px-8">
        <Sidebar />

        <main className="flex-1">
          <div className="space-y-5">
            <Topbar />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}


