import { CheckCircle2, Circle, FileImage, FileText, MessageSquareText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ExtractedTask } from "@/lib/smartsync";
import { formatDeadline, priorityStyles } from "@/lib/smartsync";

function SourceIcon({ source }: { source: ExtractedTask["source"] }) {
  if (source === "pdf") return <FileText className="h-4 w-4" strokeWidth={2.2} />;
  if (source === "image") return <FileImage className="h-4 w-4" strokeWidth={2.2} />;
  return <MessageSquareText className="h-4 w-4" strokeWidth={2.2} />;
}

export function TaskCard({
  task,
  onToggle,
}: {
  task: ExtractedTask;
  onToggle: (id: string) => void;
}) {
  const pri = priorityStyles(task.priority);

  return (
    <div
      data-testid={`card-task-${task.id}`}
      className={cn(
        "group rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.75)] p-4 shadow-sm transition",
        "hover:-translate-y-0.5 hover:shadow-md",
        task.completed && "opacity-70",
      )}
    >
      <div className="flex items-start gap-3">
        <button
          data-testid={`button-toggle-task-${task.id}`}
          onClick={() => onToggle(task.id)}
          className="mt-0.5 rounded-full p-1 transition hover:bg-[hsl(var(--foreground)/0.06)]"
          aria-label={task.completed ? "Mark as not completed" : "Mark as completed"}
        >
          {task.completed ? (
            <CheckCircle2 className="h-5 w-5 text-[hsl(175_70%_45%)]" strokeWidth={2.4} />
          ) : (
            <Circle className="h-5 w-5 text-[hsl(var(--muted-foreground))]" strokeWidth={2.2} />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div
              data-testid={`text-task-title-${task.id}`}
              className={cn(
                "min-w-0 font-semibold leading-snug text-foreground",
                task.completed && "line-through decoration-[hsl(var(--muted-foreground)/0.8)]",
              )}
            >
              {task.title}
            </div>
            <div className="flex items-center gap-2">
              <Badge
                data-testid={`badge-task-priority-${task.id}`}
                className={cn(
                  "badge-soft rounded-full border px-2.5 py-1 text-xs font-semibold",
                  pri.className,
                )}
              >
                {pri.label}
              </Badge>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <span
              data-testid={`text-task-deadline-${task.id}`}
              className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-[hsl(var(--card)/0.6)] px-2 py-1"
            >
              <span className="text-xs font-semibold text-foreground/80">Due</span>
              {formatDeadline(task.deadline)}
            </span>
            <span
              data-testid={`text-task-source-${task.id}`}
              className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-[hsl(var(--card)/0.6)] px-2 py-1"
            >
              <SourceIcon source={task.source} />
              <span className="text-xs font-semibold text-foreground/80">Source</span>
              {task.source}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-end">
            <Button
              data-testid={`button-toggle-task-secondary-${task.id}`}
              variant="secondary"
              size="sm"
              onClick={() => onToggle(task.id)}
              className="rounded-full"
            >
              {task.completed ? "Undo" : "Complete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
