# React PWA Web

A Progressive Web Application built with React and Vite that works offline and can be installed as a native app.

## 🚀 Features

- ✅ **Progressive Web App**: Installable on any device
- ✅ **Offline Support**: Works without internet connection
- ✅ **Local Storage**: Tasks persist locally using IndexedDB
- ✅ **Responsive Design**: Works on mobile and desktop
- ✅ **Fast Loading**: Optimized with Vite bundler
- ✅ **Push Notifications**: Optional notification support
- ✅ **Static Site**: Deployable to Vercel, Netlify, GitHub Pages

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **Vite** - Build tool and dev server
- **Workbox** - Service worker and caching
- **LocalForage** - IndexedDB wrapper for offline storage
- **Lucide React** - Modern icon library
- **React Router** - Client-side routing

## 📦 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 2: GitHub Integration
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Vercel will automatically deploy

### Option 3: Manual Deploy
1. Run `npm run build`
2. Upload the `dist` folder to Vercel

## 🌐 Vercel Configuration

The app includes `vercel.json` with:
- **SPA Routing**: All routes redirect to `index.html`
- **Service Worker Caching**: Proper cache headers for PWA
- **Security Headers**: XSS protection, content type sniffing prevention

## 📱 PWA Features

### Installation
- **Desktop**: Install prompt appears automatically
- **Mobile**: Use "Add to Home Screen" from browser menu

### Offline Functionality
- Tasks are stored locally using IndexedDB
- App works completely offline
- Service worker caches all app resources

### Notifications
- Optional push notification support
- Requested after first task creation
- Uses browser's native notification API

## 🔧 Customization

### Updating App Manifest
Edit the PWA configuration in `vite.config.js`:
```javascript
VitePWA({
  manifest: {
    name: 'Your App Name',
    short_name: 'App',
    description: 'Your app description',
    theme_color: '#your-color',
    // ... other options
  }
})
```

### Adding New Features
1. Create components in `src/components/`
2. Add routes in `src/App.jsx`
3. Use LocalForage for persistent data

## 🏗️ Build and Deploy

### Static Site Generation
The app builds to a static site in the `dist` folder:
```bash
npm run build
# Outputs to: dist/
```

### Deploy to Other Platforms

**Netlify**:
```bash
npm run build
# Drag and drop the dist folder to Netlify
```

**GitHub Pages**:
```bash
npm run build
# Push dist folder to gh-pages branch
```

**Firebase Hosting**:
```bash
npm run build
firebase deploy
```

## 🧪 Testing PWA Features

### Test Installation
1. Open Chrome DevTools
2. Go to Application > Manifest
3. Click "Add to homescreen"

### Test Offline Mode
1. Open Chrome DevTools
2. Go to Network tab
3. Check "Offline" checkbox
4. Refresh page - app should still work

### Test Service Worker
1. Open Chrome DevTools
2. Go to Application > Service Workers
3. Verify service worker is registered and active

## 🐛 Troubleshooting

**PWA not installing?**
- Ensure HTTPS (required for PWA)
- Check manifest.json is valid
- Verify service worker registration

**Offline mode not working?**
- Check service worker registration in DevTools
- Verify Workbox configuration in vite.config.js
- Test in incognito mode

**Build failing?**
- Clear node_modules and package-lock.json
- Run `npm install` again
- Check for TypeScript/ESLint errors

## 📄 License

MIT License - feel free to use this project as a template for your own PWAs!