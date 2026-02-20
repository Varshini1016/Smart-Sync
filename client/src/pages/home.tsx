import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Image as ImageIcon, MessageSquareText, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/SectionCard";

function FeaturePill({
  icon,
  label,
  testId,
}: {
  icon: React.ReactNode;
  label: string;
  testId: string;
}) {
  return (
    <div
      data-testid={testId}
      className="chip inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-foreground"
    >
      <span className="text-[hsl(var(--primary))]">{icon}</span>
      <span className="font-semibold">{label}</span>
    </div>
  );
}

function Step({
  n,
  title,
  body,
  testId,
}: {
  n: string;
  title: string;
  body: string;
  testId: string;
}) {
  return (
    <div data-testid={testId} className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.68)] p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-[hsl(var(--primary)/0.14)] text-[hsl(var(--primary))]">
          <span className="font-[Outfit] text-sm font-semibold">{n}</span>
        </div>
        <div>
          <div className="font-semibold text-foreground" data-testid={`${testId}-title`}>{title}</div>
          <div className="mt-1 text-sm text-[hsl(var(--muted-foreground))]" data-testid={`${testId}-body`}>{body}</div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="app-shell">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid items-start gap-6 lg:grid-cols-12">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="glass noise rounded-3xl p-6 md:p-8 lg:col-span-7"
            data-testid="section-hero"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                data-testid="badge-hero"
                className="badge-soft rounded-full border px-3 py-1 text-xs font-semibold"
              >
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" strokeWidth={2.2} />
                  SmartSync
                </span>
              </Badge>
              <Badge
                data-testid="badge-hero-sub"
                className="badge-soft rounded-full border px-3 py-1 text-xs font-semibold"
              >
                Built for students
              </Badge>
            </div>

            <h1
              data-testid="text-hero-title"
              className="mt-5 font-[Outfit] text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
            >
              SmartSync – Organizing Student Life, Automatically
            </h1>
            <p
              data-testid="text-hero-description"
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-[hsl(var(--muted-foreground))] md:text-base"
            >
              Drop in WhatsApp messages, emails, PDFs, or screenshots—SmartSync uses AI-style extraction (NLP + OCR simulation)
              to convert them into clean, prioritized tasks with deadlines.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/upload" data-testid="link-hero-upload">
                <Button
                  data-testid="button-hero-upload"
                  className="btn-primary-glow w-full gap-2 rounded-full sm:w-auto"
                >
                  <Upload className="h-4 w-4" strokeWidth={2.2} />
                  Upload Notice
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </Button>
              </Link>
              <Link href="/dashboard" data-testid="link-hero-dashboard">
                <Button
                  data-testid="button-hero-dashboard"
                  variant="secondary"
                  className="w-full gap-2 rounded-full sm:w-auto"
                >
                  View Tasks
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </Button>
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              <FeaturePill
                testId="pill-source-text"
                icon={<MessageSquareText className="h-4 w-4" strokeWidth={2.2} />}
                label="Paste text"
              />
              <FeaturePill
                testId="pill-source-pdf"
                icon={<FileText className="h-4 w-4" strokeWidth={2.2} />}
                label="Upload PDFs"
              />
              <FeaturePill
                testId="pill-source-image"
                icon={<ImageIcon className="h-4 w-4" strokeWidth={2.2} />}
                label="Upload screenshots"
              />
            </div>
          </motion.section>

          <div className="lg:col-span-5">
            <SectionCard testId="section-preview" className="h-full">
              <div className="flex items-center justify-between">
                <div>
                  <div data-testid="text-preview-title" className="font-[Outfit] text-lg font-semibold">
                    Today’s focus
                  </div>
                  <div data-testid="text-preview-sub" className="text-sm text-[hsl(var(--muted-foreground))]">
                    A quick demo of what SmartSync creates.
                  </div>
                </div>
                <Link href="/upload" data-testid="link-preview-try">
                  <Button data-testid="button-preview-try" size="sm" className="gap-2 rounded-full">
                    Try it
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  </Button>
                </Link>
              </div>

              <div className="mt-5 grid gap-3">
                <div data-testid="card-preview-1" className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 font-semibold">URGENT: Submit Lab Report (portal)</div>
                    <Badge className="rounded-full border px-2.5 py-1 text-xs font-semibold bg-[hsl(0_84%_58%_/_.12)] text-[hsl(0_72%_42%)] border-[hsl(0_72%_42%_/_.22)]">High</Badge>
                  </div>
                  <div className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Due Feb 3 • From screenshot</div>
                </div>
                <div data-testid="card-preview-2" className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 font-semibold">Quiz: CS (this week)</div>
                    <Badge className="rounded-full border px-2.5 py-1 text-xs font-semibold bg-[hsl(30_95%_55%_/_.14)] text-[hsl(30_85%_38%)] border-[hsl(30_85%_38%_/_.22)]">Medium</Badge>
                  </div>
                  <div className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Due Feb 8 • From PDF</div>
                </div>
                <div data-testid="card-preview-3" className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 font-semibold">Reading: Economics (in class)</div>
                    <Badge className="rounded-full border px-2.5 py-1 text-xs font-semibold bg-[hsl(175_70%_45%_/_.14)] text-[hsl(175_66%_30%)] border-[hsl(175_66%_30%_/_.22)]">Low</Badge>
                  </div>
                  <div className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Due Feb 10 • From text</div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <SectionCard testId="section-how" className="lg:col-span-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 data-testid="text-how-title" className="font-[Outfit] text-2xl font-semibold tracking-tight">
                  How it works
                </h2>
                <p data-testid="text-how-sub" className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                  A simple flow that matches how students actually receive info.
                </p>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-[hsl(var(--card)/0.55)] px-3 py-2 text-xs font-semibold text-[hsl(var(--muted-foreground))] sm:flex">
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[hsl(var(--accent))]" />
                  Demo-ready
                </span>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Step
                n="1"
                title="Upload or share data"
                body="Paste a message or add a PDF / screenshot from class groups and portals."
                testId="step-1"
              />
              <Step
                n="2"
                title="AI extracts tasks"
                body="NLP + OCR-style parsing turns messy text into clean action items."
                testId="step-2"
              />
              <Step
                n="3"
                title="Tasks are prioritized"
                body="Deadlines + urgency keywords are used to set High / Medium / Low." 
                testId="step-3"
              />
              <Step
                n="4"
                title="Reminders are sent"
                body="In this prototype we simulate reminders—perfect for hackathon demos."
                testId="step-4"
              />
            </div>
          </SectionCard>

          <SectionCard testId="section-about" className="lg:col-span-5">
            <h2 data-testid="text-about-title" className="font-[Outfit] text-2xl font-semibold tracking-tight">
              About SmartSync
            </h2>
            <p data-testid="text-about-body" className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              College information is scattered across WhatsApp groups, email threads, notice PDFs, and screenshots.
              Important deadlines get buried, and students end up doing mental “tab management” all day.
            </p>
            <p data-testid="text-about-body-2" className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              SmartSync fixes this by turning anything you receive into a single task list.
              It extracts action items, adds deadlines, and prioritizes what matters—so you can focus on studying.
            </p>

            <div className="mt-5 grid gap-3">
              <div data-testid="about-point-1" className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.6)] p-4 shadow-sm">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.14)] text-[hsl(var(--primary))]">
                    <Upload className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  Capture it fast
                </div>
                <div className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                  Paste or upload from wherever your college shares updates.
                </div>
              </div>
              <div data-testid="about-point-2" className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.6)] p-4 shadow-sm">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[hsl(var(--accent)/0.16)] text-[hsl(var(--accent))]">
                    <Sparkles className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  Auto-organize
                </div>
                <div className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                  Get clean tasks with priority—made for quick decision-making.
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Link href="/dashboard" data-testid="link-about-dashboard">
                <Button data-testid="button-about-dashboard" className="w-full gap-2 rounded-full">
                  Open Dashboard
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </Button>
              </Link>
            </div>
          </SectionCard>
        </div>

        <footer className="mx-auto mt-12 max-w-6xl px-1">
          <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.55)] p-4 text-sm text-[hsl(var(--muted-foreground))] md:flex-row md:items-center">
            <div data-testid="text-footer-left">
              SmartSync is a demo prototype (AI is simulated). Built for hackathon speed.
            </div>
            <div data-testid="text-footer-right" className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-[hsl(var(--primary))]" />
                v0.1
              </span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
