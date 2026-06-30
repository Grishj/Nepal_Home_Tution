# Vacancies System — Google Sheets Integration

## Architecture

```
Google Sheet  ──►  Google Apps Script Web App  ──►  React (JSONP)
     ↑                        │
  You edit                 Deployed once
  data here                (new URL each
                           fresh deploy)
```

The React app fetches vacancy data from a Google Apps Script Web App using **JSONP** (a `<script>` tag injection, not `fetch`) to avoid CORS issues during local development.

---

## Sheet ⇒ App ⇒ Site Flow

### When you change data in the sheet (add/edit/delete rows)

**No deploy needed.** The Apps Script reads the sheet live every time the Web App is called. Save your sheet changes and refresh the site — the updates appear immediately.

### When you change the Apps Script code

1. Open the script at [script.google.com](https://script.google.com)
2. Make code changes
3. **Save** → **Deploy** → **Manage Deployments**
4. Click the pencil icon next to the existing deployment
5. Select **New version** from the Version dropdown
6. **Deploy**
7. The Web App URL stays the same — **no `.env` change needed**

### When you create a brand-new deployment

If you ever click **Deploy > New deployment** (instead of updating the existing one), you will get a **different URL**. You must update `VITE_GOOGLE_SCRIPT_URL` in `.env` with the new URL and restart the dev server.

---

## Sheet Structure

| Column | Type | Notes |
|---|---|---|
| ID | text | Must be unique, e.g. `S159` |
| Status | text | `OPEN` or `CLOSED` |
| Subject | text | Should match one of the tutor subject options for auto-check |
| Class | text | Free text (auto-matches class options by token overlap) |
| Location | text | Teaching location |
| Salary | number | Numeric value |
| TeacherGender | text | `Male`, `Female`, `Any`, etc. |
| Duration | text | e.g. `1 Hour` |
| Description | text | Shown on the vacancy card |
| PostedDate | text | Displayed as-is |
| Experience | text | e.g. `1 Year` |
| Education | text | e.g. `Bachelor` |
| Urgent | TRUE/FALSE | Displays an "Urgent" badge when TRUE |
| Active | TRUE/FALSE | **Only rows with Active == TRUE are displayed** |

### Important rules

- **Worksheet tab name** must be exactly `Nepal Home Tuition Vacancies` (not `Sheet1`)
- **Column headers** must not have trailing spaces (the script trims them, but avoid any)
- **Active** must be `TRUE` (text, case-insensitive) for the row to appear on the site

---

## After Production

Same behavior as above:

- **Sheet data changes** → live instantly, no action needed
- **Apps Script code changes** → Save → Manage Deployments → update existing deployment with new version → URL stays same
- **New deployment** → must update `.env` and rebuild/redeploy the site

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| "No vacancies available." | All rows have `Active` ≠ TRUE, or validation rejected the data (check column names/case) |
| "Network error" | Apps Script is not deployed or the URL in `.env` is wrong |
| "Unexpected data format" | The script isn't returning a JSON array (check the Apps Script log) |
| Vacancies not updating after sheet edit | Browser cache — hard refresh (`Ctrl+Shift+R`) |
| JSONP request fails silently | Apps Script doesn't support the `?callback=` parameter (redeploy the JSONP-compatible version) |

---

## Environment Variable

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbw.../exec
```

Only needs to change if the deployment URL changes. Stored in `.env` (dev) and set in the hosting dashboard (production).
