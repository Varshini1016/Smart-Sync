import { useMemo, useState } from "react";
import { Filter, Sparkles, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/SectionCard";
import { TaskCard } from "@/components/TaskCard";
import type { ExtractedTask, Priority } from "@/lib/smartsync";
import { simulateAiExtraction } from "@/lib/smartsync";

function seededDemoTasks(): ExtractedTask[] {
  return [
    {
      id: "academic-1",
      title: "URGENT: Submit scholarship form (today)",
      deadline: new Date().toISOString().slice(0, 10),
      priority: "High",
      completed: false,
      source: "text",
      category: "Academic",
    },
    {
      id: "academic-2",
      title: "Project: CS (this week)",
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6).toISOString().slice(0, 10),
      priority: "Medium",
      completed: false,
      source: "pdf",
      category: "Academic",
    },
    {
      id: "personal-1",
      title: "Gym Session: Leg Day",
      deadline: new Date().toISOString().slice(0, 10),
      priority: "Medium",
      completed: false,
      source: "text",
      category: "Personal",
    },
    {
      id: "personal-2",
      title: "Meeting friends for dinner",
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1).toISOString().slice(0, 10),
      priority: "High",
      completed: false,
      source: "text",
      category: "Personal",
    },
    {
      id: "personal-3",
      title: "Movie plans: Interstellar Re-run",
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString().slice(0, 10),
      priority: "Low",
      completed: false,
      source: "text",
      category: "Personal",
    },
    {
      id: "personal-4",
      title: "Pay electricity and internet bills",
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString().slice(0, 10),
      priority: "High",
      completed: false,
      source: "text",
      category: "Personal",
    },
  ];
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<ExtractedTask[]>(seededDemoTasks());
  const [priority, setPriority] = useState<Priority | "All">("All");
  const [mode, setMode] = useState<"Academic" | "Personal">("Academic");

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const matchesMode = t.category === mode;
      const matchesPriority = priority === "All" || t.priority === priority;
      return matchesMode && matchesPriority;
    });
  }, [tasks, priority, mode]);

  function toggleTask(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  async function addDemoBatch() {
    const extracted = await simulateAiExtraction({ text: "dashboard demo" });
    setTasks((prev) => [...extracted.map((t, i) => ({ ...t, id: `dash-${t.id}-${i}`, category: mode })), ...prev]);
  }

  return (
    <main className="app-shell">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <SectionCard testId="section-dashboard">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-[hsl(var(--card)/0.55)] px-3 py-1 text-xs font-semibold text-[hsl(var(--muted-foreground))]">
                <Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" strokeWidth={2.2} />
                Dashboard
              </div>
              <h1 data-testid="text-dashboard-title" className="mt-3 font-[Outfit] text-2xl font-semibold tracking-tight">
                {mode} Tasks
              </h1>
              <p data-testid="text-dashboard-sub" className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                Manage your {mode.toLowerCase()} schedule and priorities.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Mode Switcher */}
              <div className="flex items-center gap-1 rounded-full border border-border/70 bg-[hsl(var(--card)/0.55)] p-1 shadow-sm">
                <button
                  data-testid="button-mode-academic"
                  onClick={() => setMode("Academic")}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                    mode === "Academic"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-foreground/5"
                  )}
                >
                  <GraduationCap className="h-4 w-4" />
                  Academic
                </button>
                <button
                  data-testid="button-mode-personal"
                  onClick={() => setMode("Personal")}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                    mode === "Personal"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-foreground/5"
                  )}
                >
                  <Heart className="h-4 w-4" />
                  Life Mode
                </button>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-border/70 bg-[hsl(var(--card)/0.55)] p-1">
                {(["All", "High", "Medium", "Low"] as const).map((p) => (
                  <button
                    key={p}
                    data-testid={`button-filter-${p.toLowerCase()}`}
                    onClick={() => setPriority(p as any)}
                    className={
                      "rounded-full px-3 py-2 text-sm font-semibold transition " +
                      (priority === p
                        ? "bg-[hsl(var(--foreground)/0.08)] text-foreground"
                        : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--foreground)/0.06)]")
                    }
                  >
                    {p}
                  </button>
                ))}
              </div>

              <Button
                data-testid="button-add-demo"
                variant="secondary"
                className="gap-2 rounded-full"
                onClick={addDemoBatch}
              >
                <Filter className="h-4 w-4" strokeWidth={2.2} />
                Add tasks
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-4" data-testid="list-tasks">
            {filtered.length === 0 ? (
              <div
                data-testid="empty-dashboard"
                className="rounded-3xl border border-border/70 bg-[hsl(var(--card)/0.55)] p-12 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted/30">
                  {mode === "Academic" ? <GraduationCap className="h-6 w-6 text-muted-foreground" /> : <Heart className="h-6 w-6 text-muted-foreground" />}
                </div>
                <div className="mt-4 font-[Outfit] text-lg font-semibold">No {mode.toLowerCase()} tasks found</div>
                <div className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                  Switch filters or add new tasks to get started.
                </div>
              </div>
            ) : (
              filtered.map((t) => <TaskCard key={t.id} task={t} onToggle={toggleTask} />)
            )}
          </div>
        </SectionCard>
      </div>
    </main>
  );
}

// Helper for conditional classes since we don't have clsx in this file scope if not imported
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
