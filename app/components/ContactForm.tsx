'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { useI18n } from '@/app/context/I18nContext';

export function ContactForm() {
  const { t, language } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div>
          <h3 className="text-2xl font-light text-white mb-2">{t('contact.address')}</h3>
          <p className="text-gray-400 font-light">
            Hrvatsko-njemačko društvo Split<br />
            Obala Hrvatskog narodnog preporoda 10<br />
            21 000 Split, Hrvatska
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-light text-white mb-2 flex items-center gap-3">
            <Phone className="w-5 h-5 text-yellow-600" />
            {t('contact.phone')}
          </h3>
          <p className="text-gray-400 font-light">
            +385 21 123 456<br />
            +385 21 123 457
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-light text-white mb-2 flex items-center gap-3">
            <Mail className="w-5 h-5 text-yellow-600" />
            Email
          </h3>
          <p className="text-gray-400 font-light break-all">
            info@hnds-split.hr<br />
            kontakt@hnds-split.hr
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-light text-white mb-4">{t('contact.followUs')}</h3>
          <div className="flex gap-4">
            {['Facebook', 'Instagram', 'YouTube'].map((social, i) => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 flex items-center justify-center border border-yellow-600/50 hover:border-yellow-600 hover:bg-yellow-600/10 rounded-full transition text-yellow-600 hover:text-yellow-500"
              >
                {social.charAt(0)}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-2 space-y-6"
      >
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-emerald-600/20 border border-emerald-600/50 rounded"
          >
            <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <p className="text-emerald-300 font-light">
              {language === 'de'
                ? 'Vielen Dank! Wir werden Sie bald kontaktieren.'
                : 'Hvala! Brzo ćemo vas kontaktirati.'}
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-red-600/20 border border-red-600/50 rounded"
          >
            <p className="text-red-300 font-light">{error}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-light text-gray-300 mb-2">
              {t('contact.name')}
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 bg-slate-800 border border-yellow-600/30 text-white placeholder-gray-500 outline-none focus:border-yellow-600 transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-light text-gray-300 mb-2">
              {t('contact.email')}
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 bg-slate-800 border border-yellow-600/30 text-white placeholder-gray-500 outline-none focus:border-yellow-600 transition disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-light text-gray-300 mb-2">
            {t('contact.phone')}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-3 bg-slate-800 border border-yellow-600/30 text-white placeholder-gray-500 outline-none focus:border-yellow-600 transition disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-light text-gray-300 mb-2">
            {t('contact.subject')}
          </label>
          <input
            type="text"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-3 bg-slate-800 border border-yellow-600/30 text-white placeholder-gray-500 outline-none focus:border-yellow-600 transition disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-light text-gray-300 mb-2">
            {t('contact.message')}
          </label>
          <textarea
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-3 bg-slate-800 border border-yellow-600/30 text-white placeholder-gray-500 outline-none focus:border-yellow-600 transition resize-none disabled:opacity-50"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white font-medium hover:shadow-lg hover:shadow-yellow-600/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          {loading ? (language === 'de' ? 'Wird gesendet...' : 'Slanje...') : t('contact.send')}
        </motion.button>
      </motion.form>
    </div>
  );
}
