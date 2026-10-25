"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqsData } from "@/lib/site";
import { ovo } from "@/lib/fonts";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="faq"
      className="w-full px-6 sm:px-10 md:px-[8%] lg:px-[12%] py-16 scroll-mt-20 bg-neutral-50/50 dark:bg-neutral-900/30 border-y border-neutral-200 dark:border-neutral-800"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`${ovo.className} text-center mb-2 text-base sm:text-lg text-gray-700 dark:text-gray-300 flex items-center justify-center gap-1.5`}
      >
        <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span>Tanya Jawab Seputar Layanan</span>
      </motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`${ovo.className} text-center text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-gray-100 mb-4`}
      >
        Pertanyaan yang Sering Diajukan (FAQ)
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`${ovo.className} text-center text-sm sm:text-base max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-300`}
      >
        Temukan jawaban cepat terkait estimasi waktu, biaya pengerjaan, teknologi, dan alur pembuatan website di Moha Project.
      </motion.p>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {faqsData.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-black dark:text-white" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/60 mt-1">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
