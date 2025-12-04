import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, type, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email configuration
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@rocketjlpt.com';
    
    // For now, we'll use a simple email service
    // You can integrate with services like Resend, SendGrid, or AWS SES
    
    // If using Resend (recommended for Next.js):
    if (process.env.RESEND_API_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Rocket JLPT <noreply@rocketjlpt.com>',
          to: CONTACT_EMAIL,
          reply_to: email,
          subject: `[${type.toUpperCase()}] Contact Form - ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #ec4899;">New Contact Form Submission</h2>
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
              </div>
              <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h3 style="margin-top: 0;">Message:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                This message was sent from the Rocket JLPT contact form.
              </p>
            </div>
          `,
        }),
      });

      if (!resendResponse.ok) {
        throw new Error('Failed to send email via Resend');
      }
    } else {
      // Fallback: Log to console if no email service is configured
      console.log('Contact Form Submission:', {
        type,
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      });
      
      // In production, you should integrate a proper email service
      console.warn('No email service configured. Set RESEND_API_KEY environment variable.');
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
