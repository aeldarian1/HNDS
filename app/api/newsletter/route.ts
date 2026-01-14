import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage (replace with database in production)
const subscribers = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    if (subscribers.has(email)) {
      return NextResponse.json(
        { message: 'Already subscribed' },
        { status: 200 }
      );
    }

    // Add to subscribers (in production, save to database)
    subscribers.add(email);

    // Here you would typically send a confirmation email
    // Example: await sendConfirmationEmail(email);

    console.log(`New newsletter subscriber: ${email}`);

    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
