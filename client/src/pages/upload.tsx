import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileImage, FileText, Loader2, MessageSquareText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SectionCard } from "@/components/SectionCard";
import { Separator } from "@/components/ui/separator";
import { simulateAiExtraction, type ExtractedTask } from "@/lib/smartsync";
import { TaskCard } from "@/components/TaskCard";

function FileRow({
  label,
  value,
  icon,
  onPick,
  onClear,
  testIdPick,
  testIdClear,
}: {
  label: string;
  value?: string;
  icon: React.ReactNode;
  onPick: () => void;
  onClear: () => void;
  testIdPick: string;
  testIdClear: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="font-semibold" data-testid={`${testIdPick}-label`}>
            {label}
          </div>
          <div
            className="mt-0.5 truncate text-sm text-[hsl(var(--muted-foreground))]"
            data-testid={`${testIdPick}-value`}
          >
            {value ? value : "No file selected"}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          data-testid={testIdPick}
          type="button"
          variant="secondary"
          className="rounded-full"
          onClick={onPick}
        >
          Choose
        </Button>
        <Button
          data-testid={testIdClear}
          type="button"
          variant="ghost"
          className="rounded-full"
          onClick={onClear}
          disabled={!value}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export default function UploadPage() {
  const [text, setText] = useState("");
  const [pdfName, setPdfName] = useState<string | undefined>(undefined);
  const [imageName, setImageName] = useState<string | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<ExtractedTask[]>([]);

  const pdfInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const canProcess = useMemo(() => {
    return text.trim().length > 0 || !!pdfName || !!imageName;
  }, [text, pdfName, imageName]);

  async function onProcess() {
    setLoading(true);
    setTasks([]);

    try {
      const extracted = await simulateAiExtraction({
        text: text.trim() ? text.trim() : undefined,
        pdfName,
        imageName,
      });
      setTasks(extracted);
    } finally {
      setLoading(false);
    }
  }

  function toggleTask(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function clearAll() {
    setText("");
    setPdfName(undefined);
    setImageName(undefined);
    setTasks([]);
    if (pdfInputRef.current) pdfInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  return (
    <main className="app-shell">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid gap-6 lg:grid-cols-12">
          <SectionCard testId="section-upload" className="lg:col-span-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-[hsl(var(--card)/0.55)] px-3 py-1 text-xs font-semibold text-[hsl(var(--muted-foreground))]">
                  <Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" strokeWidth={2.2} />
                  Upload
                </div>
                <h1 data-testid="text-upload-title" className="mt-3 font-[Outfit] text-2xl font-semibold tracking-tight">
                  Upload notices
                </h1>
                <p data-testid="text-upload-sub" className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  Paste text or upload a PDF / screenshot. We’ll simulate AI extraction and show the tasks.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label data-testid="label-paste" className="text-sm font-semibold">
                Paste text (WhatsApp / email)
              </label>
              <Textarea
                data-testid="input-paste-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`e.g. "Reminder: Submit assignment by Friday 5pm. Quiz next Monday."`}
                className="mt-2 min-h-32 rounded-2xl border-border/70 bg-[hsl(var(--card)/0.65)]"
              />
            </div>

            <div className="mt-5 space-y-3">
              <input
                data-testid="input-pdf-hidden"
                ref={pdfInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setPdfName(e.target.files?.[0]?.name)}
              />
              <input
                data-testid="input-image-hidden"
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageName(e.target.files?.[0]?.name)}
              />

              <FileRow
                label="Upload PDF"
                value={pdfName}
                icon={<FileText className="h-5 w-5" strokeWidth={2.2} />}
                onPick={() => pdfInputRef.current?.click()}
                onClear={() => {
                  setPdfName(undefined);
                  if (pdfInputRef.current) pdfInputRef.current.value = "";
                }}
                testIdPick="button-pick-pdf"
                testIdClear="button-clear-pdf"
              />

              <FileRow
                label="Upload screenshot / image"
                value={imageName}
                icon={<FileImage className="h-5 w-5" strokeWidth={2.2} />}
                onPick={() => imageInputRef.current?.click()}
                onClear={() => {
                  setImageName(undefined);
                  if (imageInputRef.current) imageInputRef.current.value = "";
                }}
                testIdPick="button-pick-image"
                testIdClear="button-clear-image"
              />
            </div>

            <Separator className="my-5" />

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                data-testid="button-process"
                className="btn-primary-glow w-full rounded-full"
                onClick={onProcess}
                disabled={!canProcess || loading}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing…
                  </span>
                ) : (
                  "Extract Tasks"
                )}
              </Button>
              <Button
                data-testid="button-clear-all"
                variant="secondary"
                className="w-full rounded-full"
                onClick={clearAll}
                disabled={loading}
              >
                Reset
              </Button>
            </div>

            <div className="mt-4 rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.55)] p-4 text-sm text-[hsl(var(--muted-foreground))]">
              <div className="font-semibold text-foreground" data-testid="text-upload-tip-title">
                Demo tip
              </div>
              <div className="mt-1" data-testid="text-upload-tip-body">
                Paste a messy paragraph with multiple deadlines—SmartSync will generate a prioritized list.
              </div>
            </div>
          </SectionCard>

          <SectionCard testId="section-results" className="lg:col-span-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 data-testid="text-results-title" className="font-[Outfit] text-xl font-semibold tracking-tight">
                  Extracted tasks
                </h2>
                <p data-testid="text-results-sub" className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                  Tasks appear here after processing.
                </p>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-[hsl(var(--card)/0.55)] px-3 py-2 text-xs font-semibold text-[hsl(var(--muted-foreground))] sm:flex">
                <span className="inline-flex items-center gap-2">
                  <MessageSquareText className="h-4 w-4" strokeWidth={2.2} />
                  Text
                </span>
                <span className="inline-flex items-center gap-2">
                  <FileText className="h-4 w-4" strokeWidth={2.2} />
                  PDF
                </span>
                <span className="inline-flex items-center gap-2">
                  <FileImage className="h-4 w-4" strokeWidth={2.2} />
                  Image
                </span>
              </div>
            </div>

            <AnimatePresence>
              {loading && (
                <motion.div
                  data-testid="status-processing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-6 rounded-3xl border border-border/70 bg-[hsl(var(--card)/0.55)] p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                    <div>
                      <div className="font-semibold" data-testid="text-processing-title">
                        Processing your upload…
                      </div>
                      <div className="text-sm text-[hsl(var(--muted-foreground))]" data-testid="text-processing-sub">
                        Simulating OCR + NLP extraction and smart prioritization.
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        data-testid={`skeleton-card-${i}`}
                        className="h-20 rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)]"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!loading && tasks.length === 0 && (
              <div
                data-testid="empty-results"
                className="mt-6 rounded-3xl border border-border/70 bg-[hsl(var(--card)/0.55)] p-8 text-center"
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-3xl bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]">
                  <Sparkles className="h-6 w-6" strokeWidth={2.2} />
                </div>
                <div className="mt-3 font-[Outfit] text-lg font-semibold" data-testid="text-empty-title">
                  Nothing extracted yet
                </div>
                <div className="mt-1 text-sm text-[hsl(var(--muted-foreground))]" data-testid="text-empty-sub">
                  Upload something on the left and hit “Extract Tasks”.
                </div>
              </div>
            )}

            {!loading && tasks.length > 0 && (
              <div className="mt-6 grid gap-3">
                {tasks.map((t) => (
                  <TaskCard key={t.id} task={t} onToggle={toggleTask} />
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
