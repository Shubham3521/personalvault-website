# PersonalVault — Complete UI/UX Redesign Specification
## For Developer Implementation

> **Version:** 1.0  
> **Date:** March 12, 2026  
> **Status:** Ready for Implementation  
> **Goal:** Transform the existing site into a premium, conversion-focused product launch page — think Nothing Phone, Boat, or Apple product pages.

---

## CORE PHILOSOPHY

The redesign follows 3 principles:
1. **Cost savings is the #1 hook** — every section reinforces "pay once, store forever"
2. **Trust through truth** — founder story, real counter, no fake social proof
3. **Mobile-first, thumb-friendly** — 90%+ Indian traffic is mobile; every interaction must feel native

---

## SECTION 1: PAGE STRUCTURE & SECTION ORDER

```
1. [NAV] Fixed sticky navbar
2. [HERO] Painful headline → product value → CTA + scarcity counter
3. [PROBLEM STRIP] 1-line trust stripe — scrolling ticker
4. [COST REFRAME] Visual cost comparison (big, dramatic)
5. [HOW IT WORKS] 4-step visual, dead simple
6. [FEATURES] 6 cards, icon + benefit-led copy
7. [APP SHOWCASE] iOS + Android side by side
8. [COMPARISON TABLE] Feature grid vs competitors
9. [FOUNDER STORY] 2-3 sentence authentic founder note + photo
10. [PRICING] Single card, early bird, scarcity counter, Razorpay
11. [FAQ] Accordion, 8 questions
12. [FINAL CTA] Full-width closing CTA banner
13. [FOOTER] Minimal
```

**Why this order:**
- Lead with the pain (HERO), immediately followed by the payoff (COST REFRAME)
- Build trust progressively (HOW IT WORKS → FEATURES → FOUNDER → PRICING)
- Close with scarcity + CTA

---

## SECTION 2: DESIGN TOKENS

### 2.1 Color Palette (keep exactly these)
```css
:root {
  /* Brand */
  --color-saffron:    #E65100;  /* Primary CTA */
  --color-orange:     #FF6D00;  /* Hover states */
  --color-amber:      #FFB300;  /* Accents, gradients */

  /* Backgrounds */
  --color-bg-base:    #0D1B2A;  /* Midnight Blue — main bg */
  --color-bg-section: #1B263B;  /* Deep Navy — alternating sections */
  --color-bg-card:    #1E2D40;  /* Card backgrounds */

  /* Text */
  --color-text-primary:   #FFFFFF;
  --color-text-secondary: rgba(255,255,255,0.65);
  --color-text-muted:     rgba(255,255,255,0.40);

  /* Accents */
  --color-teal:       #00BFA5;  /* Success, "included" badges */
  --color-purple:     #7C4DFF;  /* Decorative gradients */

  /* Gradients */
  --gradient-brand:   linear-gradient(135deg, #E65100 0%, #FF6D00 60%, #FFB300 100%);
  --gradient-text:    linear-gradient(90deg, #FF6D00, #FFB300);
  --gradient-glow-bg: radial-gradient(ellipse at 20% 30%, rgba(230,81,0,0.14) 0%, transparent 55%),
                      radial-gradient(ellipse at 80% 70%, rgba(124,77,255,0.10) 0%, transparent 55%),
                      #0D1B2A;

  /* Borders */
  --border-subtle:  1px solid rgba(255,255,255,0.07);
  --border-active:  1px solid rgba(230,81,0,0.35);

  /* Shadows */
  --shadow-card:    0 4px 24px rgba(0,0,0,0.35);
  --shadow-glow:    0 0 48px rgba(230,81,0,0.25);
  --shadow-float:   0 20px 60px rgba(0,0,0,0.45);

  /* Radius */
  --radius-sm:  8px;
  --radius-md:  14px;
  --radius-lg:  24px;
  --radius-xl:  40px;

  /* Motion */
  --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
  --transition: all 0.3s var(--ease-out);
}
```

### 2.2 Typography Scale
**Font family: Inter (keep as-is, already loaded)**

```css
/* Desktop → Mobile */

/* H1 — Hero headline */
font-size: clamp(36px, 5.5vw, 64px);
font-weight: 800;
line-height: 1.05;
letter-spacing: -0.03em;

/* H2 — Section titles */
font-size: clamp(28px, 3.8vw, 48px);
font-weight: 700;
line-height: 1.15;
letter-spacing: -0.02em;

/* H3 — Card titles */
font-size: clamp(18px, 2vw, 22px);
font-weight: 600;
line-height: 1.3;

/* Body Large — Hero subtitle, section intros */
font-size: clamp(16px, 1.8vw, 20px);
font-weight: 400;
line-height: 1.65;

/* Body — Standard */
font-size: 16px;
font-weight: 400;
line-height: 1.6;

/* Small / Label / Badge */
font-size: 13px;
font-weight: 600;
letter-spacing: 0.06em;
text-transform: uppercase;
```

### 2.3 Spacing System
```css
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   24px;
--space-6:   32px;
--space-7:   48px;
--space-8:   64px;
--space-9:   80px;
--space-10:  120px;

/* Section vertical padding */
/* Desktop: padding-block: 100px 120px */
/* Mobile:  padding-block: 64px 80px */

/* Container max-width: 1200px */
/* Container horizontal padding: 24px (mobile), 48px (desktop) */
```

---

## SECTION 3: NAVIGATION

### Layout
```
[logo.png — 36px height] [PersonalVault]          [Features] [Pricing] [FAQ]    [Pre-order ₹16,500 →]
```

