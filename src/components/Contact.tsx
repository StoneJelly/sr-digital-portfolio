"use client";

import { useState, useRef, useId, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  CheckCircle,
  X,
  ArrowUpRight,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import { emailjsConfig } from "@/lib/emailjs";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const projectTypes = [
  "Business Website",
  "Landing Page",
  "Web Application",
  "Website Redesign",
  "Other",
];

const labelClass =
  "block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-text-tertiary";

function fieldClass(hasError: boolean) {
  return cn(
    "block w-full rounded-none border-0 border-b bg-transparent py-[13px] text-sm text-foreground placeholder:text-text-tertiary outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:shadow-[0_1px_0_0_var(--color-accent)]",
    hasError
      ? "border-danger focus:border-danger focus:shadow-[0_1px_0_0_var(--color-danger)]"
      : "border-border hover:border-border-strong"
  );
}

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {children}
      {required && (
        <>
          <span aria-hidden="true" className="ml-0.5 text-accent">
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-xs text-danger">
      <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    business: "",
    project_type: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;
  const eid = (name: string) => `${uid}-${name}-error`;
  const modalTitleId = `${uid}-success-title`;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showSuccess) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSuccess(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [showSuccess]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.from_name.trim()) newErrors.from_name = "Name is required";
    if (!formData.from_email.trim()) newErrors.from_email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email))
      newErrors.from_email = "Invalid email address";
    if (!formData.project_type) newErrors.project_type = "Select a project type";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current!,
        emailjsConfig.publicKey
      );
      setShowSuccess(true);
      setFormData({ from_name: "", from_email: "", business: "", project_type: "", message: "" });
      if (formRef.current) formRef.current.reset();
    } catch {
      alert("Failed to send message. Please try again or contact us via WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const a11y = (name: string) => ({
    id: fid(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? eid(name) : undefined,
  });

  const detailLink =
    "group inline-flex items-center gap-1.5 text-[0.8125rem] font-bold text-foreground transition-colors hover:text-accent";

  return (
    <section id="contact" className="section bg-surface">
      <div className="container-page grid grid-cols-1 gap-[55px] md:grid-cols-[0.85fr_1.15fr] md:gap-[60px] lg:gap-[120px]">
        <Reveal>
          <SectionHeading
            eyebrow="08 / Get in touch"
            align="left"
            title="Let's Talk About"
            highlight="Your Project"
            className="mb-0 md:mb-0"
          />
          <p className="mt-7 mb-[42px] max-w-[350px] text-[0.9375rem] leading-relaxed text-text-secondary">
            Have a website or web application idea? Send us a message and
            we&apos;ll get back to you with a quotation.
          </p>

          <dl>
            <div className="border-t border-border py-[15px]">
              <dt className={cn(labelClass, "mb-[7px]")}>WhatsApp</dt>
              <dd>
                <a
                  href={siteConfig.whatsappQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={detailLink}
                >
                  Chat with Us
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-text-tertiary transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              </dd>
            </div>
            <div className="border-t border-border py-[15px]">
              <dt className={cn(labelClass, "mb-[7px]")}>Email</dt>
              <dd>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className={cn(detailLink, "break-all")}
                >
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div className="border-y border-border py-[15px]">
              <dt className={cn(labelClass, "mb-[7px]")}>Location</dt>
              <dd className="text-[0.8125rem] font-bold text-foreground">
                {siteConfig.location}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-[22px]"
          >
            <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 sm:gap-5">
              <div>
                <FieldLabel htmlFor={fid("from_name")} required>
                  Name
                </FieldLabel>
                <input
                  type="text"
                  name="from_name"
                  autoComplete="name"
                  value={formData.from_name}
                  onChange={handleChange}
                  className={fieldClass(!!errors.from_name)}
                  placeholder="Your name"
                  {...a11y("from_name")}
                />
                <FieldError id={eid("from_name")} message={errors.from_name} />
              </div>
              <div>
                <FieldLabel htmlFor={fid("from_email")} required>
                  Email
                </FieldLabel>
                <input
                  type="email"
                  name="from_email"
                  autoComplete="email"
                  value={formData.from_email}
                  onChange={handleChange}
                  className={fieldClass(!!errors.from_email)}
                  placeholder="your@email.com"
                  {...a11y("from_email")}
                />
                <FieldError id={eid("from_email")} message={errors.from_email} />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor={fid("business")}>Business Name</FieldLabel>
              <input
                type="text"
                name="business"
                autoComplete="organization"
                value={formData.business}
                onChange={handleChange}
                className={fieldClass(false)}
                placeholder="Your business name (optional)"
                id={fid("business")}
              />
            </div>

            <div>
              <FieldLabel htmlFor={fid("project_type")} required>
                Project Type
              </FieldLabel>
              <div className="relative">
                <select
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleChange}
                  className={cn(
                    fieldClass(!!errors.project_type),
                    "cursor-pointer appearance-none pr-8",
                    !formData.project_type && "text-text-tertiary"
                  )}
                  {...a11y("project_type")}
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type} className="text-foreground">
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
                />
              </div>
              <FieldError id={eid("project_type")} message={errors.project_type} />
            </div>

            <div>
              <FieldLabel htmlFor={fid("message")} required>
                Message
              </FieldLabel>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={cn(fieldClass(!!errors.message), "resize-y")}
                placeholder="Tell us about your project..."
                {...a11y("message")}
              />
              <FieldError id={eid("message")} message={errors.message} />
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-[3px] w-full sm:w-auto sm:self-start"
              disabled={sending}
            >
              <Send aria-hidden="true" className="h-4 w-4" />
              <span aria-live="polite">
                {sending ? "Sending..." : "Request a Free Quote"}
              </span>
            </Button>
          </form>
        </Reveal>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-5 backdrop-blur-[2px]"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={modalTitleId}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-md rounded-[var(--radius-card)] border border-border bg-surface p-8 text-left shadow-[var(--shadow-lg)] sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-[var(--radius-control)] text-text-secondary transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[var(--radius-card)] bg-success-soft text-success">
                <CheckCircle aria-hidden="true" className="h-6 w-6" />
              </div>

              <h3
                id={modalTitleId}
                className="mb-2 text-2xl font-bold tracking-[-0.04em] text-foreground"
              >
                Message Sent!
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-text-secondary">
                Thank you for your enquiry. We&apos;ll get back to you with a
                quotation shortly.
              </p>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button href={siteConfig.whatsappFollowUpUrl} variant="whatsapp">
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  Also Chat on WhatsApp
                </Button>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setShowSuccess(false)}
                  className="inline-flex h-11 cursor-pointer items-center justify-center rounded-[var(--radius-control)] px-5 text-[0.8125rem] font-bold text-text-secondary transition-colors hover:bg-surface-hover hover:text-foreground"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
