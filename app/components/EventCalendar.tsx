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

function getMonthMatrix(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDayOfWeek = (firstDay.getDay() + 6) % 7; // Monday=0
  const daysInMonth = lastDay.getDate();

  const days: Date[] = [];

  // Leading days from previous month
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(new Date(year, month, i - startDayOfWeek + 1));
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }
  // Trailing days to fill 6x7 grid
  while (days.length % 7 !== 0) {
    const last = days[days.length - 1];
    days.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
  }

  // Chunk into weeks
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function EventCalendar() {
  const { language } = useI18n();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthEvents = useMemo(() => getEventsByMonth(currentDate.getFullYear(), currentDate.getMonth()), [currentDate]);
  const weeks = useMemo(() => getMonthMatrix(currentDate), [currentDate]);

  const isSameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

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

      {/* Month Grid */}
      <div className="overflow-hidden rounded-lg border border-yellow-600/30">
        {/* Weekday header */}
        <div className="grid grid-cols-7 bg-slate-900/60 border-b border-yellow-600/20">
          {["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"].map((d) => (
            <div key={d} className="px-3 py-2 text-xs text-gray-400 uppercase tracking-wider text-center">{d}</div>
          ))}
        </div>
        {/* Weeks */}
        <div className="divide-y divide-yellow-600/10">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {week.map((day, di) => {
                const inCurrentMonth = day.getMonth() === currentDate.getMonth();
                const todaysEvents = monthEvents.filter(e => isSameDay(e.date, day));
                return (
                  <div key={di} className={`min-h-[110px] p-2 border-r border-yellow-600/10 last:border-r-0 ${inCurrentMonth ? 'bg-slate-950' : 'bg-slate-950/60'} hover:bg-slate-900/60 transition-colors`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${inCurrentMonth ? 'text-gray-300' : 'text-gray-600'}`}>{day.getDate()}</span>
                      {isSameDay(day, new Date()) && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-600/20 text-yellow-500">danas</span>
                      )}
                    </div>
                    <div className="mt-2 space-y-1">
                      {todaysEvents.map((event) => {
                        const colors = categoryColors[event.category];
                        const label = categoryLabels[event.category][language as 'hr' | 'de'];
                        return (
                          <div key={event.id} className={`px-2 py-1 rounded border border-yellow-600/20 bg-gradient-to-r ${colors.bg}`}>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] ${colors.badge} px-1 py-0.5 rounded`}>{label}</span>
                              <span className="text-xs text-white truncate">{language === 'de' ? event.titleDe : event.title}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                              <Clock className="w-3 h-3 text-yellow-600" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
