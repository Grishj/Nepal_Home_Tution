# Deploy to Netlify

## One-time setup

1. Push the repo to GitHub (or any Git provider).

2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**.

3. Connect your Git provider and select the repo.

4. Configure build settings:

   | Field | Value |
   |---|---|
   | Build command | `npm run build` |
   | Publish directory | `dist` |

5. Add environment variables:

   Click **Site settings** → **Environment variables** → add:

   ```
   VITE_GOOGLE_SCRIPT_URL = <your Apps Script Web App URL>
   VITE_OWNER_PHONE        = +977 9810754805
   VITE_OWNER_PHONE_HREF   = +9779810754805
   VITE_WHATSAPP_NUMBER    = 9779810754805
   VITE_OWNER_EMAIL        = joshigrish058@gmail.com
   ```

6. Click **Deploy**.

---

## SPA routing (required)

Create a `public/_redirects` file so React Router works on page refresh:

```
/*    /index.html   200
```

This tells Netlify to serve `index.html` for all routes (instead of 404).

---

## Redeploying after changes

- **Git push** to the connected branch → Netlify auto-deploys.
- Or use **Deploy manually** in the Netlify dashboard → drag & drop the `dist` folder.

---

## Updating the Apps Script URL

If the Apps Script Web App gets a new URL:

1. Update `VITE_GOOGLE_SCRIPT_URL` in Netlify **Environment variables**
2. Redeploy (trigger a new build)

---

## Custom domain (optional)

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain** and follow the prompts
3. Update your domain's DNS records as instructed
