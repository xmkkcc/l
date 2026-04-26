# GitHub Pages Setup Guide

This site has been configured to run on GitHub Pages with EmailJS for contact form emails.

## What Changed

- **Removed**: Node.js Express server (`server.js` is no longer needed)
- **Added**: EmailJS integration for client-side email handling
- **Why**: GitHub Pages only hosts static files. EmailJS provides a free tier for email sending without a backend server.

## Setup Instructions

### 1. Create a Free EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### 2. Get Your EmailJS Credentials

1. Go to [Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Account → API Keys**
3. Copy your **Public Key**
4. Go to **Email Services** and note your **Service ID** (or create one using Gmail or your email provider)
5. Go to **Email Templates** and note your **Template ID** (or create one)

### 3. Create an EmailJS Template

1. In EmailJS Dashboard, go to **Email Templates**
2. Click **Create New Template**
3. Set up a template like this:

**Template Name**: Contact Form Email

**Content**:
```
Subject: {{subject}}

From: {{from_name}} ({{from_email}})
Phone: {{phone}}

Message:
{{message}}

---
Reply-to: {{reply_to}}
```

Save and note the Template ID.

### 4. Update `contact-handler.js`

Open `contact-handler.js` and replace these lines (around line 8-10):

```javascript
emailjs.init('YOUR_PUBLIC_KEY');        // Replace with your EmailJS Public Key
const SERVICE_ID = 'YOUR_SERVICE_ID';   // Replace with your Service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
const TO_EMAIL = 'xmk9854@gmail.com';   // Replace with your email
```

**Example**:
```javascript
emailjs.init('7a8b9c0d1e2f3g4h5i6j7k8l');
const SERVICE_ID = 'service_abc123';
const TEMPLATE_ID = 'template_xyz789';
const TO_EMAIL = 'your-email@gmail.com';
```

### 5. Deploy to GitHub Pages

#### Option A: Using GitHub Desktop or Git CLI

```bash
git add .
git commit -m "Setup EmailJS for GitHub Pages deployment"
git push origin main
```

#### Option B: Enable GitHub Pages in Repository Settings

1. Go to your GitHub repository
2. Settings → Pages
3. Source: Choose `main` branch (or your branch)
4. Save

Your site will be published at: `https://yourusername.github.io/repository-name/`

### 6. Test the Contact Form

1. Visit your GitHub Pages URL
2. Go to the Contact page
3. Fill out the form and submit
4. You should receive an email at the address specified in `TO_EMAIL`

## Free Tier Limits

- **EmailJS Free Plan**:
  - 200 emails/month
  - Unlimited templates and services
  - No credit card required

For higher limits, upgrade to a paid plan.

## Troubleshooting

### Contact form doesn't send

1. Check browser console (F12 → Console) for errors
2. Verify PUBLIC_KEY, SERVICE_ID, and TEMPLATE_ID are correct in `contact-handler.js`
3. Verify your EmailJS Service is enabled and connected
4. Check that your email template exists

### Emails go to spam

1. In EmailJS template, keep the format simple
2. Add a reply-to email field
3. Test with multiple email providers

### Rate limiting

If you exceed the free tier limit, upgrade your plan or wait for the next month's quota to reset.

## Local Development

For testing locally without deploying:

```bash
# Install http-server globally
npm install -g http-server

# Run in your project directory
http-server

# Visit http://localhost:8080
```

## Security Notes

1. Your EmailJS Public Key is visible in the browser (this is intentional)
2. Use EmailJS's rate limiting and honeypot fields to prevent abuse
3. The form includes a honeypot field (`website`) to catch bots
4. Consider adding reCAPTCHA for extra protection

## Support

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
