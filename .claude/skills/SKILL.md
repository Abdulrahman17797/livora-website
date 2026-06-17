# Livora Kombucha — Design System

## Brand Identity

Livora is a **premium, small-batch kombucha brand** targeting health-conscious consumers aged 25–40. The aesthetic is sophisticated, clean, and quietly confident — never loud, never generic. Think premium skincare meets artisan food. Not wellness-bro. Not tech-startup. Certainly not AI-generated stock art.

---

## Typography

**Primary Font: Poppins** (Google Fonts)

Weights in use:
| Weight | Use |
|--------|-----|
| 300 (Light) | Body copy, captions, descriptive text |
| 400 (Regular) | UI labels, nav links |
| 500 (Medium) | Subheadings, button labels |
| 600 (SemiBold) | Section headings, card titles |
| 700 (Bold) | Page headings |
| 800 (ExtraBold) | Hero statements only |

**Type rules:**
- Letter-spacing: `tracking-widest` for eyebrow labels (ALL CAPS, uppercase)
- Never use monospace fonts in UI
- Avoid system fonts — always load Poppins via Google Fonts or `next/font/google`
- Line-height for body: `leading-relaxed` (1.625)
- Line-height for headings: `leading-tight` (1.25)

---

## Colour Palette

| Token | Hex | Use |
|-------|-----|-----|
| `--pink` | `#E8A0BF` | Accent, hovers, soft backgrounds, borders on active state |
| `--pink-light` | `#F5D0E4` | Background washes, tag chips, subtle fills |
| `--pink-dark` | `#C9739A` | Pressed states, dark-mode pink |
| `--purple` | `#9B5DE5` | Primary brand colour, CTAs, active nav, gradient start |
| `--purple-light` | `#C49CF0` | Gradient ends, hover glows |
| `--purple-dark` | `#7A3DB8` | Pressed states, strong contrast |
| White | `#FFFFFF` | Page background — always |
| Near-black | `#1a1a1a` | Body text |
| Muted | `#6B7280` (gray-500) | Secondary text, captions |

**Gradient (primary brand gradient):**
```css
background: linear-gradient(135deg, #9B5DE5 0%, #E8A0BF 100%);
```
Use on: CTAs, active indicators, large decorative elements, hero text.

**Background washes:**
```css
background: linear-gradient(135deg, #F5D0E4 0%, #C49CF0 100%);
```
Use on: avatar placeholders, section dividers, card hero areas.

**Never use:**
- Dark mode (brand is white-forward, intentionally light)
- Pure black (`#000000`) as text
- Saturated reds, greens, or blues unrelated to product photography
- Gray backgrounds — use white or the pink/purple wash instead

---

## Spacing Grid

**Base unit: 8px**

All spacing must be a multiple of 8:
| Tailwind class | px | Use |
|---------------|----|-----|
| `p-2` / `gap-2` | 8px | Tight internal padding (badges, chips) |
| `p-4` / `gap-4` | 16px | Default button padding, small gaps |
| `p-6` / `gap-6` | 24px | Card internal padding (min) |
| `p-8` / `gap-8` | 32px | Section internal padding |
| `py-16` | 64px | Section vertical rhythm |
| `py-24` | 96px | Major section breaks |

Never use odd spacing values like `p-5` (`20px`) for structural layout — only for micro-adjustments within components.

---

## Component Patterns

### Cards
- `rounded-3xl` — always, for cards, modals, and media containers
- `border border-gray-100` — subtle 1px border, not shadows by default
- On hover: `hover:shadow-xl hover:shadow-[#E8A0BF]/20` + `hover:-translate-y-1`
- Transition: `transition-all duration-300`
- Background: white (`bg-white`) or a soft gradient wash

### Buttons
**Primary (CTA):**
```html
<button class="gradient-bg text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity">
```
**Secondary (outline):**
```html
<button class="border border-gray-200 font-semibold px-8 py-4 rounded-full hover:border-[#E8A0BF] transition-colors">
```
- Always `rounded-full` — never `rounded-md` or `rounded-lg` for primary CTAs
- Never use flat colour without gradient for primary actions
- Icon-only buttons: `rounded-full border border-gray-200` with explicit `w-N h-N`

### Tags / Chips
```html
<span class="text-xs font-medium bg-[#F5D0E4]/50 text-[#9B5DE5] px-3 py-1 rounded-full">
```

### Section eyebrow labels
```html
<p class="text-sm font-semibold tracking-widest uppercase text-[#9B5DE5]">
```
Always above the heading. Never replace with a heading tag.

### Form inputs
```html
<input class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E8A0BF] transition-colors">
```
- `rounded-xl` for inputs, `rounded-2xl` for larger containers
- Focus: `focus:border-[#E8A0BF]` — no blue browser ring, no box-shadow ring

---

## Animation (Framer Motion)

**Default fade-up (use for staggered lists and sections):**
```ts
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};
```

**Scroll-reveal (use `whileInView` + `viewport={{ once: true }}`):**
```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
```

**Rules:**
- Always `once: true` for scroll-triggered — never replay on scroll-back
- Duration range: 0.4s–0.7s. Never exceed 1s for UI transitions
- Easing: `easeOut` for entrances, `easeInOut` for state transitions
- No bounce on text or containers — reserve spring for icons/badges only
- Stagger delay: `i * 0.08` to `i * 0.12` for grids of 3–6 items

---

## Photography & Illustration Direction

- **Do:** Overhead product shots, botanicals on white marble, moody lifestyle shots with clean backgrounds, close-up bubbles/textures
- **Don't:** Generic health stock photos, smiling-people-with-salad, illustrated mascots, AI-generated food photography
- **Colour temperature:** Warm neutral — slightly golden-hour light, not cold blue tones
- **Backgrounds in photography:** White, light stone, pale linen — never busy or coloured

---

## What "Premium, Not Generic AI" Means

This brand should feel like it was designed by a boutique studio that charges too much, not by a template. Specific anti-patterns to avoid:

- No hero sections with a centred gradient blob behind text
- No glass-morphism cards
- No grid of 3 icon+text feature cards with generic icons
- No "Why Choose Us?" section headers
- No sans-serif + decorative font combos (Poppins only)
- No infinite scroll animations or parallax on text
- No neon colours, gradients with more than 2 stops, or dark-mode defaults
- No stock SVG illustrations (use emoji or product photography instead)
- Avoid the phrase "crafted with care" or "made with love" in copy — be specific
- Never write "100% natural" without qualifying what that means

---

## Voice & Tone

- **Confident, not boastful** — let the product speak; don't oversell
- **Warm, not twee** — friendly but not childish
- **Specific, not vague** — "21 days fermentation" not "traditionally brewed"
- **British English** — "flavour" not "flavor", "colour" not "color", single quotes in casual copy
- Short paragraphs. No bullet points in hero or about copy. Headers only when needed.
