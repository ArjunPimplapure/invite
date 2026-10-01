# 💍 Priyanshu & Rupal Wedding Invitation Website

A luxury digital royal Indian wedding invitation for **Priyanshu Kocher & Rupal Jain** celebrating on **25 & 26 November 2026** at **Raipur Greens, Raipur**.

---

## 🚀 How to Run Locally

If you cloned this repository from GitHub, run the following commands in your terminal:

```bash
# 1. Install all dependencies
npm install

# 2. Start the local development server
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🌐 How to Deploy & Open on GitHub Pages

This repository includes a pre-configured automated deployment workflow (`.github/workflows/deploy.yml`) with relative asset paths (`base: './'`).

To enable your free public wedding website on GitHub Pages:

1. Open your repository on **GitHub**.
2. Go to **Settings** (top menu).
3. In the left sidebar, click on **Pages**.
4. Under **Build and deployment** > **Source**, choose **GitHub Actions** from the dropdown.
5. That's it! GitHub will automatically build and publish your website.
6. Your wedding invitation link will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## ⚡ Alternative Free 1-Click Hosting (Vercel / Netlify)

You can also host this site with zero configuration on:
- **Vercel**: Go to [vercel.com](https://vercel.com), click *Add New Project*, import this GitHub repository, and click *Deploy*.
- **Netlify**: Go to [netlify.com](https://netlify.com), import this repository, and click *Deploy*.

---

## 📁 Project Customization Guide

All wedding data and media assets are centralized in clean configuration files:

### 1. Wedding Details & Schedule
File: `src/config/weddingData.ts`
- Sacred invocation: `|| श्री महावीराय नमः ||`
- Groom & Bride names, families, and dates
- Timings for all 7 celebrations (Carnival, Mayra, Sangeet, Baarat, Phere, Vidai, Reception)
- Venue details & Google Maps location URL

### 2. Wedding Logo / Monogram
File: `src/config/assets.ts`
- To change the PR monogram, place your image in `public/assets/` and update `weddingLogo`.

### 3. Background Wedding Song
File: `public/audio/wedding_music.mp3`
- Replace `public/audio/wedding_music.mp3` with any MP3 of your choice.
- The website also has an integrated audio synthesizer fallback so music always plays smoothly.

---

## 🛠️ Build Commands

- `npm run dev` — Starts local development server on port 3000
- `npm run build` — Builds production bundle into the `dist/` directory
- `npm run preview` — Locally previews the production build
- `npm run lint` — Validates TypeScript types
