"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  /** Zero-based position, rendered as "01", "02", ... */
  index: number;
}

export default function AccordionItem({ question, answer, index }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const buttonId = `${id}-trigger`;
  const panelId = `${id}-panel`;
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="border-t border-border last:border-b">
      <h3 className="m-0 text-[0.9375rem] font-bold tracking-normal">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          className="group grid w-full cursor-pointer grid-cols-[35px_1fr_20px] items-start gap-2.5 py-[21px] text-left"
        >
          <span
            aria-hidden="true"
            className="pt-1 text-[0.6875rem] font-bold leading-none text-accent tabular-nums"
          >
            {number}
          </span>
          <span className="leading-snug text-foreground transition-colors group-hover:text-accent">
            {question}
          </span>
          <Plus
            aria-hidden="true"
            className={cn(
              "mt-0.5 h-[17px] w-[17px] transition-[transform,color] duration-200 ease-out",
              isOpen
                ? "rotate-45 text-accent"
                : "text-text-tertiary group-hover:text-accent"
            )}
          />
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
          <p className="pb-[21px] pl-[45px] pr-[30px] text-sm leading-relaxed text-text-secondary">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
