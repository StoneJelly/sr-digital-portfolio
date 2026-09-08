"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
}

export default function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left bg-surface hover:bg-surface-hover transition-colors cursor-pointer"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-text-secondary shrink-0 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-text-secondary leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