### Specs
- **Height:** 68px desktop / 60px mobile
- **Position:** `position: fixed; top: 0; z-index: 100;`
- **Default state:** `background: transparent`
- **Scrolled state (after 60px):** `background: rgba(13,27,42,0.88); backdrop-filter: blur(16px) saturate(1.8);`
- **Border bottom (scrolled):** `border-bottom: 1px solid rgba(255,255,255,0.08);`
- **Transition:** `background 0.3s ease, border 0.3s ease`

### CTA Button (nav)
- **Text:** `Pre-order ₹16,500 →`
- **Style:** `background: var(--gradient-brand); color: #fff; padding: 10px 20px; border-radius: 10px; font-size: 14px; font-weight: 600;`
- **Hover:** `transform: translateY(-1px); box-shadow: 0 8px 20px rgba(230,81,0,0.4);`

### Mobile Navigation
- Hamburger: 3 lines → X icon (animated with CSS transform)
- Overlay: Full screen, `background: rgba(13,27,42,0.97)`, slide in from right
- Nav links: 28px font, stacked, 20px gap
- CTA: Full-width button at bottom of overlay
- Close on: tap outside, scroll, link click

---

## SECTION 4: HERO SECTION

### Layout
```
Desktop: 2-column grid
  Left (55%): text content
  Right (45%): visual element
  align-items: center
  gap: 60px

Mobile: Single column, stacked
  Visual above fold, partially visible → encourages scroll
  Text below
```

### Copy (EXACT — use as-is)

**Pre-badge** (small label above H1):
```
🚀  Early Bird · Only 50 Units · 12 Reserved
```
Style: `background: rgba(230,81,0,0.15); border: 1px solid rgba(230,81,0,0.3); color: #FFB300; padding: 6px 14px; border-radius: 40px; font-size: 13px; font-weight: 600;`

**H1:**
```
You've Paid ₹7,800 for Google Photos
This Year. You Got Nothing to Show For It.
```
- Font: 800 weight, clamp(34px, 5vw, 62px)
- Line height: 1.05
- Color: `#FFFFFF`
- "₹7,800" → gradient text: `var(--gradient-text)` — makes the number pop
- Line break after "Google Photos" (desktop)
- Mobile: clamp(30px, 8vw, 38px)

**Subheadline:**
```
PersonalVault is a plug-and-play home device that backs up every photo
and video your family takes — privately, automatically, forever.
Pay ₹16,500 once. Never pay again.
```
- Font: 18px / 400 weight / `var(--color-text-secondary)`
- Max-width: 520px
- Mobile: 16px

**CTA Row:**
```
[🔒 Pre-order Now — ₹16,500]    [▶ See how it works]
```
- Primary: `var(--gradient-brand)`, 56px height, 24px horizontal padding, 14px radius, 17px font, 600 weight
- Primary shadow: `0 8px 32px rgba(230,81,0,0.45)`
- Secondary: `background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15);` + play icon
- Gap between buttons: 16px
- Mobile: Stack vertically, both 100% width

**Scarcity Line** (below CTAs):
```
✅ 100% refundable if not satisfied  ·  🇮🇳 Made in India  ·  ⚡ Shipping June 2026
```
- Font: 13px, `var(--color-text-muted)`, flex row, gap: 16px
- Mobile: Wrap to 2 lines, center-aligned

### Hero Visual (Right Column)
Replace the phone mockup with a more polished visual:

```
Option A — Product Device + Phone Composite:
  - Central: Device illustration/photo (box with glowing LED)
  - Floating: iOS phone mockup showing app gallery
  - Floating: Android phone mockup showing backup indicator
  - Depth: Use CSS 3D transforms for layered feel
  - Subtle glow: radial-gradient behind devices

Option B — Animated Gradient Orb (no image needed):
  - Large orb: background via CSS animation, colors cycling through saffron → amber → teal
  - Overlaid grid pattern (subtle, SVG background-image)
  - Stats floating in cards:
      ┌─────────────────┐
      │ 📸 1TB Storage  │
      │ ~500,000 photos │
      └─────────────────┘
      ┌─────────────────┐
      │ ✅ 0 Monthly Fee│
      │ Save ₹7,800/yr  │
      └─────────────────┘
  - Float animation: translateY(0) ↔ translateY(-12px), 3s ease-in-out infinite, staggered
```

**DEVELOPER NOTE:** Use Option B until product photos are available. Option B is CSS-only and converts well.

### Background (Hero Section)
```css
background: var(--gradient-glow-bg);
padding-block: 140px 100px; /* top accommodates fixed nav */
```

---

## SECTION 5: PROBLEM STRIP (Marquee / Trust Bar)

A full-width scrolling ticker (like Apple's feature bars, or Nothing's launch strips).

### Layout
```
Single row, full viewport width
Horizontal auto-scroll (CSS animation, left infinite)
Background: rgba(230,81,0,0.08); border-top/bottom: var(--border-subtle)
padding-block: 16px
```

### Content
Repeat this pattern (×4 for seamless loop):
```
🔌 Plug & Play  ·  📱 iOS + Android Ready  ·  🇮🇳 Made in India  ·  💾 1TB Included  ·  🔒 100% Private  ·  💰 Pay Once Forever  ·  ⚡ 5-Min Setup  ·  🛡️ 1-Year Warranty  ·  🚫 No Subscriptions  ·
```

### CSS
```css
.marquee-track {
  display: flex;
  gap: 48px;
  animation: marquee 30s linear infinite;
  white-space: nowrap;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
/* Pause on hover */
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
/* Fade edges */
.marquee::before, .marquee::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0; width: 80px;
  pointer-events: none;
  z-index: 1;
}
.marquee::before { left: 0;  background: linear-gradient(to right, var(--color-bg-base), transparent); }
.marquee::after  { right: 0; background: linear-gradient(to left,  var(--color-bg-base), transparent); }
```

---

