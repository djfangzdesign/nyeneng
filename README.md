Nyeneng Trading & Projects
site www.nyeneng.co.za is configured to deploy automatically to GitHub Pages whenever you push to the main branch. This guide covers deployment, troubleshooting, and lead management.

🚀 Deployment Process
Automatic Deployment
Every push to main triggers the GitHub Actions workflow:

git add .
git commit -m "Your changes"
git push origin main
Watch deployment:

Go to your repository
Click Actions tab
Select "Deploy to GitHub Pages" workflow
View real-time build logs
Status indicators:

✅ Green: Deployment successful, site live
🟡 Yellow: Building in progress
❌ Red: Build failed, check logs
Manual Deployment
If needed, manually trigger the workflow:

Go to Actions → Deploy to GitHub Pages
Click Run workflow → Run workflow
🌐 Domain Setup (www.nyeneng.co.za)
DNS Configuration
Your domain provider (e.g., Namecheap, GoDaddy) must point to GitHub Pages:

For www subdomain (recommended):

Type: CNAME
Name: www
Value: djfangz-design.github.io
For root domain (@):

Type: A
Value:
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
Verify DNS: nslookup www.nyeneng.co.za should resolve to GitHub Pages IP

GitHub Repository Settings
✅ Already configured:

CNAME file contains www.nyeneng.co.za
.nojekyll file present (bypasses Jekyll)
404.html configured for SPA routing
📱 WhatsApp & Email Fallback
How It Works
User Flow:

User fills form
    ↓
Submit → Save locally to lead storage
    ↓
Try WhatsApp
    ↓
[Popup blocked?] → Offer email option
    ↓
[No WhatsApp app?] → Auto-offer email
    ↓
Send via email / WhatsApp
    ↓
Lead marked as sent
Testing on Mobile
To test WhatsApp fallback:

Visit /contact on your phone
Fill the form completely
Submit
Observe: WhatsApp should open with pre-filled message
If popup blocked: Email option appears
To test email fallback:

Open on desktop (WhatsApp less likely)
Fill form, submit
Email form appears as fallback
Lead is stored locally immediately
Lead Storage
All submissions are automatically saved to browser localStorage:

Location: Browser storage (survives refreshes)
Max stored: 100 most recent leads
Persistence: Until cleared manually
🔧 Email Integration (Optional)
Current Status
✅ Lead storage: Working (localStorage)
⏳ Email sending: Requires backend setup
To Enable Email Sending
Choose one option:

Option 1: Netlify Functions (Easiest)
# Create functions/send-email.ts
export async function handler(event) {
  const { to, name, phone, email, service, message } = JSON.parse(event.body);
  
  // Use SendGrid or similar
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: to }]
      }],
      from: { email: process.env.FROM_EMAIL },
      subject: `New Lead: ${name} - ${service}`,
      content: [{
        type: 'text/plain',
        value: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\n${message}`
      }]
    })
  });

  return {
    statusCode: response.ok ? 200 : 500,
    body: JSON.stringify({ success: response.ok })
  };
}
Option 2: Cloudflare Workers
Already configured via wrangler.jsonc. See Cloudflare documentation.

Option 3: Third-party Service
Formspree: Free form submissions
Basin: Form endpoint service
GetForm: Drag-and-drop forms
Environment Variables
Add to GitHub Secrets:

SENDGRID_API_KEY
FROM_EMAIL
TO_EMAIL (your email)
📊 Lead Management
View Leads in Browser
Open Developer Console (F12) and use:

// View all leads
window.__nyeneng.getLeads()

// View statistics
window.__nyeneng.stats()
// Output: { total: 5, byMethod: { whatsapp: 2, email: 0, offline: 3 }, sent: 2, unsent: 3 }

// Export as JSON
window.__nyeneng.exportJSON()

// Export as CSV
window.__nyeneng.exportCSV()

// Download as file
window.__nyeneng.downloadJSON()
window.__nyeneng.downloadCSV()

// Clear all leads (careful!)
window.__nyeneng.clearLeads()
Lead Data Structure
{
  "id": "lead_1715750000000_abc123def",
  "name": "John Doe",
  "phone": "+27721234567",
  "email": "john@example.com",
  "service": "Plumbing",
  "message": "Need new pipes installed...",
  "timestamp": 1715750000000,
  "sendMethod": "whatsapp",
  "sent": true
}
Lead CSV Export
Columns: ID, Name, Phone, Email, Service, Message, Timestamp, Send Method, Sent

✅ Pre-Deployment Checklist
 CNAME file contains www.nyeneng.co.za
 DNS records configured at domain provider
 GitHub Actions workflow is active
 vite.config.ts optimized for build output
 Contact form loads without errors
 WhatsApp link opens correctly
 localStorage works (check with DevTools)
 404.html fallback configured
 .nojekyll file present in public/
🔍 Troubleshooting
Site shows 404 after deployment
Cause: SPA routing not configured Fix:

Ensure 404.html exists in build output
Check .nojekyll is created
Verify CNAME file in build directory
Verify:

ls -la dist/
# Should show: 404.html, index.html, CNAME, .nojekyll
Custom domain not working
Cause: DNS not propagated Fix:

Wait 24-48 hours for DNS propagation
Verify DNS records: nslookup www.nyeneng.co.za
Check GitHub Pages settings show domain as verified
GitHub Pages should show a green checkmark
WhatsApp not opening on mobile
Cause:

WhatsApp not installed
Popup blocked by browser
URL encoding issue
Fix:

Fallback email form automatically shown
Check browser console for errors
Test with sample message
Build fails with "No build output found"
Cause: Vite build misconfigured Fix:

Run locally: bun run build
Check output directory: ls -la dist/
Verify vite.config.ts has correct output setting
Check for TypeScript errors: bun run lint
Leads not saving
Cause:

localStorage disabled
Private browsing mode
Quota exceeded
Fix:

Disable private browsing
Clear old leads: window.__nyeneng.clearLeads()
Check browser console for errors
Try incognito mode test
Email not sending
Cause: Backend not configured Fix:

Check if /api/send-email endpoint exists
Leads will still save locally (fallback)
Set up email service (see Email Integration section)
Monitor console for API errors
🛡️ Security Notes
✅ No sensitive data in localStorage (user-facing only)
✅ Email backend should validate input server-side
✅ Use HTTPS only (GitHub Pages default)
✅ Rate-limit email sends to prevent spam
✅ Never store passwords or payment info in localStorage
📧 Support & Updates
Key Files:

src/routes/contact.tsx — Contact form UI
src/lib/forms.ts — Lead storage & validation
vite.config.ts — Build configuration
.github/workflows/deploy-pages.yml — Deployment automation
Contact Form Updates: To modify form fields, edit SERVICES array in src/routes/contact.tsx

Lead Storage Limit: To increase max stored leads, edit MAX_STORED_LEADS in src/lib/forms.ts

🎯 Next Steps
Test locally: bun run dev → visit http://localhost:5173
Test contact form with various inputs
Deploy: git push origin main
Monitor: Check Actions tab for success
Verify: Visit www.nyeneng.co.za and test form
Export leads: Use browser console commands to view stored leads
Set up email (optional): Configure backend email service
Version: 1.0.0
Last Updated: 2026-05-15
Status: ✅ Production Ready
