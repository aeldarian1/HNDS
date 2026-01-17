import { z } from 'zod';

/**
 * Contact Form Schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Ime mora imati najmanje 2 znaka')
    .max(100, 'Ime može imati najviše 100 znakova')
    .regex(/^[a-zA-ZčćžšđČĆŽŠĐäöüßÄÖÜ\s'-]+$/, 'Ime sadrži nedozvoljene znakove'),
  
  email: z
    .string()
    .email('Molimo unesite ispravnu email adresu')
    .max(255, 'Email može imati najviše 255 znakova'),
  
  phone: z
    .string()
    .regex(/^(\+385|0)?[\d\s-]{8,15}$/, 'Molimo unesite ispravan broj telefona')
    .optional()
    .or(z.literal('')),
  
  subject: z
    .string()
    .min(3, 'Naslov mora imati najmanje 3 znaka')
    .max(200, 'Naslov može imati najviše 200 znakova')
    .optional()
    .or(z.literal('')),
  
  message: z
    .string()
    .min(10, 'Poruka mora imati najmanje 10 znakova')
    .max(5000, 'Poruka može imati najviše 5000 znakova'),
  
  consent: z
    .boolean()
    .refine(val => val === true, 'Morate prihvatiti politiku privatnosti'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Newsletter Form Schema
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Molimo unesite ispravnu email adresu')
    .max(255, 'Email može imati najviše 255 znakova'),
  
  consent: z
    .boolean()
    .refine(val => val === true, 'Morate prihvatiti pretplatu'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

/**
 * Membership Application Schema
 */
export const membershipSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Ime mora imati najmanje 2 znaka')
    .max(50, 'Ime može imati najviše 50 znakova'),
  
  lastName: z
    .string()
    .min(2, 'Prezime mora imati najmanje 2 znaka')
    .max(50, 'Prezime može imati najviše 50 znakova'),
  
  email: z
    .string()
    .email('Molimo unesite ispravnu email adresu'),
  
  phone: z
    .string()
    .regex(/^(\+385|0)?[\d\s-]{8,15}$/, 'Molimo unesite ispravan broj telefona'),
  
  address: z
    .string()
    .min(5, 'Adresa mora imati najmanje 5 znakova')
    .max(200, 'Adresa može imati najviše 200 znakova'),
  
  city: z
    .string()
    .min(2, 'Grad mora imati najmanje 2 znaka')
    .max(100, 'Grad može imati najviše 100 znakova'),
  
  postalCode: z
    .string()
    .regex(/^\d{5}$/, 'Poštanski broj mora imati 5 znamenaka'),
  
  dateOfBirth: z
    .string()
    .refine(val => {
      const date = new Date(val);
      const now = new Date();
      const age = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      return age >= 18;
    }, 'Morate imati najmanje 18 godina'),
  
  membershipType: z.enum(['regular', 'student', 'family', 'corporate'], {
    message: 'Molimo odaberite vrstu članstva',
  }),
  
  interests: z
    .array(z.string())
    .min(1, 'Odaberite barem jedno područje interesa')
    .optional(),
  
  germanLevel: z.enum(['none', 'a1', 'a2', 'b1', 'b2', 'c1', 'c2', 'native']).optional(),
  
  motivation: z
    .string()
    .max(1000, 'Motivacija može imati najviše 1000 znakova')
    .optional()
    .or(z.literal('')),
  
  consent: z
    .boolean()
    .refine(val => val === true, 'Morate prihvatiti uvjete članstva'),
  
  newsletter: z.boolean().optional(),
});

export type MembershipFormData = z.infer<typeof membershipSchema>;

/**
 * Search Query Schema
 */
export const searchQuerySchema = z.object({
  q: z
    .string()
    .min(1, 'Upit za pretraživanje je obavezan')
    .max(200, 'Upit može imati najviše 200 znakova')
    .transform(val => val.trim()),
  
  type: z.enum(['all', 'news', 'events', 'chronicles', 'pages']).default('all'),
  
  page: z.coerce.number().int().positive().default(1),
  
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export type SearchQueryParams = z.infer<typeof searchQuerySchema>;

/**
 * Event Registration Schema
 */
export const eventRegistrationSchema = z.object({
  eventId: z.string().uuid('Neispravan ID događaja'),
  
  name: z
    .string()
    .min(2, 'Ime mora imati najmanje 2 znaka')
    .max(100, 'Ime može imati najviše 100 znakova'),
  
  email: z
    .string()
    .email('Molimo unesite ispravnu email adresu'),
  
  phone: z
    .string()
    .regex(/^(\+385|0)?[\d\s-]{8,15}$/, 'Molimo unesite ispravan broj telefona')
    .optional()
    .or(z.literal('')),
  
  numberOfGuests: z.coerce
    .number()
    .int()
    .min(1, 'Minimalno 1 osoba')
    .max(10, 'Maksimalno 10 osoba'),
  
  dietaryRequirements: z
    .string()
    .max(500, 'Posebni zahtjevi mogu imati najviše 500 znakova')
    .optional()
    .or(z.literal('')),
  
  notes: z
    .string()
    .max(500, 'Napomene mogu imati najviše 500 znakova')
    .optional()
    .or(z.literal('')),
});

export type EventRegistrationData = z.infer<typeof eventRegistrationSchema>;

/**
 * Pagination Schema
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

/**
 * Filter Schema for News/Events
 */
export const filterSchema = z.object({
  category: z.string().optional(),
  tag: z.string().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
}).merge(paginationSchema);

export type FilterParams = z.infer<typeof filterSchema>;

/**
 * Helper function to validate and parse data
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.core.$ZodIssue[] } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { success: false, errors: result.error.issues };
}

/**
 * Format Zod errors for display
 */
export function formatZodErrors(errors: z.core.$ZodIssue[]): Record<string, string> {
  const formatted: Record<string, string> = {};
  
  for (const error of errors) {
    const path = error.path.join('.');
    if (!formatted[path]) {
      formatted[path] = error.message;
    }
  }
  
  return formatted;
}
