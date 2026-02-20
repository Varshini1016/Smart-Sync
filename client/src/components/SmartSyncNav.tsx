import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, ListTodo } from "lucide-react";

function NavLink({
  href,
  label,
  testId,
}: {
  href: string;
  label: string;
  testId: string;
}) {
  const [loc] = useLocation();
  const active = loc === href;

  return (
    <Link
      href={href}
      data-testid={testId}
      className={cn(
        "rounded-full px-3 py-2 text-sm font-semibold transition",
        "hover:bg-[hsl(var(--foreground)/0.06)]",
        active
          ? "bg-[hsl(var(--foreground)/0.08)] text-foreground"
          : "text-[hsl(var(--muted-foreground))]",
      )}
    >
      {label}
    </Link>
  );
}

export function SmartSyncNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-[hsl(var(--background)/0.65)] backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background)/0.55)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link
          href="/"
          data-testid="link-home"
          className="group flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-[hsl(var(--foreground)/0.06)]"
        >
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[radial-gradient(circle_at_30%_20%,hsl(215_92%_58%/.35),transparent_55%),radial-gradient(circle_at_80%_40%,hsl(175_70%_45%/.28),transparent_55%),linear-gradient(to_bottom,hsl(var(--card)),hsl(var(--card)))] border border-border/70 shadow-sm">
            <Sparkles className="h-5 w-5 text-[hsl(var(--primary))]" strokeWidth={2.2} />
          </span>
          <div className="leading-tight">
            <div className="font-[Outfit] text-base font-semibold tracking-tight">
              SmartSync
            </div>
            <div className="hidden text-xs text-[hsl(var(--muted-foreground))] sm:block">
              AI-powered task organizer
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink href="/" label="Home" testId="link-nav-home" />
          <NavLink href="/upload" label="Upload" testId="link-nav-upload" />
          <NavLink href="/dashboard" label="Dashboard" testId="link-nav-dashboard" />
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/upload" data-testid="link-cta-upload">
            <Button
              data-testid="button-nav-upload"
              size="sm"
              className="btn-primary-glow gap-2 rounded-full"
            >
              <Upload className="h-4 w-4" strokeWidth={2.2} />
              Upload
            </Button>
          </Link>
          <Link href="/dashboard" data-testid="link-cta-dashboard">
            <Button
              data-testid="button-nav-dashboard"
              size="sm"
              variant="secondary"
              className="hidden gap-2 rounded-full sm:inline-flex"
            >
              <ListTodo className="h-4 w-4" strokeWidth={2.2} />
              Tasks
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
