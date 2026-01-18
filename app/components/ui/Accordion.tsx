'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, type ReactNode, type ElementType } from 'react';
import { cn } from '@/lib/utils';

interface AccordionSection {
  title: string;
  subtitle?: string;
  content: string[];
  icon?: ElementType;
}

interface AccordionProps {
  sections: AccordionSection[];
  className?: string;
  defaultExpanded?: number | null;
}

export function Accordion({ sections, className, defaultExpanded = null }: AccordionProps) {
  const [expandedSection, setExpandedSection] = useState<number | null>(defaultExpanded);

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className={cn('space-y-3 sm:space-y-4', className)}>
      {sections.map((section, index) => {
        const Icon = section.icon;
        const isExpanded = expandedSection === index;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleSection(index)}
              className={cn(
                'w-full p-4 sm:p-5 md:p-6 flex items-center gap-3 sm:gap-4 text-left transition-colors duration-300',
                isExpanded ? 'bg-yellow-600/5' : 'hover:bg-white/5'
              )}
            >
              {Icon && (
                <div
                  className={cn(
                    'p-2 sm:p-2.5 rounded-lg transition-colors duration-300',
                    isExpanded
                      ? 'bg-yellow-600/20 text-yellow-500'
                      : 'bg-white/5 text-gray-400'
                  )}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3
                  className={cn(
                    'text-base sm:text-lg font-medium transition-colors duration-300',
                    isExpanded ? 'text-yellow-500' : 'text-white'
                  )}
                >
                  {section.title}
                </h3>
                {section.subtitle && (
                  <p className="text-xs sm:text-sm text-gray-400 font-light mt-0.5 sm:mt-1">
                    {section.subtitle}
                  </p>
                )}
              </div>

              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'p-1.5 sm:p-2 rounded-lg flex-shrink-0 transition-colors duration-300',
                  isExpanded
                    ? 'bg-yellow-600/20 text-yellow-500'
                    : 'bg-white/5 text-gray-400'
                )}
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </button>

            {/* Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 sm:p-5 md:p-6 pt-0 sm:pt-0 md:pt-0">
                    <div className="border-t border-white/5 pt-4 sm:pt-5 md:pt-6">
                      <ul className="space-y-2 sm:space-y-3">
                        {section.content.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-2 sm:gap-3"
                          >
                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-yellow-600 mt-2 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-gray-300 font-light">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// Simplified accordion item for simple expand/collapse content
interface SimpleAccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function SimpleAccordionItem({ 
  title, 
  children, 
  defaultOpen = false,
  className 
}: SimpleAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('border-b border-white/10', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:text-yellow-500 transition-colors"
      >
        <span className="font-medium text-white">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-300 font-light">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Accordion;
