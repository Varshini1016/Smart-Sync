export type Priority = "High" | "Medium" | "Low";
export type TaskCategory = "Academic" | "Personal";

export type ExtractedTask = {
  id: string;
  title: string;
  deadline: string; // ISO date
  priority: Priority;
  completed: boolean;
  source: "text" | "pdf" | "image";
  category: TaskCategory;
};

const words = [
  "Assignment",
  "Quiz",
  "Lab",
  "Project",
  "Presentation",
  "Reading",
  "Group meeting",
  "Submit form",
  "Pay fee",
  "Prepare notes",
];

function hashSeed(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], n: number) {
  return arr[n % arr.length];
}

function daysFromNow(d: number) {
  const date = new Date();
  date.setDate(date.getDate() + d);
  const iso = date.toISOString();
  return iso.slice(0, 10);
}

function inferPriority(title: string): Priority {
  const t = title.toLowerCase();
  if (t.includes("today") || t.includes("tomorrow") || t.includes("urgent") || t.includes("due")) return "High";
  if (t.includes("week") || t.includes("submit") || t.includes("quiz")) return "Medium";
  return "Low";
}

export async function simulateAiExtraction(args: {
  text?: string;
  pdfName?: string;
  imageName?: string;
}): Promise<ExtractedTask[]> {
  const base = `${args.text ?? ""}|${args.pdfName ?? ""}|${args.imageName ?? ""}`.trim();
  const seed = hashSeed(base || "smartsync");

  await new Promise((r) => setTimeout(r, 1200 + (seed % 900)));

  const count = 3 + (seed % 4);
  const tasks: ExtractedTask[] = [];

  for (let i = 0; i < count; i++) {
    const w = pick(words, seed + i * 13);
    const day = 1 + ((seed + i * 7) % 12);
    const hint = pick(["due", "this week", "tomorrow", "on portal", "in class"], seed + i * 3);

    const rawTitle = `${w}: ${pick(["Math", "CS", "Physics", "Chem", "English", "Economics"], seed + i * 17)} (${hint})`;
    const title = rawTitle.replace(/\s+/g, " ").trim();
    const priority = inferPriority(title);

    tasks.push({
      id: `${seed}-${i}`,
      title,
      deadline: daysFromNow(day),
      priority,
      completed: false,
      source: args.pdfName ? "pdf" : args.imageName ? "image" : "text",
      category: "Academic",
    });
  }

  // Make sure there's at least one high-priority item for demo clarity
  if (!tasks.some((t) => t.priority === "High")) {
    tasks[0] = {
      ...tasks[0],
      title: `URGENT: ${tasks[0].title}`,
      priority: "High",
      deadline: daysFromNow(2),
    };
  }

  return tasks;
}

export function formatDeadline(isoDate: string) {
  try {
    const d = new Date(isoDate + "T00:00:00");
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch {
    return isoDate;
  }
}

export function priorityStyles(p: Priority) {
  if (p === "High") return { label: "High", className: "bg-[hsl(0_84%_58%_/_.12)] text-[hsl(0_72%_42%)] border-[hsl(0_72%_42%_/_.22)]" };
  if (p === "Medium") return { label: "Medium", className: "bg-[hsl(30_95%_55%_/_.14)] text-[hsl(30_85%_38%)] border-[hsl(30_85%_38%_/_.22)]" };
  return { label: "Low", className: "bg-[hsl(175_70%_45%_/_.14)] text-[hsl(175_66%_30%)] border-[hsl(175_66%_30%_/_.22)]" };
}
