"use client";

import { NavLinks } from "./nav-links";

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r bg-card">
      <div className="flex h-16 items-center gap-2 px-6 border-b">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
          SM
        </div>
        <span className="font-semibold text-lg">Admin</span>
      </div>
      <div className="flex-1 px-4 py-4">
        <NavLinks />
      </div>
    </aside>
  );
}
