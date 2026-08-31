# Kage Landing Page — ThreeUI

A Kyoto mountain temple night walk experience featuring full HTML + DOM/CSS + Three.js runtime with 14 local WebP scene layers, live GLSL shaders, interactive inertia scroll scenes, and custom atmospheric tokens.

---

## ⛩️ Overview

`KageLandingPage` is a high-fidelity interactive full-page landing experience ported directly from its authored ThreeUI reference. It runs 100% self-hosted with local Three.js runtime, bundled typography, and 14 binary WebP scene layers without external asset dependencies.

### Features
- **Authentic Kyoto Temple Night Experience:** Charred cypress, lantern glow, vermilion moon, live WebGL particles, and fog shaders.
- **5-Chapter Dynamic Navigation:** Approach, Sanmon Gate, Lantern Court, Moonlit Waters, and Temple Depths.
- **Custom Atmospheric Engine:** Live live font injection, weight, size ceiling, tracking, and vermilion primary accent override.
- **Multi-Device Responsive Canvas:** Responsive fullscreen, MacBook Pro, iPad Pro, and iPhone 15 Pro testing modes.
- **Dual Integration Models:** Use directly as a self-hosted modular component or via `@designcodeio/threeui`.

---

## 📦 Project Structure

```
kage-landing-page/
├── public/
│   └── landing-pages/
│       ├── kage.html                                # Byte-exact authored document
│       └── secret-pathways-assets/
│           ├── fonts.css                            # Local subset font styles
│           ├── three.min.js                         # Local Three.js runtime
│           ├── foreground/png/*.webp                # 10 Foreground parallax layers
│           └── generated/*.webp                     # 4 Atmospheric scene previews
├── src/
│   ├── effects/
│   │   └── kage-landing-page/
│   │       ├── KageLandingPage.tsx                  # React component wrapper
│   │       ├── LandingPageFrame.tsx                 # Iframe sandbox & style bridge
│   │       ├── styles.css                           # Effect container styles
│   │       └── index.ts                             # Modular export
│   ├── components/
│   │   ├── Navigation.tsx                           # Studio header bar
│   │   ├── CustomizerDrawer.tsx                     # Live token customizer
│   │   ├── DeviceFrame.tsx                          # Responsive canvas frame
│   │   ├── InfoModal.tsx                            # Shader & asset architecture
│   │   └── CodeModal.tsx                            # Code export snippet modal
│   ├── Scene.tsx                                    # Standard reference scene
│   ├── App.tsx                                      # Full interactive studio
│   └── main.tsx
└── vite.config.ts
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🛠️ Usage

### Local Modular Component
```tsx
import { KageLandingPage } from "./effects/kage-landing-page/KageLandingPage";
import "./effects/kage-landing-page/styles.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <KageLandingPage
        headingFont="Onest"
        bodyFont="Onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={17}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}
```

### With `@designcodeio/threeui`
```tsx
import { KageLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <KageLandingPage
        headingFont="onest"
        bodyFont="onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={17}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}
```

---

## ⚙️ Component Props Contract

| Prop | Type | Default | Description |
|---|---|---|---|
| `headingFont` | `'Onest' \| 'Instrument Serif' \| 'Newsreader' \| 'Geist'` | `'Onest'` | Primary heading typeface |
| `bodyFont` | `'Onest' \| 'Geist' \| 'Newsreader' \| 'Instrument Serif'` | `'Onest'` | Body copy typeface |
| `headingWeight` | `'300' \| '400' \| '500' \| '600' \| '700'` | `'400'` | Weight for display and heading elements |
| `bodyWeight` | `'300' \| '400' \| '500' \| '600'` | `'300'` | Weight for body paragraphs |
| `primaryColor` | `string` (Hex) | `'#e0231c'` | Vermilion accent and ember particle tint |
| `headingSize` | `number` (30–72) | `46` | Maximum ceiling size for hero displays |
| `bodySize` | `number` (13–22) | `17` | Base size for text copy |
| `headingLetterSpacing` | `number` (-0.05 to +0.05) | `-0.012` | Letter tracking in em units |
| `sourceUrl` | `string` | `'/landing-pages/kage.html'` | Local sandboxed document path |
