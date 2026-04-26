# Deployment Checklist for GitHub Pages

Follow this checklist before deploying to GitHub Pages.

## Pre-Deployment Checklist

- [ ] **EmailJS Setup**
  - [ ] Create free account at https://www.emailjs.com
  - [ ] Get Public Key from Account → API Keys
  - [ ] Create Email Service and note Service ID
  - [ ] Create Email Template and note Template ID

- [ ] **Update Code**
  - [ ] Open `contact-handler.js`
  - [ ] Replace `'YOUR_PUBLIC_KEY'` with your EmailJS Public Key
  - [ ] Replace `'YOUR_SERVICE_ID'` with your EmailJS Service ID  
  - [ ] Replace `'YOUR_TEMPLATE_ID'` with your EmailJS Template ID
  - [ ] Replace `'xmk9854@gmail.com'` with your email address

- [ ] **Clean Up Files** (optional but recommended)
  - [ ] Delete `server.js` (no longer needed)
  - [ ] Delete `package.json` (no longer needed for GitHub Pages)
  - [ ] Delete `.env` file (no longer needed)
  - [ ] Delete `node_modules/` folder if it exists
  - [ ] Delete `.npmrc` if present

- [ ] **Verify Files**
  - [ ] Check that all HTML files exist (index.html, about.html, contact.html, portfolio.html, media.html)
  - [ ] Check that styles.css exists
  - [ ] Check that script.js exists
  - [ ] Check that contact-handler.js has your EmailJS credentials

- [ ] **Test Locally** (optional)
  - [ ] Install `http-server`: `npm install -g http-server`
  - [ ] Run: `http-server`
  - [ ] Visit http://localhost:8080
  - [ ] Test contact form submission
  - [ ] Check your email for the test message

- [ ] **Git Setup**
  - [ ] Add changes: `git add .`
  - [ ] Commit: `git commit -m "Setup EmailJS for GitHub Pages"`
  - [ ] Push: `git push origin main`

- [ ] **GitHub Pages Configuration**
  - [ ] Go to repository Settings → Pages
  - [ ] Select branch: `main` (or your branch)
  - [ ] Save
  - [ ] Wait for deployment to complete (usually 1-2 minutes)
  - [ ] Site URL will be shown at the top

- [ ] **Post-Deployment**
  - [ ] Visit your GitHub Pages URL
  - [ ] Test the contact form
  - [ ] Verify you receive the test email
  - [ ] Check that all pages load correctly
  - [ ] Test all links and navigation

## Useful URLs

- GitHub Pages Site: `https://yourusername.github.io/repository-name/`
- EmailJS Dashboard: https://dashboard.emailjs.com
- EmailJS Docs: https://www.emailjs.com/docs/
- Repository Settings: https://github.com/yourusername/repository-name/settings/pages

## Troubleshooting

### Contact form doesn't work
1. Open browser DevTools (F12)
2. Go to Console tab
3. Check for error messages
4. Verify EmailJS credentials in `contact-handler.js` are correct

### Can't find EmailJS credentials
- Public Key: Dashboard → Account → API Keys
- Service ID: Dashboard → Email Services (or create new)
- Template ID: Dashboard → Email Templates (or create new)

### Form sends but no email received
1. Check spam/promotions folder
2. Verify `TO_EMAIL` in contact-handler.js is correct
3. In EmailJS, verify your email is confirmed
4. Check EmailJS activity log for errors

### Getting 404 errors on GitHub Pages
1. Make sure your repository is public (for free GitHub Pages)
2. Wait a few minutes after pushing (deployment takes time)
3. Check repository Settings → Pages is enabled
4. Refresh browser and clear cache (Ctrl+Shift+R)

## Next Steps

After successful deployment:

1. **Monitor emails** - Check EmailJS dashboard for email logs
2. **Set up forwarding** (optional) - Configure where emails get sent
3. **Customize template** - Edit the EmailJS template for better formatting
4. **Add rate limiting** - EmailJS has built-in limits; upgrade if needed
5. **Backup configuration** - Keep your EmailJS credentials safe
