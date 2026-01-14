import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email to user
    // 3. Send notification to admin

    console.log('New contact form submission:', {
      name: data.name,
      email: data.email,
      subject: data.subject,
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
      { message: 'Message received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
