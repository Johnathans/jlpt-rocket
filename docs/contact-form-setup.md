# Contact Form Setup Guide

The contact bubble appears on all public pages (homepage, about, help, contact, privacy, schools, credits, and how-to-pass pages) in the bottom right corner.

## Features

- **Floating bubble button** in bottom right corner
- **Expandable form** with the following fields:
  - Name (required)
  - Email (required)
  - Type (dropdown: General Message, Report an Error, Feedback, Question)
  - Message (required)
- **Real-time validation** and submission status
- **Email notifications** sent to configured email address
- **Mobile responsive** design

## Email Service Setup

The contact form uses [Resend](https://resend.com) for sending emails. Follow these steps to set it up:

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Copy the generated API key

### 3. Configure Environment Variables

Add these variables to your `.env.local` file:

```bash
# Email address where contact form submissions will be sent
CONTACT_EMAIL=your-email@example.com

# Resend API Key
RESEND_API_KEY=re_your_api_key_here
```

### 4. Verify Domain (Optional but Recommended)

For production use, verify your domain with Resend:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `rocketjlpt.com`)
4. Add the provided DNS records to your domain
5. Wait for verification (usually takes a few minutes)

Once verified, update the `from` address in `/app/api/contact/route.ts`:

```typescript
from: 'Rocket JLPT <noreply@yourdomain.com>',
```

## Testing

### Local Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to any public page (e.g., `http://localhost:3000`)

3. Click the contact bubble in the bottom right corner

4. Fill out the form and submit

5. Check your configured email address for the message

### Without Email Service

If you don't configure Resend, the contact form will still work but messages will only be logged to the console. This is useful for development:

```bash
# Check your terminal for logged messages
Contact Form Submission: {
  type: 'error',
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Found a typo on the homepage',
  timestamp: '2024-01-01T12:00:00.000Z'
}
```

## Customization

### Change Email Template

Edit the HTML template in `/app/api/contact/route.ts`:

```typescript
html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <!-- Your custom email template here -->
  </div>
`
```

### Change Form Fields

Edit the form in `/components/ContactBubble.tsx` to add or remove fields.

### Change Bubble Position

Modify the button position in `/components/ContactBubble.tsx`:

```typescript
className="fixed bottom-6 right-6 z-50 ..."
// Change bottom-6 and right-6 to adjust position
```

### Change Colors

The bubble uses the brand gradient colors (pink to orange). To change:

```typescript
className="bg-gradient-to-r from-pink-500 to-orange-500 ..."
// Change to your preferred colors
```

## Alternative Email Services

If you prefer a different email service, you can modify `/app/api/contact/route.ts` to use:

- **SendGrid**: Popular email service with generous free tier
- **AWS SES**: Amazon's email service, very affordable
- **Mailgun**: Another popular option
- **Nodemailer**: For using your own SMTP server

## Troubleshooting

### Form submits but no email received

1. Check that `RESEND_API_KEY` is set correctly in `.env.local`
2. Verify your Resend account is active
3. Check the Resend dashboard for delivery logs
4. Ensure `CONTACT_EMAIL` is a valid email address

### Console shows "No email service configured"

This means `RESEND_API_KEY` is not set. Messages will be logged to console only.

### Form shows "Failed to send message"

1. Check browser console for detailed error messages
2. Check server logs (terminal) for API errors
3. Verify Resend API key is valid
4. Check Resend dashboard for any account issues

## Security Notes

- Never commit `.env.local` to version control
- Keep your Resend API key secret
- The API route validates all input fields
- Email addresses are validated on both client and server
- Rate limiting is recommended for production (not included by default)

## Support

For issues or questions about the contact form, please refer to:
- Resend documentation: https://resend.com/docs
- Next.js API routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
