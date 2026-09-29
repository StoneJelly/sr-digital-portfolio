"use client";

import { useState, useRef, useId, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Send,
  CheckCircle,
  X,
  ArrowUpRight,
  ChevronDown,
  AlertCircle,
  MapPin,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import { emailjsConfig } from "@/lib/emailjs";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const contactOptions = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "Chat with Us",
    href: siteConfig.whatsappQuoteUrl,
    tile: "bg-success-soft text-whatsapp",
  },
  {
    icon: Mail,
    title: "Email",
    detail: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    tile: "bg-accent-soft text-accent",
  },
];

const projectTypes = [
  "Business Website",
  "Landing Page",
  "Web Application",
  "Website Redesign",
  "Other",
];

const inputBase =
  "w-full bg-surface border rounded-[var(--radius-control)] px-3.5 text-sm text-foreground placeholder:text-text-tertiary outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-4 focus:ring-accent/10";

function inputClass(hasError: boolean) {
  return cn(
    inputBase,
    hasError ? "border-danger" : "border-border hover:border-border-strong"
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
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-foreground"
    >
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
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
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

  return (
    <section id="contact" className="section bg-surface">
      <div className="container-page">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Talk About Your Project"
          subtitle="Have a website or web application idea? Send us a message and we'll get back to you with a quotation."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <ul className="space-y-3">
              {contactOptions.map((option) => {
                const external = option.href.startsWith("http");
                return (
                  <li key={option.title}>
                    <a
                      href={option.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-sm)] sm:p-5"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-control)]",
                          option.tile
                        )}
                      >
                        <option.icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-foreground">
                          {option.title}
                        </span>
                        <span className="block truncate text-sm text-text-secondary">
                          {option.detail}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-text-tertiary transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-sm text-text-tertiary">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              Based in {siteConfig.location}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-sm)] sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                    className={cn(inputClass(!!errors.from_name), "h-11")}
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
                    className={cn(inputClass(!!errors.from_email), "h-11")}
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
                  className={cn(inputClass(false), "h-11")}
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
                      inputClass(!!errors.project_type),
                      "h-11 cursor-pointer appearance-none pr-10",
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
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
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
                  className={cn(inputClass(!!errors.message), "resize-none py-3")}
                  placeholder="Tell us about your project..."
                  {...a11y("message")}
                />
                <FieldError id={eid("message")} message={errors.message} />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={sending}>
                <Send aria-hidden="true" className="h-4 w-4" />
                <span aria-live="polite">
                  {sending ? "Sending..." : "Request a Free Quote"}
                </span>
              </Button>
            </form>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 px-4 backdrop-blur-[2px]"
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
              className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-lg)] sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-muted hover:text-foreground cursor-pointer"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-success-soft text-success">
                <CheckCircle aria-hidden="true" className="h-7 w-7" />
              </div>

              <h3 id={modalTitleId} className="mb-2 text-xl font-bold text-foreground">
                Message Sent!
              </h3>
              <p className="mb-6 text-text-secondary">
                Thank you for your enquiry. We&apos;ll get back to you with a
                quotation shortly.
              </p>

              <div className="flex flex-col gap-2">
                <Button href={siteConfig.whatsappFollowUpUrl} variant="whatsapp">
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  Also Chat on WhatsApp
                </Button>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setShowSuccess(false)}
                  className="inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] px-5 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-muted hover:text-foreground cursor-pointer"
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
