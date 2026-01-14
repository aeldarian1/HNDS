'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Users, Clock } from 'lucide-react';
import { getEventsByMonth } from '@/app/lib/events';
import type { Event } from '@/app/lib/events';
import { useI18n } from '@/app/context/I18nContext';

const categoryColors: Record<Event['category'], { bg: string; text: string; badge: string }> = {
  course: { bg: 'from-blue-600/10 to-blue-500/10', text: 'text-blue-400', badge: 'bg-blue-600/20 text-blue-400' },
  cultural: { bg: 'from-purple-600/10 to-purple-500/10', text: 'text-purple-400', badge: 'bg-purple-600/20 text-purple-400' },
  trip: { bg: 'from-emerald-600/10 to-emerald-500/10', text: 'text-emerald-400', badge: 'bg-emerald-600/20 text-emerald-400' },
  social: { bg: 'from-pink-600/10 to-pink-500/10', text: 'text-pink-400', badge: 'bg-pink-600/20 text-pink-400' },
};

const categoryLabels = {
  course: { hr: 'Tečaj', de: 'Kurs' },
  cultural: { hr: 'Kulturni događaj', de: 'Kulturveranstaltung' },
  trip: { hr: 'Izlet', de: 'Ausflug' },
  social: { hr: 'Društveni', de: 'Gesellschaftlich' },
};

export function EventCalendar() {
  const { language } = useI18n();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthEvents = useMemo(() => {
    return getEventsByMonth(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthName = new Intl.DateTimeFormat(language === 'de' ? 'de-DE' : 'hr-HR', {
    month: 'long',
    year: 'numeric',
  }).format(currentDate);

  return (
    <div className="space-y-8">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevMonth}
          className="p-2 hover:bg-yellow-600/20 rounded transition"
        >
          <ChevronLeft className="w-6 h-6 text-yellow-600" />
        </motion.button>

        <h2 className="text-2xl font-light text-white capitalize">{monthName}</h2>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextMonth}
          className="p-2 hover:bg-yellow-600/20 rounded transition"
        >
          <ChevronRight className="w-6 h-6 text-yellow-600" />
        </motion.button>
      </div>

      {/* Events List */}
      {monthEvents.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {monthEvents.map((event, idx) => {
            const colors = categoryColors[event.category];
            const label = categoryLabels[event.category][language as 'hr' | 'de'];

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative overflow-hidden rounded-lg border border-yellow-600/30 hover:border-yellow-600 transition-all p-6 bg-gradient-to-br ${colors.bg}`}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className={`inline-block px-3 py-1 rounded text-xs font-medium uppercase tracking-wider ${colors.badge}`}>
                        {label}
                      </div>
                      <h3 className="text-xl font-light text-white mt-2 group-hover:text-yellow-400 transition">
                        {language === 'de' ? event.titleDe : event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 font-light text-sm">
                    {language === 'de' ? event.descriptionDe : event.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 pt-4 border-t border-yellow-600/20">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <CalendarIcon className="w-4 h-4 text-yellow-600" />
                      {event.date.toLocaleDateString(language === 'de' ? 'de-DE' : 'hr-HR')}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      {event.time}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4 text-yellow-600" />
                      {event.location}
                    </div>

                    {event.capacity && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="w-4 h-4 text-yellow-600" />
                        {event.registered || 0} / {event.capacity} {language === 'de' ? 'Teilnehmer' : 'Sudionika'}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <button className="w-full mt-4 px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-400 font-light rounded transition">
                    {language === 'de' ? 'Mehr erfahren' : 'Saznaj više'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 font-light">
            {language === 'de' ? 'Keine Veranstaltungen in diesem Monat' : 'Nema događaja ovaj mjesec'}
          </p>
        </motion.div>
      )}
    </div>
  );
}
