# Flutter PWA Mobile

A Flutter Progressive Web Application that works on mobile devices with offline capabilities.

## Features

- ✅ **Offline Support**: Works without internet connection
- ✅ **Installable**: Can be installed as a native app
- ✅ **Responsive**: Adapts to different screen sizes
- ✅ **Fast Loading**: Optimized for performance
- ✅ **Push Notifications**: Support for notifications
- ✅ **Local Storage**: Data persists locally

## Getting Started

### Prerequisites

- Flutter SDK (latest stable version)
- Chrome browser (for web development)

### Installation

1. **Clone the repository**
   ```bash
   cd flutter-mobile
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Run the application**
   ```bash
   # For web (PWA)
   flutter run -d chrome --web-renderer html
   
   # For mobile devices
   flutter run
   ```

### Building for Production

```bash
# Build for web (PWA)
flutter build web --web-renderer html --release

# Build for Android
flutter build apk --release

# Build for iOS
flutter build ios --release
```

## PWA Features

### Offline Functionality
- Tasks are stored locally using SharedPreferences
- App works completely offline
- Data syncs when connection is restored

### Installation
The app can be installed on devices:
- **Mobile**: Add to Home Screen
- **Desktop**: Install via browser prompt

### Service Worker
- Caches app resources
- Enables offline functionality
- Updates cache automatically

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── screens/
│   └── home_screen.dart      # Main task management screen
├── services/
│   ├── offline_service.dart  # Local storage management
│   └── notification_service.dart # Push notifications
└── widgets/
    ├── task_card.dart        # Task list item widget
    └── offline_banner.dart   # Offline status indicator
```

## Configuration

### Web Configuration
- `web/manifest.json`: PWA manifest file
- `web/index.html`: Main HTML file with PWA setup

### Dependencies
- `connectivity_plus`: Network status monitoring
- `shared_preferences`: Local data storage
- `workmanager`: Background tasks
- `google_fonts`: Typography

## Deployment

### Firebase Hosting
```bash
flutter build web --web-renderer html
firebase deploy
```

### GitHub Pages
```bash
flutter build web --web-renderer html --base-href /your-repo-name/
# Deploy the build/web folder to gh-pages branch
```

### Netlify
```bash
flutter build web --web-renderer html
# Upload the build/web folder to Netlify
```

## Testing PWA Features

1. **Install PWA**: Visit the app in Chrome and look for install prompt
2. **Offline Mode**: 
   - Open Developer Tools
   - Go to Network tab
   - Check "Offline" 
   - Refresh page - app should still work
3. **Add to Home Screen**: On mobile, use browser menu to add to home screen

## Troubleshooting

### Common Issues

**App doesn't install as PWA**
- Ensure HTTPS (required for PWA)
- Check manifest.json is valid
- Verify service worker is registered

**Offline functionality not working**
- Check service worker registration
- Verify cache strategy in service worker
- Test in incognito/private mode

## License

This project is open source and available under the [MIT License](LICENSE).