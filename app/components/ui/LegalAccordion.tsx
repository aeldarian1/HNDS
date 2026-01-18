'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface LegalSection {
  title: string;
  subtitle?: string;
  content: string[];
}

interface LegalAccordionProps {
  sections: LegalSection[];
  className?: string;
}

export function LegalAccordion({ sections, className }: LegalAccordionProps) {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  return (
    <div className={className}>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="border border-yellow-600/30 hover:border-yellow-600 transition duration-300"
          >
            <button
              onClick={() => setExpandedSection(expandedSection === index ? null : index)}
              className="w-full p-6 flex items-start gap-4 hover:bg-yellow-600/5 transition duration-300 text-left"
            >
              <div className="flex-1">
                <h3 className="text-xl font-light text-white mb-1">{section.title}</h3>
                {section.subtitle && (
                  <p className="text-sm text-gray-400 font-light">{section.subtitle}</p>
                )}
              </div>
              <motion.div
                animate={{ rotate: expandedSection === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 mt-1"
              >
                <ChevronDown className="w-5 h-5 text-yellow-600" />
              </motion.div>
            </button>

            <AnimatePresence mode="wait">
              {expandedSection === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0 border-t border-yellow-600/20 bg-yellow-600/5">
                    <ul className="space-y-3 pt-4">
                      {section.content.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex gap-3 text-gray-300 font-light"
                        >
                          <span className="text-yellow-600 mt-1">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default LegalAccordion;
