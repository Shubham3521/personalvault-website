# PersonalVault / Daksha - Design Specification

> **Version:** 2.0 (Updated for Pre-Launch)  
> **Date:** March 12, 2026  
> **Status:** Design Specification for Implementation

---

## 1. Brand Overview

### Product Identity
- **Primary Name:** PersonalVault
- **Secondary Name:** Daksha (दक्ष)
- **Tagline:** Your Private Family Photo Vault
- **Product Type:** Self-hosted photo backup device
- **Target Price:** ₹17,500 (Launch Price), ₹16,500 (Early Bird)
- **Storage Included:** **1TB** of local storage (5x more than typical 200GB cloud plans)
- **Market:** Indian families who want privacy, no subscriptions, plug & play simplicity

### Core Value Proposition
- **Your Private Family Photo Vault** - NOT a "Google Photos alternative"
- 100% private photo backup (no cloud, no subscription)
- Plug & Play - No Assembly, No Technical Knowledge Needed
- Both iOS + Android apps ready at launch
- Made in India 🇮🇳

---

## 2. Color Palette

### Primary Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Deep Saffron** | `#E65100` | Primary CTA, accent highlights, brand warmth |
| **Rich Orange** | `#FF6D00` | Hover states, secondary accents |
| **Warm Amber** | `#FFB300` | Gradients, decorative elements, icons |

### Neutral Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Midnight Blue** | `#0D1B2A` | Primary background (dark theme base) |
| **Deep Navy** | `#1B263B` | Card backgrounds, sections |
| **Steel Blue** | `#415A77` | Secondary text, borders |
| **Silver Mist** | `#778DA9` | Muted text, placeholders |
| **Pure White** | `#FFFFFF` | Primary text, headings |
| **Ghost White** | `#F0F4F8` | Light mode backgrounds |

### Accent Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Teal Glow** | `#00BFA5` | Success states, secure indicators |
| **Electric Purple** | `#7C4DFF` | Features highlight, gradients |
| **Coral Red** | `#FF5252` | Important CTAs, alerts |

### Gradient Definitions

```css
/* Primary Hero Gradient */
--gradient-hero: linear-gradient(135deg, #E65100 0%, #FF6D00 50%, #FFB300 100%);

/* Card Glow Gradient */
--gradient-card: linear-gradient(145deg, rgba(230,81,0,0.1) 0%, rgba(124,77,255,0.1) 100%);

/* Text Gradient (for headings) */
--gradient-text: linear-gradient(90deg, #FF6D00 0%, #FFB300 50%, #00BFA5 100%);

/* Background Mesh Gradient */
--gradient-mesh: radial-gradient(ellipse at 20% 20%, rgba(230,81,0,0.15) 0%, transparent 50%),
                 radial-gradient(ellipse at 80% 80%, rgba(124,77,255,0.12) 0%, transparent 50%),
                 radial-gradient(ellipse at 50% 50%, rgba(0,191,165,0.08) 0%, transparent 60%);
```

### Color Usage Rules

1. **Background:** Dark theme primary (`#0D1B2A`) with subtle mesh gradients
2. **Headings:** Gradient text or pure white
3. **Body Text:** Silver Mist (`#778DA9`) for readability
4. **Primary CTA:** Deep Saffron (`#E65100`) with orange hover
5. **Secondary CTA:** Electric Purple (`#7C4DFF`)
6. **Cards:** Deep Navy (`#1B263B`) with subtle border
7. **Success/Trust:** Teal Glow (`#00BFA5`)

---

## 3. Typography

### Font Families

```css
/* Primary (Headings) - Bold, modern geometric sans */
--font-heading: 'Clash Display', 'Sora', 'Outfit', sans-serif;

/* Secondary (Body) - Clean, highly readable */
--font-body: 'DM Sans', 'Nunito Sans', 'Plus Jakarta Sans', sans-serif;

/* Monospace (for technical details) */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Indic Script Support (for Hindi/regional languages) */
--font-indic: 'Noto Sans', 'Noto Sans Devanagari', sans-serif;
```

### Type Scale

