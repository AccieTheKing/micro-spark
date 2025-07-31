"use client";

import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="border-border border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary h-6 w-6" />
            <span className="text-primary text-xl font-bold">Micro Spark</span>
            <span className="text-muted-foreground text-sm">MVP Builder</span>
          </div>
        </div>
      </div>
    </header>
  );
}
