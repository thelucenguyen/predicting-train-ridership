# 🚀 Deployment Guide - Ridership Prediction App

## Quick Deploy to Vercel (Recommended - 5 minutes)

1. **Upload to GitHub**
   ```bash
   # Initialize git repository
   git init
   git add .
   git commit -m "Initial commit: Interactive ridership prediction app"
   
   # Push to GitHub (create repository first on GitHub.com)
   git remote add origin https://github.com/yourusername/ridership-prediction-app.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy with Vercel**
   - Visit [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "New Project"
   - Select your ridership-prediction-app repository
   - Click "Deploy" (zero configuration needed!)
   - Your app will be live at `https://your-app-name.vercel.app`

## Alternative Deployment Methods

### Vercel CLI (Fastest)
```bash
npm install -g vercel
vercel
# Follow prompts - takes 2 minutes!
```

### Netlify
1. Drag the project folder to [netlify.com/drop](https://netlify.com/drop)
2. Set build command: `npm run build`
3. Set publish directory: `out`

### Traditional Hosting
```bash
npm run build
# Upload the 'out' directory to any static hosting service
```

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Customize variables as needed:
   ```env
   NEXT_PUBLIC_APP_NAME="Your Transportation Agency Ridership Predictor"
   NEXT_PUBLIC_APP_URL="https://your-domain.com"
   ```

## Adding Real Data

Replace the sample data in `lib/statistics.ts`:

```typescript
// Replace generateSampleRidershipData() with your real data
export function loadRealRidershipData(): TimeSeriesData[] {
  return [
    { date: '2019-01-01', value: 32500 },
    { date: '2019-01-08', value: 33200 },
    // ... your real weekly ridership data
  ];
}
```

## Customizing for Your Agency

1. **Branding**: Update colors in `tailwind.config.js`
2. **Content**: Modify text in `app/page.tsx` 
3. **Data**: Replace sample data with your ridership figures
4. **Seasonality**: Adjust seasonal patterns in `lib/statistics.ts`

## Performance Optimization

The app is already optimized with:
- ✅ Static site generation
- ✅ Image optimization
- ✅ Code splitting
- ✅ Responsive design
- ✅ SEO meta tags

## Domain Setup

1. **Custom Domain**: In Vercel dashboard, go to Project Settings → Domains
2. **DNS**: Point your domain to Vercel's DNS servers
3. **SSL**: Automatically provisioned by Vercel

## Monitoring & Analytics

Add to `.env.local`:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Support

- **Technical Issues**: Check the README.md file
- **Statistical Questions**: Refer to original research paper
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

🎉 **You're Ready!** Your interactive ridership prediction app will be live in minutes!