| Element | Font | Weight | Size (Desktop) | Size (Mobile) | Line Height |
|---------|------|--------|----------------|---------------|-------------|
| **H1 (Hero)** | Clash Display | 700 (Bold) | 64px / 4rem | 36px / 2.25rem | 1.1 |
| **H2 (Section)** | Clash Display | 600 (Semibold) | 48px / 3rem | 28px / 1.75rem | 1.2 |
| **H3 (Card)** | Clash Display | 600 (Semibold) | 24px / 1.5rem | 20px / 1.25rem | 1.3 |
| **H4 (Sub)** | DM Sans | 600 (Semibold) | 18px / 1.125rem | 16px / 1rem | 1.4 |
| **Body Large** | DM Sans | 400 (Regular) | 18px / 1.125rem | 16px / 1rem | 1.6 |
| **Body** | DM Sans | 400 (Regular) | 16px / 1rem | 15px / 0.9375rem | 1.6 |
| **Small/Caption** | DM Sans | 500 (Medium) | 14px / 0.875rem | 13px / 0.8125rem | 1.5 |
| **Button** | DM Sans | 600 (Semibold) | 16px / 1rem | 15px / 0.9375rem | 1 |
| **Code/Technical** | JetBrains Mono | 400 (Regular) | 14px / 0.875rem | 13px / 0.8125rem | 1.6 |

---

## 4. Layout Structure

### Page Sections (Pre-Launch)

```
┌─────────────────────────────────────────────┐
│  NAVIGATION BAR (Fixed)                     │
│  [Logo]              [Links]  [CTA Button]  │
├─────────────────────────────────────────────┤
│  HERO SECTION                               │
│  ┌─────────────────────────────────────┐   │
│  │  Headline + Tagline                 │   │
│  │  [Early Bird CTA]  [Notify Me CTA]  │   │
│  │  Hero Visual + App Showcase         │   │
│  └─────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  LAUNCH COUNTDOWN SECTION                   │
│  "Coming in 3 Months" + Countdown Timer     │
├─────────────────────────────────────────────┤
│  APP SHOWCASE SECTION                       │
│  iOS + Android Apps (BOTH Ready at Launch) │
├─────────────────────────────────────────────┤
│  PLUG & PLAY FEATURES                       │
│  ┌─────┐ ┌─────┐ ┌─────┐                   │
│  │ F1  │ │ F2  │ │ F3  │                   │
│  └─────┘ └─────┘ └─────┘                   │
├─────────────────────────────────────────────┤
│  HOW IT WORKS (Step by Step)                │
│  ① ──→ ② ──→ ③ ──→ ④                       │
├─────────────────────────────────────────────┤
│  EARLY BIRD DISCOUNT SECTION                │
│  ┌─────────────────────────────────────────┐│
│  │ 🎉 LIMITED EARLY BIRD OFFER            ││
│  │ ₹16,500 (Save ₹1,000)                  ││
│  │ [Book Now via Razorpay]                ││
│  └─────────────────────────────────────────┘│
├─────────────────────────────────────────────┤
│  NOTIFY ME SECTION                           │
│  [Email Form] [Notify Me]                   │
├─────────────────────────────────────────────┤
│  COMPARISON SECTION                          │
│  PersonalVault vs Cloud Services            │
├─────────────────────────────────────────────┤
│  FAQ SECTION (Accordion)                     │
│  [Question 1 + Answer]                      │
│  [Question 2 + Answer]                      │
│  ...                                        │
├─────────────────────────────────────────────┤
│  FOOTER                                     │
│  [Links] [Social] [Copyright]                │
└─────────────────────────────────────────────┘
```

### Responsive Breakpoints

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| **xs** | 0-479px | Small phones |
| **sm** | 480-767px | Large phones |
| **md** | 768-1023px | Tablets |
| **lg** | 1024-1279px | Small laptops |
| **xl** | 1280-1535px | Desktops |
| **2xl** | 1536px+ | Large displays |

---

## 5. Section Specifications

### 5.1 Navigation Bar

**Structure:**
- Logo (left): PersonalVault icon + "PersonalVault" wordmark
- Nav links (center): Features, How It Works, Pricing, FAQ
- CTA Button (right): "Get Early Access" or "Book Now"

**Behavior:**
- Fixed position, transparent initially
- Background blur + solid color on scroll (after 50px)

**Styling:**
- Height: 72px (desktop), 64px (mobile)
- Backdrop blur: 12px
- Background: rgba(13, 27, 42, 0.8) on scroll

---

### 5.2 Hero Section (UPDATED)

**Layout:** Two-column (text left, visual right) on desktop, stacked on mobile

**Content:**
- **Headline:** "Your Private Family Photo Vault"
- **Subheadline:** "Backup photos to YOUR home, not the cloud. Plug & Play - no assembly, no technical knowledge needed. Your photos, your hardware, your control."
- **Primary CTA:** "Get Early Access - Save ₹1,000" (Saffron button)
- **Secondary CTA:** "Notify Me When Launched" (Outline button)
- **Launch Countdown:** "Coming in 3 Months" - Prominent badge

