"use client";

import { useState, type FormEvent } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmissionState("submitting");

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Submission failed");

      form.reset();
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  }

  return (
    <form action="https://formspree.io/f/xgedownq" method="POST" onSubmit={handleSubmit} className="rounded-lg border border-border bg-bg-main p-5 sm:p-8">
      <input type="hidden" name="_subject" value="New portfolio enquiry" />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-text-primary">Full name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Your name" className="contact-field min-h-12 w-full rounded-md border border-border bg-bg-surface px-4 py-3 text-text-primary placeholder:text-text-muted/70 transition-[border-color,box-shadow] hover:border-text-muted" />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-text-primary">Email address</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="contact-field min-h-12 w-full rounded-md border border-border bg-bg-surface px-4 py-3 text-text-primary placeholder:text-text-muted/70 transition-[border-color,box-shadow] hover:border-text-muted" />
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-text-primary">Phone number</label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required placeholder="+234 000 000 0000" className="contact-field min-h-12 w-full rounded-md border border-border bg-bg-surface px-4 py-3 text-text-primary placeholder:text-text-muted/70 transition-[border-color,box-shadow] hover:border-text-muted" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-text-primary">Project or request</label>
          <textarea id="contact-message" name="message" rows={6} required placeholder="Tell me about your request" className="contact-field min-h-36 w-full resize-y rounded-md border border-border bg-bg-surface px-4 py-3 text-text-primary placeholder:text-text-muted/70 transition-[border-color,box-shadow] hover:border-text-muted" />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" disabled={submissionState === "submitting"} className="min-h-12 w-full cursor-pointer rounded-md bg-accent px-5 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60">
            {submissionState === "submitting" ? "Sending…" : "Send message"} <span aria-hidden="true">→</span>
          </button>
          <p aria-live="polite" className={`mt-3 min-h-6 text-sm ${submissionState === "error" ? "text-red-300" : "text-text-muted"}`}>
            {submissionState === "success" ? "Thanks—your message has been sent." : null}
            {submissionState === "error" ? "Your message could not be sent. Please try again or use the email link." : null}
          </p>
        </div>
      </div>
    </form>
  );
}