## SECTION 6: COST REFRAME SECTION

**Section heading label:** `STOP PAYING MONTHLY`

**H2:**
```
The Cloud Bills You.
PersonalVault Doesn't.
```

**Subtext:**
```
At ₹749/month for Google Photos 2TB, you're spending ₹26,964 over 3 years.
PersonalVault costs ₹16,500. Once. That's it.
```

### Layout
```
Desktop: 2-column grid, 50/50, gap: 48px
  Left: Large dramatic savings stat
  Right: Cost comparison cards (stacked)

Mobile: Single column, stacked
```

### Left Column — Savings Stat
```
┌───────────────────────────────────────────────────┐
│                                                   │
│   After 3 years, you'd have paid                  │
│                                                   │
│   ₹26,964                                         │  ← H1 size, gradient text, strikethrough feel
│   to Google Photos                                │  ← muted text below
│                                                   │
│   PersonalVault costs                             │
│                                                   │
│   ₹16,500                                         │  ← H1 size, white, bold
│   once, forever                                   │  ← teal color
│                                                   │
│   You save ₹10,464+ in 3 years                   │  ← amber pill badge
│                                                   │
└───────────────────────────────────────────────────┘
```

**Typography:**
- `₹26,964` → 72px, gradient (saffron), position: relative, after: strikethrough overlay (red tint pseudo-element)
- `₹16,500` → 72px, white, weight 800
- Badge: `background: rgba(255,179,0,0.15); color: #FFB300; border: 1px solid rgba(255,179,0,0.25); padding: 8px 16px; border-radius: 40px;`

### Right Column — Comparison Cards
```
┌──────────────────────────────────────┐
│  PersonalVault        ₹16,500 once   │ ← teal left border, highlighted
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│  Google Photos 2TB    ₹26,964/3yr    │
│                       ₹749/month     │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│  iCloud 2TB           ₹39,564/3yr   │
│                       ₹1,099/month   │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│  Dropbox 2TB          ₹43,164/3yr   │
│                       ₹1,199/month   │
└──────────────────────────────────────┘
```

**Card Specs:**
- `background: var(--color-bg-card); border-radius: 12px; padding: 16px 20px;`
- `display: flex; justify-content: space-between; align-items: center;`
- PersonalVault card: `border-left: 3px solid var(--color-teal);`
- Others: `border-left: 3px solid rgba(255,255,255,0.1);`
- Gap between cards: 8px

**Section background:** `var(--color-bg-section)` (alternating from hero)

---

## SECTION 7: HOW IT WORKS

**Label:** `HOW IT WORKS`

**H2:**
```
From Box to Backup
in 5 Minutes Flat
```

**Subtext:**
```
No IT degree required. No port forwarding. No assembly.
Just plug, scan, and you're done.
```

### Layout
```
Desktop: 4-column horizontal timeline
  Each column: icon → connector → step card
  Connector: dashed line (::after pseudo-element) between cards

Mobile: Vertical stacked steps
  Left border: 2px solid rgba(230,81,0,0.3), connecting dots
```

### 4 Steps

| # | Icon | Title | Body |
|---|------|-------|------|
| 01 | 📦 | Order & Receive | Pre-order today for ₹16,500. Ships to your door in June 2026 with everything included — no extras to buy. |
| 02 | 🔌 | Plug It In | Power cable in. Ethernet in your router. One light turns green. That's it. Seriously. |
| 03 | 📱 | Scan the QR Code | Open the app, scan the QR code on the box. Your phone is connected in seconds — no passwords, no IP addresses. |
| 04 | ✅ | Backs Up Everything | Every photo and video on every family member's phone backs up automatically, on WiFi. You never think about it again. |

### Step Card Specs
```css
.step-card {
  background: var(--color-bg-card);
  border: var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
  position: relative;
}
.step-number {
  font-size: 64px;
  font-weight: 800;
  line-height: 1;
  color: rgba(230,81,0,0.12);
  position: absolute;
  top: 16px;
  right: 20px;
}
.step-icon {
  font-size: 36px;
  margin-bottom: 16px;
  display: block;
}
.step-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}
.step-body {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}
```

**Desktop connector:**
```css
/* Dashed line between cards */
.step-card:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -24px;
  width: 48px;
  height: 2px;
  border-top: 2px dashed rgba(230,81,0,0.3);
  transform: translateY(-50%);
}
```

---

## SECTION 8: FEATURES SECTION

**Label:** `WHAT YOU GET`

**H2:**
```
Everything Your Family Needs.
Nothing You Don't.
```

### Layout
```
Desktop: 3-column grid, gap: 24px
Mobile:  2-column grid (or 1-column for very small screens <360px)
```

### 6 Feature Cards (redesigned copy)

| # | Icon | Title | Body Copy |
|---|------|-------|-----------|
| 1 | 🔌 | Zero Configuration | No routers to configure, no IP addresses, no tech knowledge. Plug it in, scan a QR code, done. |
| 2 | 🔒 | Your Photos Never Leave Home | No cloud server. No third-party access. Your memories stay on hardware you own, in your house. |
| 3 | 📱 | iOS + Android, Day One | Native apps for both platforms, ready when your device ships. No "coming soon" — both apps launch with the product. |
| 4 | ☁️ | Access from Anywhere | Going on a trip? Browse your vault from anywhere via our encrypted Cloudflare Tunnel. No VPN, no port forwarding. |
| 5 | 💾 | 1TB Built In | Over 500,000 photos. 3 years of a family's worth of memories. Included in the box, no add-ons. |
| 6 | 🛡️ | RAID Protected | Two drives mirror each other automatically. If one fails, your photos are safe. Zero data loss risk. |