**Key Messaging (CRITICAL):**
- ✅ DO: "Your Private Family Photo Vault"
- ✅ DO: "Plug & Play - No Assembly Required"
- ✅ DO: "iOS & Android Apps Ready at Launch"
- ❌ DON'T: "Google Photos alternative"
- ❌ DON'T: "Self-hosted Google Photos"
- ❌ DON'T: Compare to any competitor

**Visual Elements:**
- Hero illustration: Stylized phone showing app UI + device
- App showcase: Show BOTH iOS and Android app screenshots
- Animated gradient orbs in background

**Trust Badges:**
- 🔌 Plug & Play - No Setup
- 📱 iOS + Android Ready
- 🇮🇳 Made in India
- 💰 One-time Payment

---

### 5.3 Launch Countdown Section (NEW!)

**Layout:** Full-width prominent section

**Content:**
```
🚀 LAUNCHING IN 3 MONTHS

[Countdown Timer: Days : Hours : Minutes : Seconds]

Be among the first to protect your family photos
```

**Styling:**
- Large countdown numbers
- Gradient text
- Urgency messaging

---

### 5.4 App Showcase Section (NEW!)

**Layout:** Two-column showcase (iOS left, Android right)

**Content:**
```
┌─────────────────────────────────────────────────────┐
│  📱 Apps Ready at Launch                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│   [iPhone Mockup]         [Android Mockup]         │
│   iOS App                 Android App               │
│                                                     │
│   ✅ Full Feature          ✅ Full Feature          │
│   ✅ Auto Backup           ✅ Auto Backup           │
│   ✅ Smart Search          ✅ Smart Search          │
│   ✅ Family Sharing        ✅ Family Sharing        │
│                                                     │
│   Both apps included with your purchase!          │
└─────────────────────────────────────────────────────┘
```

**Styling:**
- Large device mockups (iPhone + Android)
- App UI screenshots
- "Ready at Launch" badges (NOT "coming soon")
- Both platforms prominently displayed

---

### 5.5 Features Section

**Layout:** 3-column grid (desktop), 2-column (tablet), 1-column (mobile)

**Feature Cards (6 total):**

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | 🔌 | Plug & Play | No assembly, no setup, no technical knowledge. Just plug in and it works. |
| 2 | 🔒 | 100% Private | Your photos never leave your home. End-to-end encryption keeps everything under your roof. |
| 3 | 📱 | iOS + Android | Both apps ready at launch. Backup from all your devices seamlessly. |
| 4 | 📷 | Auto Backup | Background backup from your phone. WiFi-only option to save mobile data. |
| 5 | 🔍 | Smart Search | AI-powered search finds photos by people, places, objects, and even emotions. |
| 6 | 💰 | No Subscriptions | One-time payment. No monthly fees, ever. Save ₹50,000+ over 10 years. |

