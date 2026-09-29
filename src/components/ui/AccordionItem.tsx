"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
}

export default function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const buttonId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  return (
    <div>
      <h3 className="font-sans">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          className="group flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-surface-hover sm:px-7 sm:py-6 cursor-pointer"
        >
          <span className="text-base font-medium leading-snug text-foreground sm:text-lg">
            {question}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-200",
              isOpen
                ? "border-accent/30 bg-accent-soft text-accent"
                : "border-border bg-surface text-text-secondary group-hover:border-border-strong group-hover:text-foreground"
            )}
          >
            <Plus
              className={cn(
                "h-4 w-4 transition-transform duration-200 ease-out",
                isOpen && "rotate-45"
              )}
            />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
        inert={!isOpen}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl px-5 pb-6 pr-16 leading-relaxed text-text-secondary sm:px-7 sm:pr-20">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