### Feature Card Specs
```css
.feature-card {
  background: var(--color-bg-card);
  border: var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 32px;
  transition: var(--transition);
}
.feature-card:hover {
  transform: translateY(-6px);
  border: var(--border-active);
  box-shadow: var(--shadow-glow);
}
.feature-icon {
  font-size: 32px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(230,81,0,0.10);
  border-radius: var(--radius-md);
  margin-bottom: 20px;
}
.feature-title {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 10px;
}
.feature-body {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}
```

---

## SECTION 9: APP SHOWCASE

**Label:** `MOBILE APPS`

**H2:**
```
iOS and Android.
Both Ready on Day One.
```

**Subtext:**
```
No "coming soon" for one platform. No waiting.
Your iPhone and Android phones both work from day one.
```

### Layout
```
Desktop: 2-column, 50/50, gap: 48px
  Each column: phone mockup (top) + feature list (bottom)

Mobile: Single column, iOS first
```

### Phone Mockup Specs
```css
.phone-mockup {
  width: 220px;
  height: 440px;
  background: #1a1a2e;
  border-radius: 40px;
  border: 2px solid rgba(255,255,255,0.12);
  box-shadow: 0 32px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05);
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
/* Notch (iOS) */
.phone-mockup.ios::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 24px;
  background: #1a1a2e;
  border-radius: 0 0 16px 16px;
  z-index: 2;
}
/* Camera hole (Android) */
.phone-mockup.android::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  background: rgba(255,255,255,0.15);
  border-radius: 50%;
  z-index: 2;
}
```

**App screen content (CSS-generated photo grid):**
```
4×3 grid of colored rectangles (gradient swatches)
App header bar showing "PersonalVault" + lock icon
Status bar at top: signal + battery
Backup indicator at bottom: "✓ 1,284 photos synced"
```

### Feature Lists (per platform)

**iOS features:**
- Auto Backup on WiFi
- iCloud Conflict-Free
- Face ID protected access
- Share albums with family
- Offline mode for your favorites

**Android features:**
- Background auto-sync
- Google Photos import
- Fingerprint protected
- Multiple account support  
- Battery-smart backup

### "Both Apps" Badge (below the two columns)
```
Background: rgba(0,191,165,0.1);
Border: 1px solid rgba(0,191,165,0.25);
Color: #00BFA5;
Centered, border-radius: 12px, padding: 16px 32px
Text: "🎉 Both apps are included in your purchase. No extra charge."
Font: 15px, 600 weight
```

---

## SECTION 10: COMPARISON TABLE

**Label:** `HOW WE COMPARE`

**H2:**
```
Why Families Choose PersonalVault
Over the Cloud
```

### Layout
```
Desktop: Full-width table (max-width: 900px, centered)
Mobile:  Horizontally scrollable, or card-per-row format (see mobile section)
```

### Table Design

```
┌───────────────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Feature                   │ PersonalVault   │ Google Photos   │ Immich (DIY)    │
├───────────────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Price                     │ ₹16,500 once    │ ₹749/month      │ Free (DIY)      │
│ 3-Year Cost               │ ₹16,500         │ ₹26,964         │ ₹0 + your time  │
│ Setup Time                │ 5 minutes       │ N/A             │ 2-4 hours       │
│ Privacy                   │ ✅ 100%         │ ⚠️ AI training  │ ✅ 100%         │
│ Hardware Included         │ ✅ Yes          │ ❌ Cloud only   │ ❌ Buy your own │
│ iOS App                   │ ✅ Day 1        │ ✅              │ ✅              │
│ Android App               │ ✅ Day 1        │ ✅              │ ✅              │
│ RAID Protection           │ ✅ Built-in     │ ✅ (server-side)│ ❌ Manual       │
│ Remote Access             │ ✅ Auto tunnel  │ ✅              │ ❌ Port forward |
│ Support                   │ ✅ 1 year       │ ❌ None         │ 💬 Community    │
│ Made in India             │ 🇮🇳 Yes         │ ❌ No           │ ❌ No           │
└───────────────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

### Table CSS
```css
.comparison-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

thead th {
  background: var(--color-bg-section);
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  color: var(--color-text-secondary);
  border-bottom: var(--border-subtle);
}

thead th:first-child {
  text-align: left;
}

/* PersonalVault column highlight */
thead th.highlight,
tbody td.highlight {
  background: rgba(230,81,0,0.07);
  color: var(--color-text-primary);
}

thead th.highlight {
  color: #FFB300;
  border-top: 3px solid var(--color-saffron);
}

tbody tr {
  transition: background 0.2s ease;
}

tbody tr:hover {
  background: rgba(255,255,255,0.03);
}

tbody td {
  padding: 14px 20px;
  font-size: 15px;
  color: var(--color-text-secondary);
  border-bottom: var(--border-subtle);
  text-align: center;
}

tbody td:first-child {
  text-align: left;
  font-weight: 500;
  color: var(--color-text-primary);
}

/* Checkmarks */
.check-yes  { color: var(--color-teal);   font-size: 16px; }
.check-warn { color: var(--color-amber);  font-size: 16px; }
.check-no   { color: rgba(255,255,255,0.3); font-size: 16px; }
```

### Mobile: Comparison Table
On mobile (<768px), hide the table. Show 3 toggle buttons: "vs Google Photos" / "vs iCloud" / "vs Immich"
Each button shows a simplified 2-column card comparison below.

```
[ PersonalVault vs Google Photos ] [vs iCloud] [vs Immich]

