# PACE

A health and wellness tracking app built as an iOS-style web prototype. PACE helps users monitor four key wellness dimensions: **Sleep**, **Movement**, **Food**, and **Mood**.

## Features

- **Sleep Tracking** - Multi-step flow to log sleep quality and duration
- **Movement Tracking** - Log daily exercise and movement minutes
- **Food Logging** - Track meals consumed throughout the day
- **Mood Tracking** - Real-time mood slider with detailed history
- **Insights** - View wellness data and trends
- **Theming** - Customizable color themes, border radius, and dark mode
- **i18n** - Traditional Chinese (zh-TW) support

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Custom UI component system (no external UI library)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
src/
├── components/
│   ├── screens/        # App screens (Home, Sleep, Mood, Food, Insights, Profile)
│   ├── UI.tsx          # UI primitives (buttons, cards, typography)
│   ├── Sliders.tsx     # Mood and hours sliders
│   ├── Icons.tsx       # SVG icons
│   ├── NavStack.tsx    # Navigation system
│   ├── IOSFrame.tsx    # iPhone frame mockup
│   └── LaunchScreen.tsx
├── data/
│   ├── tokens.ts       # Design tokens (colors, themes)
│   ├── state.ts        # Global app state
│   └── i18n.ts         # Internationalization
├── App.tsx
└── main.tsx
```
