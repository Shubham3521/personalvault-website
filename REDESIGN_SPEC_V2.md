# PersonalVault — Redesign Spec V2

> **Version:** 2.0 (Minimalist Redesign)
> **Date:** March 2026
> **Design Direction:** Minimalist dark — Apple, Linear, Stripe-inspired
> **Status:** Approved for implementation

---

## Overview

The V2 redesign strips back V1's visual noise — glow effects, marquee tickers, floating cards, gradient overload — and replaces it with confident, clean typography and generous whitespace. The brand is PersonalVault, presented as a company, not a solo founder project. No personal names, no fabricated stats, no fake scarcity.

**Goal:** A site that feels as premium as the product it's selling.

---

## What to Remove From V1 (CSS/HTML Cleanup)

Remove these elements entirely before rebuilding:

### Remove from CSS
```css
/* REMOVE ALL OF THESE */

/* Glow effects on cards */
box-shadow: 0 0 60px rgba(230,81,0,0.1);
box-shadow: 0 0 ...rgba(...);

/* Card gradient backgrounds */
--gradient-card: linear-gradient(145deg, rgba(230,81,0,0.1)...);

/* Mesh/radial background gradients */
radial-gradient(ellipse at 20% 20%, rgba(230,81,0,0.15)...);
radial-gradient(ellipse at 80% 80%, rgba(124,77,255,0.12)...);

/* Gradient text on headings */
background: linear-gradient(...);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* All animated gradient orbs */
.gradient-orb, .hero-orb, .bg-orb { ... }

/* Electric Purple — remove entirely */
--color-purple: #7C4DFF;

/* Coral Red CTA */
--color-coral: #FF5252;
```