┌─────────────────────┬─────────────────────┐
│ PersonalVault       │  Google Photos      │
├─────────────────────┼─────────────────────┤
│ ₹16,500 once        │  ₹749/month         │
│ ✅ 100% private     │  ⚠️ AI training      │
│ ✅ No port fwd      │  ✅                 │
│ ✅ Support 1yr      │  ❌ None            │
│ 🇮🇳 India-made      │  ❌                 │
└─────────────────────┴─────────────────────┘
```

---

## SECTION 11: FOUNDER STORY

This is the trust-builder. No fake testimonials — just Shubham.

**Label:** `THE FOUNDER`

### Layout
```
Desktop: 2-column, 40/60
  Left: Photo placeholder + name card
  Right: Story text

Mobile: Single column, photo above text
```

### Left Column
```
┌──────────────────────────────────┐
│  [Founder photo — 200×200px      │
│   circle, border: 3px solid      │
│   var(--color-saffron)]          │
│                                  │
│  Shubham Gupta                   │  ← 20px, 700 weight
│  Founder, PersonalVault          │  ← 14px, muted
│  📍 India                        │
│                                  │
│  [twitter/x icon]  [@shubham]    │
└──────────────────────────────────┘
```

### Right Column — Story Copy
```
I got tired of paying ₹749 a month to Google to store memories
that belong to my family — not to them.

I'm a solo developer building PersonalVault because I believe
your family photos deserve better than someone else's server.
Every unit is built, tested, and shipped from India. I personally
respond to every support email.

You're not buying from a corporation. You're backing a builder
who will personally make sure this works for your family.
```
- Font: 18px, `var(--color-text-secondary)`, line-height: 1.75
- Opening line: white, 20px, semi-bold
- Bottom: small social link

### Note
> If no actual founder photo is available, use a styled avatar placeholder with initials "SG" in a circle using brand gradient background.

---

## SECTION 12: PRICING CARD

**Label:** `EARLY BIRD OFFER`

**H2:**
```
Reserve Yours Before
Prices Go Up
```

**Subtext:**
```
50 units at early bird pricing. 12 reserved as of today.
After that, it's ₹17,500.
```

### Scarcity Counter Component
```
┌────────────────────────────────────────────────┐
│  🔴 LIVE  38 of 50 units remaining             │
└────────────────────────────────────────────────┘
```
```css
.scarcity-bar {
  background: rgba(230,81,0,0.1);
  border: 1px solid rgba(230,81,0,0.3);
  border-radius: 10px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #FFB300;
}
.live-dot {
  width: 8px; height: 8px;
  background: #ff4444;
  border-radius: 50%;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(1.3); }
}
```

**DEVELOPER NOTE:** This counter should be hardcoded initially at "38 of 50 remaining" and updated manually as orders come in. The "LIVE" pulse dot adds urgency without requiring a backend counter.

### Pricing Card Layout
```
Max-width: 520px, centered

┌──────────────────────────────────────────────────────────┐
│ ┌────────────────────────────────────────────────────┐   │
│ │  EARLY BIRD — LIMITED TO 50 UNITS                 │   │ ← amber badge, top center
│ └────────────────────────────────────────────────────┘   │
│                                                          │
│  PersonalVault Starter Kit                               │ ← H3
│  Complete plug-and-play home backup                      │ ← muted subtitle
│                                                          │
│  ~~₹17,500~~ launch price                               │ ← 16px, muted, strikethrough
│  ₹16,500                                                 │ ← 56px, white, 800 weight
│  one-time payment                                        │ ← 14px, teal
│                                                          │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄    │
│                                                          │
│  ✓  Complete PersonalVault device (ships June 2026)     │
│  ✓  1TB RAID-mirrored storage — built in                │
│  ✓  iOS app — ready at launch                           │
│  ✓  Android app — ready at launch                       │
│  ✓  1-year warranty + direct founder support            │
│  ✓  Free app updates, forever                           │
│  ✓  Cloudflare Tunnel remote access (no port fwd)       │
│                                                          │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄    │
│                                                          │
│  [🔒 Pre-order via Razorpay — ₹16,500 →]               │ ← Full width primary button
│                                                          │
│  UPI · Credit Card · Debit Card · Net Banking · Wallet  │ ← logos or text, 12px muted
│                                                          │
│  100% refundable if we don't ship by August 2026        │ ← 13px, muted, teal checkmark
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Pricing Card CSS
```css
.pricing-card {
  background: var(--color-bg-card);
  border: 1px solid rgba(230,81,0,0.25);
  border-radius: var(--radius-xl);
  padding: 40px;
  max-width: 520px;
  margin: 0 auto;
  position: relative;
}
/* Glow effect */
.pricing-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: var(--radius-xl);
  background: var(--gradient-brand);
  opacity: 0.15;
  z-index: -1;
  filter: blur(20px);
}
.price-value {
  font-size: 56px;
  font-weight: 800;
  line-height: 1;
  color: #FFFFFF;
}
.price-original {
  font-size: 18px;
  color: var(--color-text-muted);
  text-decoration: line-through;
  margin-bottom: 4px;
}
.price-period {
  color: var(--color-teal);
  font-size: 14px;
  font-weight: 600;
}
.feature-line {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;
  font-size: 15px;
}
.feature-line .check {
  color: var(--color-teal);
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}
```

### Below Pricing Card
```
Don't want to pre-order yet?
[📧 Notify me when it launches]
```
Small, centered, secondary button/link style.

---

## SECTION 13: FAQ ACCORDION

**Label:** `FAQ`

**H2:**
```
Questions? We Have
Answers.
```

### Layout
```
Max-width: 720px, centered
Single column accordion
```

### 8 Questions (revised copy)

**Q1: Is this hard to set up?**
A: Plug it in. Scan the QR code on the box with your phone. Done. You don't need to know anything about networking. If you can set up a TV box, you can set up PersonalVault.

**Q2: What happens when storage fills up?**
A: 1TB holds about 500,000 photos — enough for most families for a decade. When you do need more, you can plug in an external USB drive to extend storage. We're also exploring a 2TB model.

