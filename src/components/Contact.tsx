"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Send, CheckCircle, X } from "lucide-react";
import emailjs from "@emailjs/browser";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import { emailjsConfig } from "@/lib/emailjs";

const contactOptions = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "Chat with Us",
    href: "https://wa.me/60199403681?text=Hi%20SR%20Digital%20Solution%2C%20I%27m%20interested%20in%20your%20web%20development%20services.",
    color: "text-green-400",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "sebastianraj2003@gmail.com",
    href: "mailto:sebastianraj2003@gmail.com",
    color: "text-accent",
  },
];

const projectTypes = [
  "Business Website",
  "Landing Page",
  "Web Application",
  "Website Redesign",
  "Other",
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    projectType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.projectType) newErrors.projectType = "Select a project type";
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
      setFormData({ name: "", email: "", business: "", projectType: "", message: "" });
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

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Let's Talk About Your Project"
          subtitle="Have a website or web application idea? Send us a message and we'll get back to you with a quotation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            {contactOptions.map((option) => (
              <motion.a
                key={option.title}
                href={option.href}
                target={option.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  option.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 bg-surface border border-border rounded-xl p-5 hover:border-accent/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center shrink-0">
                  <option.icon
                    className={`w-5 h-5 ${option.color}`}
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{option.title}</p>
                  <p className="text-text-secondary text-sm">{option.detail}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Business Name
              </label>
              <input
                type="text"
                name="business"
                value={formData.business}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="Your business name (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Project Type *
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select project type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.projectType}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={sending}>
              <Send className="w-4 h-4" />
              {sending ? "Sending..." : "Request a Free Quote"}
            </Button>
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-surface border border-border rounded-2xl p-8 sm:p-10 max-w-md w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>

              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-text-secondary mb-6">
                Thank you for your enquiry. We&apos;ll get back to you with a
                quotation shortly.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/60199403681?text=Hi%20SR%20Digital%20Solution%2C%20I%27ve%20just%20submitted%20a%20form%20enquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20 px-6 py-3 rounded-lg font-medium text-sm hover:bg-green-500/20 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Also Chat on WhatsApp
                </a>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="text-text-secondary text-sm hover:text-foreground transition-colors cursor-pointer"
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
