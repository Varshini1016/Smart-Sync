import { cn } from "@/lib/utils";

export function SectionCard({
  children,
  className,
  testId,
}: {
  children: React.ReactNode;
  className?: string;
  testId?: string;
}) {
  return (
    <section
      data-testid={testId}
      className={cn(
        "glass noise rounded-2xl p-5 md:rounded-3xl md:p-7",
        className,
      )}
    >
      {children}
    </section>
  );
}