**Q3: Can the whole family use it?**
A: Yes. Multiple phones can connect to one vault. Each person gets their own private space. Parents can share family albums, kids' libraries stay separate.

**Q4: What if the device breaks?**
A: RAID mirroring means your data is on two drives. If one fails, your photos are safe on the other. For extra peace of mind, we recommend plugging in an external drive for a second backup. 1-year warranty covers hardware failures.

**Q5: Can I access my photos when I'm not at home?**
A: Yes. PersonalVault uses a Cloudflare encrypted tunnel so you can browse your vault from anywhere — no VPN, no port forwarding, no technical setup.

**Q6: Why should I trust a pre-order from a new company?**
A: Fair question. You're paying a solo Indian developer to build something and ship it. To protect you: 100% refund if we don't ship by August 2026. No questions asked. You can also email Shubham directly before you order.

**Q7: Will you raise the price?**
A: Yes, after early bird units sell out, price goes to ₹17,500. We'll also introduce higher-storage models at higher prices. This is the best this product will ever be priced.

**Q8: Is my data actually private?**
A: Your photos never touch our servers. Ever. The Cloudflare tunnel is encrypted end-to-end — even Cloudflare can't see your files. The device sits in your home. You own it completely.

### Accordion CSS
```css
.faq-item {
  border-bottom: var(--border-subtle);
  padding: 0;
}
.faq-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0;
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  gap: 16px;
}
.faq-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: var(--transition);
  font-size: 14px;
}
.faq-item.active .faq-icon {
  background: var(--color-saffron);
  border-color: var(--color-saffron);
  transform: rotate(45deg);
  content: '+';
}
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s var(--ease-out), padding 0.3s ease;
  padding: 0;
}
.faq-item.active .faq-answer {
  max-height: 400px;
  padding-bottom: 20px;
}
.faq-answer p {
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 1.7;
}
```

---

## SECTION 14: FINAL CTA BANNER

Full-width closing section. No header needed.

### Layout
```
Background: var(--gradient-brand) (rich orange gradient)
padding-block: 80px (desktop), 60px (mobile)
text-align: center
```

### Content
```
[🇮🇳 India-made · Ships June 2026]       ← badge, white background, dark text

Your family photos deserve
a home that's actually yours.

Pre-order now for ₹16,500 →

[🔒 Pre-order via Razorpay]              ← white button, dark text

100% refundable · Ships June 2026 · 38 units remaining
```

**CTA Button (inverted):**
```css
.btn-white {
  background: #FFFFFF;
  color: #E65100;
  font-weight: 700;
  font-size: 17px;
  padding: 18px 40px;
  border-radius: var(--radius-md);
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}
.btn-white:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.3);
}
```

---

## SECTION 15: FOOTER

Keep minimal.

### Layout
```
Desktop: 3 columns + bottom bar
Mobile: 2 columns → stacked

Column 1 (40%): Logo + tagline + contact email
Column 2 (30%): Product links
Column 3 (30%): Legal links

Bottom bar: "© 2026 PersonalVault · Made with ❤️ in India"
```

### Content
```
[logo.png 32px] PersonalVault
Your private family photo vault.
shubham@homenas.app

Product                    Legal
─────────                  ─────────
Features                   Privacy Policy
How It Works               Terms
Pricing                    Contact
FAQ
```

**Footer background:** Slightly darker than base: `#0A1520`

---

## SECTION 16: COMPONENT SPECS

### Buttons (Complete Spec)

#### Primary Button
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--gradient-brand);
  color: #FFFFFF;
  padding: 15px 28px;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 16px rgba(230,81,0,0.35);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(230,81,0,0.5);
}
.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(230,81,0,0.3);
}

/* Large variant (hero CTA) */
.btn-primary.btn-lg {
  padding: 18px 36px;
  font-size: 17px;
  border-radius: 16px;
}
/* Full width */
.btn-primary.btn-full {
  width: 100%;
  justify-content: center;
}
```

#### Secondary Button (Ghost)
```css
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.06);
  color: #FFFFFF;
  padding: 15px 28px;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  border: 1px solid rgba(255,255,255,0.14);
  cursor: pointer;
  transition: var(--transition);
}
.btn-ghost:hover {
  background: rgba(255,255,255,0.10);
  border-color: rgba(255,255,255,0.25);
  transform: translateY(-1px);
}
```

#### Text Link Button
```css
.btn-text {
  color: var(--color-amber);
  font-size: 14px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.btn-text:hover {
  color: #FFFFFF;
}
```

### Trust Badges

Small inline badges used in hero and pricing:
```css
.trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.05);
  border: var(--border-subtle);
  border-radius: 40px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
  white-space: nowrap;
}
```

### Section Label/Tag
```css
.section-label {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-saffron);
  background: rgba(230,81,0,0.1);
  border: 1px solid rgba(230,81,0,0.2);
  border-radius: 40px;
  padding: 5px 14px;
  margin-bottom: 16px;
}
```

### Launch Countdown Timer
**Used in hero as a secondary element (not a full section)**
```html
<div class="mini-countdown">
  <span>⏳ Launching in:</span>
  <div class="countdown-units">
    <span><b id="cd-days">89</b> days</span>
    <span><b id="cd-hours">12</b> hrs</span>
    <span><b id="cd-mins">44</b> min</span>
  </div>
