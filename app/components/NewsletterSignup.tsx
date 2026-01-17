'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { useI18n } from '@/app/context/I18nContext';

export function NewsletterSignup() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-20 md:py-28 bg-gradient-to-r from-slate-900 to-slate-950 border-y border-yellow-600/30"
    >
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-6 mb-10">
          <h2 className="text-4xl md:text-5xl font-light text-white">
            {t('newsletter.title')}
          </h2>
          <p className="text-lg text-gray-400 font-light">
            {t('newsletter.description')}
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 py-6 px-6 bg-emerald-600/20 border border-emerald-600/50 rounded"
          >
            <Check className="w-5 h-5 text-emerald-400" />
                        <p className="text-emerald-300 font-light">{t('newsletter.success')}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-600 pointer-events-none" />
              <input
                type="email"
                required
                placeholder={t('newsletter.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-yellow-600/30 text-white placeholder-gray-500 outline-none focus:border-yellow-600 focus:bg-slate-750 transition disabled:opacity-50"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white font-medium hover:shadow-lg hover:shadow-yellow-600/50 transition-all disabled:opacity-50 cursor-pointer"
            >
                            {loading ? t('newsletter.sending') : t('newsletter.subscribe')}
            </motion.button>
          </form>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-red-400 text-sm"
          >
                        {t('newsletter.error')}{error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