### Remove from HTML
- Marquee ticker / scrolling text band (section or `<marquee>`)
- Countdown timer section (don't fake urgency)
- "38 of 50 remaining" or any fake scarcity copy
- "2,500+ families" or any unverified social proof
- Any mention of "Shubham" or founder name
- Founder photo, quote, or story section
- App Showcase mockup section (no real screenshots yet)
- Animated floating/levitating card components

---

## Color Usage (V2 Rules)

Keep the brand palette. Simplify how it's used.

| Color | Hex | V2 Usage |
|-------|-----|----------|
| Midnight Blue | `#0D1B2A` | Page background only |
| Deep Navy | `#1B263B` | Card/section backgrounds |
| Steel Blue | `#415A77` | Borders, dividers |
| Silver Mist | `#778DA9` | Body text, captions |
| Pure White | `#FFFFFF` | All headings, primary text |
| Deep Saffron | `#E65100` | Primary CTA button only |
| Rich Orange | `#FF6D00` | CTA hover state |
| Warm Amber | `#FFB300` | Accent icons, small highlights |
| Teal | `#00BFA5` | Trust badges, checkmarks, "secure" indicators |

**V2 Rules:**
- No gradient text on headings — use `#FFFFFF` only
- No gradient backgrounds on cards
- No purple (`#7C4DFF`) anywhere
- One primary CTA color: Saffron (`#E65100`)
- Background stays flat `#0D1B2A` — no mesh radial gradients

---

## Typography (V2)

Switch to Inter. Remove Clash Display, DM Sans, Sora.

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Type Scale

| Element | Weight | Desktop | Mobile | Line Height |
|---------|--------|---------|--------|-------------|
| H1 (Hero) | 700 | 56px | 36px | 1.1 |
| H2 (Section) | 600 | 40px | 28px | 1.2 |
| H3 (Card title) | 600 | 20px | 18px | 1.3 |
| Body Large | 400 | 18px | 16px | 1.7 |
| Body | 400 | 16px | 15px | 1.7 |
| Caption / Label | 500 | 13px | 12px | 1.5 |
| Button | 600 | 15px | 15px | 1 |

**Rules:**
- No emoji in headings
- No all-caps headings (sentence case or title case only)
- Subheadings in Silver Mist (`#778DA9`), not white

---

## Page Structure (8 Sections)

```
1. Navigation
2. Hero
3. What It Is (3-column value props)
4. How It Works (4 steps)
5. Features
6. Pricing / Pre-order
7. FAQ
8. Footer
```

Cut from V1: Countdown timer, App Showcase, Comparison table, Notify Me form, Founder/Story section, Marquee band.

---

## Section Specs

---

### 1. Navigation

**Layout:** Logo left · Nav links center · CTA right  
**Height:** 64px desktop / 56px mobile  
**Background:** Transparent → `rgba(13,27,42,0.9)` on scroll with `backdrop-filter: blur(12px)`  
**Border bottom:** `1px solid rgba(255,255,255,0.06)` on scroll

**Nav Links:** Features · How It Works · Pricing · FAQ  
**CTA:** "Pre-order Now" — Saffron solid button

**Mobile:** Hamburger → full-height slide-out drawer, dark overlay

```css
nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 0 48px;
}

nav.scrolled {
  background: rgba(13, 27, 42, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
```

---

### 2. Hero

**Layout:** Single column, centered  
**Padding:** 160px top / 120px bottom (desktop) · 100px / 80px (mobile)  
**Max width:** 760px centered

**Copy:**

```
[Label — small caps, Teal, letter-spacing: 0.08em]
YOUR PRIVATE PHOTO VAULT

[H1]
Your photos. Your home.
Your control.

[Body Large, Silver Mist, max-width 560px, centered]
PersonalVault is a plug & play device that backs up
your family photos at home — no cloud, no subscriptions,
no third parties. Ever.

[Buttons — row, centered, 16px gap]
[Primary] Pre-order Now — ₹16,500
[Secondary] Learn More ↓
```

**Visual:** No animated orbs. Optional: single static device image or abstract minimal graphic, centered below buttons.

**Trust row** (below buttons, 32px margin-top):

```
[Icon] Plug & Play    [Icon] 1TB Included    [Icon] One-time Price    [Icon] Made in India
```

Style: small icons (16px), Silver Mist text, `|` separators, no badges/pills.

---

### 3. What It Is (Value Props)

**Layout:** 3-column grid, centered  
**Section padding:** 100px top/bottom (desktop) · 64px (mobile)  
**Section label:** "WHY PERSONALVAULT" in Teal, small caps, centered above heading

**Heading:** "Private, simple, yours."  
(H2, White, centered, no gradient)

**3 Cards:**

| # | Title | Body |
|---|-------|------|
| 1 | Private by design | Your photos stay on your device at home. No cloud upload. No third party access. Full encryption at rest and in transit. |
| 2 | One purchase, forever | Pay once. No monthly fees, ever. Unlike cloud storage that charges you every month, PersonalVault is yours to keep. |
| 3 | Works with every phone | iOS and Android apps available at launch. Backup from every device in the house, automatically. |

**Card styling:**

```css
.card {
  background: #1B263B;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 40px 36px;
  /* NO box-shadow glow */
  /* NO gradient background */
}

.card:hover {
  border-color: rgba(255, 255, 255, 0.14);
  /* Subtle border brighten only — no glow, no lift */
}
```

**Icon:** 32px Amber icon, no gradient circle background.  
**Card title:** H3, White  
**Card body:** Body, Silver Mist

**Mobile:** Stack to single column, full-width cards.

---

### 4. How It Works

**Layout:** Horizontal 4-step timeline (desktop) · Vertical stacked list (mobile)  
**Section padding:** 100px top/bottom  
**Background:** Slight contrast — `#0F1F30` or a thin `1px solid` top/bottom rule

**Heading:** "Up and running in minutes."  
**Subheading (Silver Mist):** "No assembly. No technical knowledge needed."

**Steps:**

| # | Title | Description |
|---|-------|-------------|
| 1 | Order | Pre-order the PersonalVault device. Ships when we launch in June 2026. |
| 2 | Plug in | Connect to power and your home Wi-Fi router. That's the entire setup. |
| 3 | Scan the QR | Open the app, scan the QR code on the device. You're connected. |
| 4 | Automatic backup | Your photos start backing up in the background. Set it and forget it. |

**Step styling:**
- Number in a circle: 40px, `border: 1px solid rgba(255,255,255,0.15)`, White text, no fill gradient
- Connector line: `1px solid rgba(255,255,255,0.1)` between steps (desktop only)
- Title: H3 White
- Description: Body, Silver Mist

**Mobile:** Stack vertically with left-aligned numbers and indented text.

---

### 5. Features

**Layout:** 2-column grid (desktop) · 1-column (mobile)  
**Section padding:** 100px top/bottom  
**Section label:** "WHAT'S INCLUDED"

**Heading:** "Everything you need. Nothing you don't."

**6 Feature rows** (icon + title + description, left-aligned):

| # | Title | Description |
|---|-------|-------------|
| 1 | 1TB storage, mirrored | Dual-drive setup mirrors your data for protection. 1TB included out of the box. |
| 2 | Secure remote access | View and share your photos securely from anywhere. Encrypted tunnel — no port forwarding. |
| 3 | Auto backup | Photos sync in the background over Wi-Fi. No manual effort, ever. |
| 4 | iOS & Android apps | Full-featured apps for both platforms, available at launch. |
| 5 | No subscriptions | One-time payment. The device is yours. No renewal, no lock-in. |
| 6 | Made in India | Designed and assembled in India. |

**Row styling:**
```css
.feature-row {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 28px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
```

Icon: 20px, Amber or Teal. Title: weight 600, White. Description: Silver Mist.

No cards. Just clean rows separated by thin lines.

---

### 6. Pricing / Pre-order

**Layout:** Centered, single pricing card + context text  
**Section padding:** 100px top/bottom  
**Background:** Can use `#1B263B` full-width band to distinguish from surrounding sections

**Section label:** "PRE-ORDER"  
**Heading:** "Reserve yours today."  
**Subheading (Silver Mist):** "Ships June 2026. Cancel anytime before shipping."

**Pricing card:**

```
┌─────────────────────────────────────────────┐
│  Early Bird Price                           │
│  ₹16,500                                    │  ← H1-weight
│  ₹17,500 at launch                          │  ← Caption, strikethrough, Silver Mist
│                                             │
│  ✓  1TB dual-drive storage included        │
│  ✓  iOS + Android apps at launch           │
│  ✓  One-time purchase — no subscriptions   │
│  ✓  Secure encrypted remote access         │
│  ✓  1-year warranty                        │
│                                             │
│  [Pre-order Now — Pay via Razorpay]        │  ← Full-width Saffron button
│                                             │
│  Secured by Razorpay · UPI · Cards · Wallets│  ← Caption, Silver Mist, with Razorpay logo
└─────────────────────────────────────────────┘
```

**Card styling:**
```css
.pricing-card {
  background: #1B263B;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 48px;
  max-width: 480px;
  margin: 0 auto;
  /* NO glow shadow */
}
```

**Checklist items:** Teal checkmark icon (16px) + Body text White  
**Button:** Full width, Saffron, 52px height, border-radius 10px, no gradient shadow  
**Below card:** "Launching June 2026 · Made in India"

**Mobile:** Card is full-width with 20px side padding.

---

### 7. FAQ

**Layout:** Single column, max-width 680px, centered  
**Section padding:** 100px top/bottom

**Heading:** "Common questions."

**Accordion items** (6 max):

1. **Is it difficult to set up?**
   No. PersonalVault is plug & play. Plug into power, connect to your router, scan the QR code. No assembly, no technical knowledge needed.

2. **What storage does it come with?**
   1TB, built in. The dual-drive setup mirrors your data automatically for protection.

3. **Do both iOS and Android work?**
   Yes. Both apps are available at launch. Backup from every device in your home.

4. **Can I access photos when I'm away from home?**
   Yes. PersonalVault supports secure encrypted remote access from anywhere, without any complex network setup.

5. **Is there a monthly fee?**
   No. PersonalVault is a one-time purchase. No subscriptions, no renewals, no hidden fees.

6. **When does it ship?**
   We're launching in June 2026. Pre-orders placed now are confirmed before the launch queue.

**Accordion styling:**
```css
.faq-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  padding: 24px 0;
}

.faq-question {
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-answer {
  color: #778DA9;
  margin-top: 12px;
  line-height: 1.7;
}
```

Expand/collapse with `+` / `−` icon. No animation except a simple height transition.

---

### 8. Footer

**Layout:** 2-row — logo/tagline row + links row  
**Padding:** 64px top / 48px bottom

**Row 1:**
- Logo (left) + tagline "Your Private Family Photo Vault" (Silver Mist)
- Links (right): Privacy Policy · Terms · Contact

**Row 2 (bottom bar):**
- `© 2026 PersonalVault. Made in India.`
- Small: `personalvault.in`

**No social icons** (don't link to non-existent accounts).

```css
footer {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  background: #0D1B2A;
  color: #778DA9;
  font-size: 14px;
}
```

---

## Spacing System

Use an 8px base grid. No arbitrary values.

| Token | Value | Use |
|-------|-------|-----|
| `--space-1` | 8px | Icon gap, inline |
| `--space-2` | 16px | Between label and heading |
| `--space-3` | 24px | Within a card |
| `--space-4` | 32px | Between card elements |
| `--space-6` | 48px | Card padding (mobile) |
| `--space-8` | 64px | Section padding (mobile) |
| `--space-12` | 96px | Section padding (desktop) |
| `--space-16` | 128px | Hero top padding |

**Max widths:**
- Hero text: `max-width: 760px`
- Body copy: `max-width: 620px`
- Cards grid: `max-width: 1100px`
- Pricing card: `max-width: 480px`
- FAQ: `max-width: 680px`
- Site container: `max-width: 1200px; padding: 0 48px;`

---

## Animations (Subtle Only)

```css
/* Fade-in on scroll — the only scroll animation */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Use IntersectionObserver to add `.visible` when element enters viewport.

**Stagger:** Apply `transition-delay: 0.1s` per item in grids/lists, max 3 items staggered.

**Do NOT use:**
- Parallax
- Continuous loops / auto-scroll
- Animated gradient orbs
- Floating/levitating card effects
- Hover glow pulses
- Any animation on page load beyond hero fade-in

---

## Component Reference

### Primary Button
```css
.btn-primary {
  background: #E65100;
  color: #fff;
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: #FF6D00;
  /* NO box-shadow glow */
  /* NO transform */
}
```

### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: #fff;
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.5);
  color: #fff;
}
```

### Section Label
```css
.section-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #00BFA5;
  margin-bottom: 16px;
}
```

### Divider
```css
hr.divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  margin: 0;
}
```

---

## Mobile Layout Notes

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px – 1023px
- Desktop: ≥ 1024px

**Mobile-specific rules:**

- Nav: Hamburger, full-height drawer
- Hero: Center-aligned, H1 36px, single column, buttons stack vertically
- Value props (section 3): 1-column, no grid
- How It Works (section 4): Vertical numbered list, no horizontal connector
- Features (section 5): 1-column full-width rows
- Pricing card (section 6): Full width, 20px horizontal padding
- FAQ (section 7): Full width, larger tap targets (min 44px)
- Footer: Stacked, centered text, links in a column

**Touch targets:** All interactive elements minimum 44×44px.

**Font loading:** Load Inter from Google Fonts with `display=swap`. No fallback custom fonts.

---

## Copy Tone Guide

- **Voice:** We — not I. Company, not founder.
- **Tone:** Clear, confident, warm. Not hype. Not corporate jargon.
- **Claims:** Only state what's true and provable. No "2,500+ families." No "most loved." No fake reviews.
- **Scarcity:** Don't manufacture urgency. "Pre-order now" is enough — no fake slot counters.
- **Language:** English throughout. Keep it simple — this is a family product, not a developer tool.

---

## What V1 Had That V2 Removes

| V1 Element | V2 Action |
|------------|-----------|
| Gradient glow on cards | Removed — clean borders only |
| Mesh radial background gradients | Removed — flat `#0D1B2A` |
| Gradient text headings | Removed — solid white |
| Animated orbs / floating elements | Removed entirely |
| Marquee scrolling ticker | Removed entirely |
| Countdown timer | Removed — no fake urgency |
| "38 of 50 slots remaining" | Removed — false claim |
| "2,500+ families" | Removed — unverified |
| Founder name / story | Removed — company brand |
| Electric Purple (`#7C4DFF`) | Removed from palette |
| App Showcase mockups | Removed — no real screenshots yet |
| Clash Display font | Replaced with Inter |
| DM Sans font | Replaced with Inter |
| Heavy animations on load | Replaced with simple fade-in |
| Hover glow box-shadows | Removed — border color change only |
| Comparison table | Removed — keep page focused |

---

*PersonalVault — V2 Redesign Spec. For implementation questions, refer to this document.*
