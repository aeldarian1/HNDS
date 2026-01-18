'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Input, Textarea, Select, Checkbox } from '@/app/components/ui/Form';

interface SubjectOption {
  value: string;
  label: string;
}

interface ContactFormClientProps {
  subjectOptions: SubjectOption[];
  privacyPolicyUrl?: string;
}

export function ContactFormClient({ 
  subjectOptions,
  privacyPolicyUrl = '/privatnost' 
}: ContactFormClientProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', privacy: false });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (formStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-2xl font-light text-white mb-2">Hvala vam!</h3>
        <p className="text-gray-400 font-light mb-6">
          Vaša poruka je uspješno poslana. Javit ćemo vam se uskoro.
        </p>
        <Button onClick={() => setFormStatus('idle')}>Pošalji novu poruku</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Input
          label="Ime i prezime"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Vaše ime i prezime"
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="vasa@email.adresa"
        />
      </div>

      <Select
        label="Tema"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        required
        options={subjectOptions}
      />

      <Textarea
        label="Poruka"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder="Vaša poruka..."
        rows={5}
      />

      <Checkbox
        label={
          <>
            Slažem se s{' '}
            <a href={privacyPolicyUrl} className="text-yellow-500 hover:underline">
              pravilima privatnosti
            </a>
          </>
        }
        name="privacy"
        checked={formData.privacy}
        onChange={handleChange}
        required
      />

      {formStatus === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          Došlo je do pogreške. Pokušajte ponovno.
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={formStatus === 'loading' || !formData.privacy}
      >
        {formStatus === 'loading' ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Slanje...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Pošalji poruku
          </>
        )}
      </Button>
    </form>
  );
}
