# Lucky Day Dashboard

A dashboard for managing micro-donations and support for people experiencing homelessness.

## Features

- **Recipients** — Track people receiving help, their needs, and status
- **Donations** — Log donations (cash, gift cards, supplies, services)
- **Donors** — Manage donor relationships and giving history
- **Volunteers** — Track volunteer team, availability, and hours
- **Partners** — Manage relationships with shelters, food banks, clinics
- **Outreach Events** — Plan and track street outreach, distributions
- **Impact Stories** — Collect success stories for marketing/fundraising
- **Grants** — Track grant applications and funding opportunities
- **Tasks** — Action items with priorities and due dates
- **PDF Export** — Generate shareable summary reports

---

## Quick Setup (15 minutes)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Name it `lucky-day` (or similar)
3. Choose a strong database password
4. Select region closest to you
5. Click **Create new project** (takes ~2 min)

### 2. Run Database Schema

1. In Supabase, go to **SQL Editor**
2. Click **New query**
3. Paste the entire contents of `supabase-schema.sql`
4. Click **Run**
5. You should see "Success. No rows returned" — that's correct!

### 3. Get Your API Keys

1. In Supabase, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key under "Project API keys" (starts with `eyJ...`)

⚠️ **Important:** Use the key labeled `anon` `public`, NOT the `service_role` key.

### 4. Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
5. Click **Deploy**

### 5. Set Your Domain (Optional)

1. In Vercel → **Settings** → **Domains**
2. Add a custom domain like `dashboard.luckyday.org`
3. Follow DNS instructions

---

## Project Structure

```
lucky-day-dashboard/
├── src/
│   ├── pages/
│   │   ├── _app.js          # Meta tags, fonts
│   │   └── index.js         # Main dashboard
│   ├── lib/
│   │   └── supabase.js      # Supabase client
│   └── styles/
│       └── globals.css      # Tailwind imports
├── public/
│   └── og-image.png         # Link preview image
├── supabase-schema.sql      # Database schema
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── README.md
```

---

## Database Tables

| Table | Purpose |
|-------|---------|
| `recipients` | People receiving help |
| `donations` | Individual donation records |
| `donors` | Donor profiles and history |
| `volunteers` | Volunteer team |
| `partners` | Partner organizations |
| `outreach_events` | Events and outreach days |
| `tasks` | Action items |
| `impact_stories` | Success stories |
| `grants` | Grant applications |
| `media` | Press/media opportunities |
| `activity_log` | Change tracking |
| `settings` | Dashboard config |

---

## Customization

### Change Branding

Edit `src/pages/index.js`:
- Update the `Logo` component SVG
- Change gradient colors (search for `from-green-500 to-amber-500`)
- Update header text

### Change Meta Tags

Edit `src/pages/_app.js`:
- Update title, description
- Replace OG image URL

### Add New Tables

1. Add SQL to `supabase-schema.sql`
2. Run in Supabase SQL Editor
3. Add new component in `index.js`
4. Add tab to the `tabs` array

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

---

## Support

Built with ❤️ using Next.js, Supabase, and Tailwind CSS.