</div>
```
```css
.mini-countdown {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: var(--color-text-muted);
  padding: 8px 16px;
  background: rgba(255,255,255,0.04);
  border: var(--border-subtle);
  border-radius: 40px;
  margin-top: 12px;
}
.countdown-units {
  display: flex;
  gap: 12px;
}
.countdown-units span {
  color: var(--color-text-secondary);
}
.countdown-units b {
  color: var(--color-amber);
  font-weight: 700;
}
```

---

## SECTION 17: ANIMATION & INTERACTION NOTES

### Scroll Reveal (Apply to all sections)
```javascript
// Intersection Observer — apply on load
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
```

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.65s var(--ease-out), transform 0.65s var(--ease-out);
}
[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger children */
[data-reveal-stagger] > * {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
}
[data-reveal-stagger].revealed > *:nth-child(1) { transition-delay: 0.05s; }
[data-reveal-stagger].revealed > *:nth-child(2) { transition-delay: 0.12s; }
[data-reveal-stagger].revealed > *:nth-child(3) { transition-delay: 0.19s; }
[data-reveal-stagger].revealed > *:nth-child(4) { transition-delay: 0.26s; }
[data-reveal-stagger].revealed > *:nth-child(5) { transition-delay: 0.33s; }
[data-reveal-stagger].revealed > *:nth-child(6) { transition-delay: 0.40s; }
[data-reveal-stagger].revealed > * {
  opacity: 1;
  transform: translateY(0);
}
```

### Hero Entry Animation
```css
@keyframes hero-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Stagger each hero element */
.hero-badge       { animation: hero-in 0.6s var(--ease-out) 0.1s both; }
.hero-h1          { animation: hero-in 0.7s var(--ease-out) 0.2s both; }
.hero-subtitle    { animation: hero-in 0.6s var(--ease-out) 0.35s both; }
.hero-cta-row     { animation: hero-in 0.6s var(--ease-out) 0.5s both; }
.hero-trust-row   { animation: hero-in 0.5s var(--ease-out) 0.65s both; }
.hero-visual      { animation: hero-in 0.8s var(--ease-out) 0.3s both; }
```

### Floating Cards (Hero visual)
```css
@keyframes float-a {
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50%       { transform: translateY(-14px) rotate(-2deg); }
}
@keyframes float-b {
  0%, 100% { transform: translateY(0px) rotate(2deg); }
  50%       { transform: translateY(-10px) rotate(2deg); }
}
.float-card-a { animation: float-a 4s ease-in-out infinite; }
.float-card-b { animation: float-b 4s ease-in-out infinite 1.5s; }
```

### Glow Background Animation
```css
@keyframes glow-shift {
  0%   { opacity: 0.12; transform: translate(0, 0); }
  33%  { opacity: 0.18; transform: translate(20px, -30px); }
  66%  { opacity: 0.10; transform: translate(-15px, 20px); }
  100% { opacity: 0.12; transform: translate(0, 0); }
}
.hero-glow {
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(100px);
}
.glow-1 {
  background: radial-gradient(circle, #E65100, transparent 70%);
  top: -100px; left: -100px;
  animation: glow-shift 8s ease-in-out infinite;
}
.glow-2 {
  background: radial-gradient(circle, #7C4DFF, transparent 70%);
  bottom: -100px; right: -100px;
  animation: glow-shift 10s ease-in-out infinite 3s;
}
```

### Micro-interactions
- **Button click:** `transform: scale(0.97)` for 100ms then release
- **Card hover:** `translateY(-6px)` + border color change + glow shadow (already specified)
- **FAQ open:** Smooth max-height transition (already specified)
- **Navbar appearance on scroll:** `opacity 0.3s + background 0.3s` (already specified)
- **Scarcity dot pulse:** CSS keyframe `pulse` animation (already specified)

---

## SECTION 18: MOBILE LAYOUT GUIDE

**Critical: India is 90%+ mobile traffic. This is not optional.**

### Global Mobile Rules
- Min tap target: 44×44px for all interactive elements
- Padding: Container uses 20px horizontal padding on mobile
- Font-size: Never go below 14px
- Line-length: Max 75 characters on mobile
- No horizontal scroll: `overflow-x: hidden` on body

### Per-Section Mobile Layout

| Section | Desktop | Mobile |
|---------|---------|--------|
| Nav | Logo + links + CTA | Logo + hamburger (full-screen overlay) |
| Hero | 2-col grid | Single column, visual *above* headline (80% visible, 20% clipped — hints at scroll) |
| Problem Strip | Scrolling marquee | Same, slightly slower (40s instead of 30s) |
| Cost Reframe | 2-col grid | Single column, stat card first, comparison cards below |
| How It Works | 4-col horizontal | Vertical steps with left border accent line |
| Features | 3-col grid | 2-col grid (or 1-col for <380px screens) |
| App Showcase | 2-col | Single col, iOS mockup → features → Android mockup → features |
| Comparison | Table | Toggle buttons + simplified 2-col comparison card |
| Founder | 2-col | Single col, photo + name card centered above text |
| Pricing | Centered card 520px | Full-width card, 24px padding |
| FAQ | 720px centered | Full-width, same accordion |
| Final CTA | Full-width, centered | Full-width, buttons stacked |
| Footer | 3-col | 2-col then stacked |

### Specific Mobile Breakpoints
```css
/* Mobile-first base styles (0–767px) */
/* Then enhance at: */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Wide desktop */ }
```

### Hero Mobile Specific
```css
@media (max-width: 767px) {
  .hero {
    padding-block: 100px 60px;
  }
  .hero-grid {
    display: flex;
    flex-direction: column-reverse; /* visual above text */
    gap: 32px;
  }
  .hero-visual {
    /* Clip bottom 20% to hint at scrolling */
    max-height: 280px;
    overflow: hidden;
    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  }
  .hero h1 {
    font-size: clamp(30px, 8.5vw, 38px);
  }
  .hero-cta-row {
    flex-direction: column;
    gap: 12px;
  }
  .hero-cta-row a {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
}
```

