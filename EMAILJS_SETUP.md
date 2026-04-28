# EmailJS Setup Guide for Desire Woods

## Step 1 — Create an EmailJS Account
1. Go to https://www.emailjs.com and sign up for a free account

## Step 2 — Add an Email Service
1. In the EmailJS dashboard, click **Email Services** → **Add New Service**
2. Choose **Gmail** (or any provider you prefer)
3. Connect your email account (affanmomin8520@gmail.com)
4. Note the **Service ID** (e.g. `service_abc123`)

## Step 3 — Create an Email Template
1. Go to **Email Templates** → **Create New Template**
2. Set the template up like this:

**Subject:**
```
New Product Enquiry — {{product_name}}
```

**Body:**
```
You have a new product enquiry from your website.

Name:    {{from_name}}
Email:   {{from_email}}
Phone:   {{phone}}
Product: {{product_name}}

---
Sent from Desire Woods website enquiry form.
```

3. Set **To Email** to: `affanmomin8520@gmail.com`
4. Set **Reply To**: `{{reply_to}}`
5. Save and note the **Template ID** (e.g. `template_xyz456`)

## Step 4 — Get Your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g. `user_XXXXXXXXXXXXXXXXX`)

## Step 5 — Add Keys to .env.local
Open `.env.local` and fill in your values:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

## Step 6 — Test
1. Run `npm run dev`
2. Open any product detail page
3. Click **Enquire Now**
4. Fill the form and submit
5. Check affanmomin8520@gmail.com for the email

## Free Tier Limits
EmailJS free plan allows **200 emails/month** — plenty for a furniture enquiry site.
