# future-reminder.app

Official website for **Future Reminder** — a location-based reminder app for iPhone.

🌐 [future-reminder.app](https://future-reminder.app)

---

## About

Future Reminder is an iOS app that triggers reminders when you *arrive* at a place — not just at a fixed time. This repository contains the marketing website hosted at `future-reminder.app`.

---

## Structure

```
├── index.html          # Main one-pager (EN + DE)
├── privacy.html        # Privacy policy (EN + DE, bilingual)
├── styles.css          # All styles — Apple-inspired, dark/light mode
├── app.js              # Language detection, i18n, theme toggle
└── translations.json   # All UI strings in English and German
```

---

## Features

- 🌍 **Bilingual** — English and German, auto-detected from browser language
- 🌙 **Dark / Light mode** — respects system preference, manually switchable
- 📱 **Responsive** — works on all screen sizes
- ♿ **Accessible** — semantic HTML, ARIA labels
- ⚡ **No dependencies** — pure HTML, CSS, and vanilla JavaScript

---

## Localization

All strings are stored in `translations.json`. To add a new language:

1. Add a new key (e.g. `"fr"`) to `translations.json` with all translations
2. Add a new `<button class="lang-btn" data-lang="fr">FR</button>` to the nav in `index.html`
3. Done — the `app.js` script handles the rest automatically

---

## iOS App

The Future Reminder iOS app is built with:
- Swift & SwiftUI
- SwiftData (local storage)
- CoreLocation & Geofencing
- UNUserNotificationCenter

👉 [iOS App Repository](https://github.com/jan7172/Future-Reminder)

---

## License

© 2026 Jan Bauer. All rights reserved.