### Pricing Card Mobile
```css
@media (max-width: 767px) {
  .pricing-card {
    padding: 28px 20px;
    border-radius: var(--radius-lg);
  }
  .price-value {
    font-size: 44px;
  }
}
```

---

## SECTION 19: NOTIFY ME FORM (below pricing)

Keep this — but make it understated:

```
Not ready yet?
[Enter your email]  [Notify me at launch]
We only email for the launch. Nothing else.
```

**Style:** Simple inline form. `background: var(--color-bg-section); border-radius: 16px; padding: 32px;`

**Input:**
```css
input[type="email"] {
  background: rgba(255,255,255,0.06);
  border: var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  font-size: 15px;
  color: #fff;
  width: 100%;
}
input:focus {
  outline: none;
  border-color: rgba(230,81,0,0.5);
  box-shadow: 0 0 0 3px rgba(230,81,0,0.15);
}
```

---

## SECTION 20: SPECIFIC COPY CHANGES (SUMMARY)

### Replace everywhere found:

| Old Copy | New Copy |
|----------|----------|
| "Your Private Family Photo Vault" (hero H1) | "You've Paid ₹7,800 for Google Photos This Year. You Got Nothing to Show For It." |
| "Get Early Access - Save ₹1,000" | "Pre-order Now — ₹16,500" (primary) + "See How It Works" (secondary) |
| "Coming in 3 Months" badge | "Early Bird · 50 Units · 12 Reserved" badge |
| "No Subscriptions - Ever" feature title | "RAID Protected" (new feature) — add data protection story |
| "Smart Search" feature body | Keep title, update body to: "Find any memory in seconds. Search by date, person, place, or just describe it — 'birthday 2024', 'Goa trip', 'Diwali'." |
| "Be among the first to protect your family photos" | "Your family photos deserve a home that's actually yours." |
| Contact section with form | Remove contact form. Replace with: Founder email + LinkedIn/X link + "We reply to every message within 24 hours." |

### Add new sections not in current site:
1. **COST REFRAME section** (between hero and how it works)
2. **FOUNDER STORY section** (between comparison and pricing)
3. **FINAL CTA BANNER** (between FAQ and footer)
4. **PROBLEM STRIP / Marquee ticker** (below hero)

### Remove from current site:
1. Large standalone "Launch Countdown" section — move countdown to a mini-widget inside hero instead
2. Separate "App Showcase" as a section — merge into features or keep minimal inline in hero visual
3. Contact form — replace with simple email + social link in footer
4. "Cost comparison" grid section — subsume into the COST REFRAME section

---

## SECTION 21: SEO META UPDATES

```html
<title>PersonalVault — Pay ₹16,500 Once. Never Pay for Photos Again. | Made in India</title>

<meta name="description" content="PersonalVault is a plug-and-play home device that backs up every photo your family takes — privately, automatically, forever. No subscriptions. 1TB included. iOS + Android apps. Ships June 2026.">

<!-- Open Graph -->
<meta property="og:title" content="PersonalVault — Pay Once, Store Forever">
<meta property="og:description" content="Stop paying ₹749/month for Google Photos. PersonalVault backs up your entire family's photos at home, privately. ₹16,500 one-time. 1TB included.">
<meta property="og:image" content="https://personalvault.in/og-image.png">
<!-- og:image should be 1200×630px — saffron gradient bg, white logo + "Pay Once. Store Forever." text -->

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="PersonalVault — Stop Paying Monthly for Photos">
<meta name="twitter:description" content="₹16,500 once. Never pay again. Plug-and-play home photo backup. iOS + Android. Made in India.">
```

---

## SECTION 22: FILE STRUCTURE (RECOMMENDED)

```
personalvault-website/
├── index.html
├── privacy.html
├── success.html
├── css/
│   ├── style.css          ← main styles (redesigned)
│   ├── animations.css     ← all keyframes + scroll reveal
│   └── mobile.css         ← mobile overrides (or inline with media queries)
├── js/
│   ├── main.js            ← nav, FAQ accordion, form handlers
│   ├── countdown.js       ← launch date countdown
│   └── reveal.js          ← Intersection Observer scroll reveals
├── assets/
│   ├── logo.png           ← keep as-is
│   └── og-image.png       ← NEW: Open Graph image for social sharing
└── docs/
    ├── REDESIGN_SPEC.md   ← this file
    └── DESIGN.md          ← original design doc
```

---

## QUICK-START IMPLEMENTATION CHECKLIST

For the developer — in priority order:

### Phase 1: Core (Must ship)
- [ ] Redesign CSS with new token system (keep Inter font)
- [ ] Rebuild hero with new copy + visual + scarcity badge
- [ ] Add marquee problem strip
- [ ] Add cost reframe section
- [ ] Move countdown to mini-widget in hero (remove standalone section)
- [ ] Rebuild pricing card with scarcity counter + "38 of 50" counter
- [ ] Update all copy per spec above
- [ ] Mobile layout for all sections
- [ ] Fix meta tags (move keywords to head, add OG tags)

### Phase 2: Polish
- [ ] Scroll reveal animations (Intersection Observer)
- [ ] Hero entry animations (staggered)
- [ ] Floating cards in hero visual
- [ ] FAQ accordion with smooth animation
- [ ] Nav background transition on scroll
- [ ] Founder story section

### Phase 3: Conversion
- [ ] Connect notify form to real backend (Formspree / Google Sheets)
- [ ] Implement actual Razorpay payment link
- [ ] Add og-image.png for social sharing
- [ ] Create success.html redesign (confirmation page post-order)

---

*This spec was authored for PersonalVault v2 redesign.*
*Domain: personalvault.in · Founder: Shubham Gupta · Target launch: June 2026*
