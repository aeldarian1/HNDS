import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema, formatZodErrors } from '@/lib/validations';
import { checkRateLimit, rateLimitPresets } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 3 requests per 5 minutes for form submissions
    const rateLimit = checkRateLimit(request, rateLimitPresets.form);
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { 
          error: 'Previše zahtjeva. Molimo pokušajte ponovno za nekoliko minuta.',
          retryAfter: Math.ceil((rateLimit.reset - Date.now()) / 1000),
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.reset.toString(),
            'Retry-After': Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const body = await request.json();
    
    // Validate with Zod schema
    const result = contactFormSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: formatZodErrors(result.error.issues),
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email to user
    // 3. Send notification to admin

    console.log('New contact form submission:', {
      name: data.name,
      email: data.email,
      subject: data.subject || 'No subject',
      timestamp: new Date().toISOString(),
    });

    // In production, integrate with email service (SendGrid, Mailgun, etc.)
    // Example:
    // await sendEmail({
    //   to: 'info@hnds-split.hr',
    //   subject: `Nova poruka iz kontaktnog obrasca: ${data.subject}`,
    //   html: `
    //     <h2>${data.subject}</h2>
    //     <p><strong>Od:</strong> ${data.name} (${data.email})</p>
    //     <p><strong>Poruka:</strong></p>
    //     <p>${data.message.replace(/\n/g, '<br>')}</p>
    //   `
    // });

    return NextResponse.json(
      { 
        success: true,
        message: 'Poruka uspješno poslana! Odgovorit ćemo vam u najkraćem roku.',
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.reset.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Došlo je do pogreške. Molimo pokušajte ponovno.' },
      { status: 500 }
    );
  }
}
