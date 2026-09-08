"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const techStack = {
  Frontend: ["Angular", "HTML", "CSS", "JavaScript", "TypeScript"],
  Backend: ["Node.js", "Express"],
  Database: ["MySQL", "Firebase"],
  Other: ["REST APIs", "Git", "GitHub", "AI-assisted development"],
};

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About SR Digital Solution"
          subtitle="Professional digital solutions for businesses of all sizes."
        />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface border border-border rounded-2xl p-8 sm:p-10 mb-8"
          >
            <p className="text-text-secondary leading-relaxed mb-4">
              SR Digital Solution is a freelance web development service focused
              on helping small businesses, startups and individuals establish a
              professional online presence.
            </p>
            <p className="text-text-secondary leading-relaxed">
              We build modern, responsive websites and custom web applications
              with a focus on affordability, usability and fast delivery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-surface border border-border rounded-2xl p-8 sm:p-10"
          >
            <h3 className="text-xl font-bold mb-2">Meet the Developer</h3>
            <p className="text-accent font-medium mb-4">Sebastian Raj</p>
            <p className="text-text-secondary leading-relaxed mb-6">
              A Computer Science (Artificial Intelligence) graduate and freelance
              web developer passionate about building practical digital solutions
              for businesses.
            </p>

            <div className="space-y-4">
              {Object.entries(techStack).map(([category, techs]) => (
                <div key={category}>
                  <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-hover text-text-secondary text-xs px-3 py-1.5 rounded-full border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