**Card Styling:**
- Background: Deep Navy (#1B263B)
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 20px
- Padding: 32px
- Hover: Subtle lift (transform: translateY(-4px)), border glow
- Icon: 48px, with gradient background circle

---

### 5.6 How It Works Section

**Layout:** Horizontal timeline (desktop), vertical steps (mobile)

**Steps:**

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  Step 1 │───→│  Step 2 │───→│  Step 3 │───→│  Step 4 │
│  Order  │    │  Plug   │    │  Scan   │    │  Start  │
│  Device │    │  In     │    │  QR     │    │  Backup │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
```

| Step | Title | Description |
|------|-------|-------------|
| 1 | Order Your Vault | Pre-order the complete device for ₹16,500 (Early Bird) |
| 2 | Plug It In | Connect to power and your home router. That's it. No assembly! |
| 3 | Scan & Connect | Scan the QR code with your phone to link automatically. |
| 4 | Auto Backup Starts | Your photos sync to your personal vault. Done! |

**Visual:**
- Numbered circles with icons
- Connecting line with gradient

---

### 5.7 Early Bird Discount Section (NEW!)

**Layout:** Prominent centered section with pricing card

**Content:**
```
┌─────────────────────────────────────────────────────┐
│  🎉 LIMITED EARLY BIRD OFFER                       │
│                                                     │
│  Save ₹1,000 on launch price                       │
│  Limited slots available                           │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │  Launch Price    ₹17,500                     │ │
│  │  ─────────────                              │ │
│  │  Early Bird      ₹16,500    ✓ YOU SAVE ₹1,000│ │
│  │                                               │ │
│  │  [ Pay via Razorpay ]                        │ │
│  │  🔒 Secure payment • UPI, Card, Wallet        │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  What's included:                                   │
│  ✓ PersonalVault Starter Kit                       │
│  ✓ iOS App (ready at launch)                      │
│  ✓ Android App (ready at launch)                  │
│  ✓ 1-year warranty & support                      │
│                                                     │
│  Or [Notify Me When Launched]                      │
└─────────────────────────────────────────────────────┘
```

**Pricing Update:**
- **Early Bird:** ₹16,500 (₹1,000 off, limited slots)
- **Launch Price:** ₹17,500

**Razorpay Integration:**
- Payment link button
- Accept: UPI, Credit Card, Debit Card, Wallet
- Secure payment badge

---

### 5.8 Notify Me Section (NEW!)

**Layout:** Centered section with email capture form

**Content:**
```
┌─────────────────────────────────────────────────────┐
│  Know When We Launch                               │
│                                                     │
│  Be the first to know when                         │
│  PersonalVault goes live                           │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  [Enter your email]  [Notify Me]            │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  🔒 We hate spam. Only launch news.               │
│                                                     │
│  Join [X] interested families                      │
└─────────────────────────────────────────────────────┘
```

**Form Fields:**
- Email (required)
- Name (optional)

**Success State:**
- "You're on the list! We'll notify you when we launch."

---

### 5.9 Comparison Section

**Layout:** Full-width section with table

**Headline:** "Why PersonalVault?"

**Comparison Table (India Pricing):**

| Service | Monthly | 3-Year Total |
|---------|---------|--------------|
| **PersonalVault** | ₹17,500 (one-time) | ₹17,500 - 1TB |
| Google Photos 200GB | ₹269 | ₹9,684 |
| Google Photos 2TB | ₹749 | ₹26,964 |
| iCloud 200GB | ₹299 | ₹10,764 |
| iCloud 2TB | ₹1,099 | ₹39,564 |
| OneDrive 2TB | ₹669 | ₹24,084 |
| Dropbox 2TB | ₹1,199 | ₹43,164 |

**Feature Comparison:**

| Feature | PersonalVault | Google Photos | iCloud |
|---------|--------------|---------------|--------|
| **Privacy** | 100% private | Partial (AI training) | Limited |
| **Setup Time** | 5 minutes | N/A | N/A |
| **Hardware** | Included | Cloud only | Cloud only |
| **iOS App** | ✅ Ready at launch | ✅ | ✅ |
| **Android App** | ✅ Ready at launch | ✅ | ✅ |
| **Plug & Play** | ✅ Complete device | N/A | N/A |
| **No Monthly Fees** | ✅ Never | ❌ | ❌ |

**Key Differentiators:**
- 🇮🇳 **Made in India** - Support local
- 🔌 **Plug & Play** - No assembly, no setup
- 📱 **iOS + Android** - Both ready at launch
- 🔒 **100% Private** - Photos never leave your home
- 💰 **One-time payment** - No subscriptions ever

---

### 5.10 FAQ Section

**Layout:** Vertical accordion (expandable questions)

**Questions to Include:**

1. **Is this difficult to set up?**
   - Answer: Not at all! Plug & Play - no assembly, no technical knowledge. Just plug in, scan QR, and it works.

2. **Will the apps be ready at launch?**
   - Answer: Yes! Both iOS and Android apps are ready and will be available at launch.

3. **How is this different from cloud services?**
   - Answer: Your photos stay on YOUR device, not in someone else's cloud. No monthly fees, ever.

4. **Can I access photos from outside home?**
   - Answer: Yes! Secure remote access via encrypted tunnel. No port forwarding needed.

5. **What if hardware fails?**
   - Answer: We provide recovery guides. We recommend regular backups to external drive.

6. **Is there a monthly fee?**
   - Answer: No. One-time purchase. No subscription, ever.

---

### 5.11 Footer

**Layout:** 4 columns (desktop), stacked (mobile)

**Columns:**
1. Brand: Logo, tagline, social icons
2. Product: Features, Pricing, FAQ
3. Company: About, Contact, Privacy
4. Legal: Terms, Privacy Policy

**Bottom Bar:**
- Copyright: "© 2026 PersonalVault. Made with ❤️ in India."

---

## 6. Visual Style Guidelines

### 6.1 Overall Aesthetic

- **Theme:** Dark mode primary (midnight blue base)
- **Vibe:** Modern, premium, trustworthy, Indian-rooted
- **Feel:** Tech-forward but approachable

### 6.2 Background Treatments

```css
/* Main background */
background: #0D1B2A;

/* With mesh gradient overlay */
background: 
  radial-gradient(ellipse at 20% 20%, rgba(230,81,0,0.12) 0%, transparent 50%),
  radial-gradient(ellipse at 80% 80%, rgba(124,77,255,0.1) 0%, transparent 50%),
  #0D1B2A;
```

### 6.3 Card Styling

```css
.card {
  background: #1B263B;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(230,81,0,0.3);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3), 
              0 0 60px rgba(230,81,0,0.1);
}
```

### 6.4 Button Styles

#### Primary Button (Saffron)
```css
.btn-primary {
  background: linear-gradient(135deg, #E65100 0%, #FF6D00 100%);
  color: #fff;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(230,81,0,0.4);
}
```

#### Secondary Button (Outline)
```css
.btn-secondary {
  background: transparent;
  color: #fff;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid rgba(255,255,255,0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: #FFB300;
  color: #FFB300;
}
```

### 6.5 Animations & Motion

#### Page Load
- Hero text: Fade in + slide up (stagger 0.1s per element)
- Hero visual: Scale up from 0.9 to 1 (0.6s ease-out)

#### Scroll Reveals
- Sections: Fade in + slide up when entering viewport
- Cards: Stagger reveal (0.1s delay between each)

#### Transitions
- Default: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

---

## 7. Responsive Design Rules

### Mobile-First Approach
1. Design for mobile first, then enhance for larger screens
2. Use fluid typography (clamp functions)
3. Touch-friendly tap targets (min 44px)

### Mobile Specifics
- **Navigation:** Hamburger menu with full-screen overlay
- **Hero:** Stacked layout, smaller fonts, simplified visual
- **Features:** Single column, larger tap targets
- **Pricing:** Stacked cards, full-width buttons

---

## 8. Accessibility Requirements

### WCAG 2.1 AA Compliance

1. **Color Contrast:**
   - Body text: Minimum 4.5:1
   - Large text: Minimum 3:1

2. **Focus States:**
   - Visible focus ring on all interactive elements

3. **Keyboard Navigation:**
   - Logical tab order

4. **Screen Reader:**
   - Proper heading hierarchy (h1 → h2 → h3)
   - Alt text for all images

---

## 9. Performance Guidelines

### Loading Speed Targets
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1

---

## 10. Implementation Priority

### Phase 1: Core Pages
1. Landing page (index.html) - Hero + Features + CTA
2. Responsive layout and navigation

### Phase 2: Pre-Launch Sections
3. Launch Countdown section
4. App Showcase section (iOS + Android)
5. Early Bird Discount section with Razorpay
6. Notify Me section

### Phase 3: Additional Sections
7. How It Works section
8. Comparison section
9. FAQ section

### Phase 4: Polish
10. Animations and micro-interactions
11. SEO meta tags

---

## 11. File Structure

```
personalvault-website/
├── index.html              # Main landing page
├── css/
│   ├── main.css           # Main styles
│   ├── components.css     # Reusable components
│   └── animations.css     # Animation keyframes
├── js/
│   ├── main.js            # Main functionality
│   ├── navigation.js      # Mobile nav, scroll effects
│   └── countdown.js       # Launch countdown timer
├── assets/
│   ├── images/            # Hero visuals, icons, app screenshots
│   └── fonts/             # Self-hosted fonts (if needed)
├── DESIGN.md              # This specification
├── SPEC.md                # Product specification
└── MARKETING_V2.md        # Marketing strategy
```

---

## 12. Assets Needed

### Images
- [ ] Hero illustration (phone + device mockup)
- [ ] iOS app screenshots (ready at launch)
- [ ] Android app screenshots (ready at launch)
- [ ] Feature icons (6x, SVG)
- [ ] How It Works step illustrations (4x)
- [ ] Countdown timer graphics

### Icons
- Lucide icons (MIT licensed)
- Heroicons for navigation

---

## Key Changes Summary (v1 → v2)

### Removed Fake Info
- ❌ Removed fake testimonials (Rahul M., Priya S., Amit K.)
- ❌ Removed "2,500+ families" (unverified claim)
- ❌ Removed "4.8★ from 120+ reviews" (unverified)
- ❌ Removed "500+ Discord members" (unverified)

### Added Pre-Launch Sections
- ✅ Launch Countdown ("Coming in 3 Months")
- ✅ Early Bird Discount (₹16,500, ₹1,000 off)
- ✅ Razorpay payment button
- ✅ Notify Me / Interest form section

### Updated Positioning
- ✅ "Your Private Family Photo Vault" (NOT "Google Photos alternative")
- ✅ Plug & Play - No Assembly emphasized
- ✅ iOS + Android apps shown as ready at launch

### Updated Pricing
- ✅ Early Bird: ₹16,500
- ✅ Launch Price: ₹17,500

---

*Specification updated for PersonalVault Pre-Launch — Your Private Family Photo Vault*
