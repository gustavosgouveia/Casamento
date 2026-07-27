# amabillyegabriel.com — Clone Findings

Wedding site for **Amábilly & Gabriel** (29 Jun 2024). Built with Next.js. Elegant editorial serif/script aesthetic, muted neutral palette, B&W photography, watercolor nature accents.

## Tech / Fonts
- Adobe Fonts (Typekit kit `gja5cdy`): `freight-big-pro` (serif display), `bickham-script-pro-3` (formal script), `imbue-variable` (thin condensed display).
- Body: **Inter** (Google / next-font).
- Load via `<link href="https://use.typekit.net/gja5cdy.css">` in `<head>` (same as original).

## Palette
- Background: white `#ffffff`.
- Text: near-black `rgb(15,15,15)` / `#0f0f0f`; body copy dark gray.
- Gold accent (buttons/timeline lines): warm gold ~`#b08d57` / `#a8905f`.
- Dark panels: near-black `#111`/`#1a1a1a`.
- Faint headings: `rgba(15,15,15,0.35)`.

## Type scale (computed)
- Hero name: freight-big-pro, 72px, weight 200, uppercase, white.
- OurStory "NOSSA/HISTÓRIA": freight-big-pro 108px, weight 200, line-height 125px. "NOSSA" color rgba(15,15,15,.35), "HISTÓRIA" near-black.
- Panel titles: freight-big-pro ~44px letter-spaced.
- Nav links: Inter 16px 500 uppercase. Active page link: bickham-script-pro-3, 42px, lowercase.
- Countdown numbers: freight-big-pro large; labels Inter uppercase tracked.

## Nav (`Navigation_nav`)
- Fixed, height 112px, padding 24px 48px, z-index 5, `justify-content: space-between`.
- Left: AG monogram logo (img). Center/right: link list. Active page link rendered in script font, lowercase.
- Over hero: transparent bg, white text. After scrolling past hero: solid white bg, dark text, subtle bottom border. (Implement via scroll threshold.)

## Home topology (main children)
1. **HomeHeader** (hero, 100vh ~911px): fixed fullscreen background photo **slideshow** crossfading `banner/01–08.jpg` (z-index -5). Centered white: name "AMÁBILLY & GABRIEL", thin divider, script subtitle "nas ditas linhas em que nos encontramos", "29 DE JUNHO DE 2024", "MG–SP".
2. **CountdownSection**: "Casados há:" live counter — Meses / Dias / Horas / Minutos / Segundos (counts UP from 29 Jun 2024). Over couple photo with torn-paper white transition into white.
3. **SaveTheDate**: huge serif "SAVE THE DATE!" (gradient/faded letters) left + gold-outline script button "Confirme sua presença" with AG monogram. Right: 3 arch-topped B&W photos numbered 01./02./03. with gold vertical lines + dates: 10 APRIL 2018 O COMEÇO, 18 NOV 2023 O PEDIDO, 29 JUN 2024 O CASAMENTO. Photos: love_session-41 / -111 / -65.
4. **HorizontalScrollSection** (pinned, ~5715px scroll): 6 full-viewport panels sliding horizontally as you scroll vertically. Alternating light/dark. Each: title (serif) + script pill button + large watercolor nature photo bg.
   - A CERIMÔNIA (light, folha2/leaf) — "Veja informações sobre nosso Grande Dia!" + address "Caioçara, Jarinu - SP, 13240-000 / Estrada Municipal do Bairro Caioçara 1100"
   - LISTA DE PRESENTES (dark, tulipa) — "Cheque nossa lista de presentes" → /pt/presentes
   - CÓDIGO DE VESTIMENTA (light, girassol) — "Confira o dresscode"
   - HOSPEDAGEM (dark, dandelion) — "Encontre lugares por perto para sua hospedagem!"
   - POEMAS (light, planta) — "Poemas que trocamos ao longo dos anos!"
   - GALERIA (dark, final) — "As fotos do nosso pré-wedding"
5. **OurStorySection**: "NOSSA HISTÓRIA" giant serif (NOSSA faint, HISTÓRIA dark), body paragraph right-aligned (Inter), "Continue lendo..." script pill button.
6. **Footer**: AG monogram centered on white, then black bar "DEVELOPED BY GABRIEL MAX & ANA AMÁBILLY".

## Presentes topology (`/pt/presentes`)
- Full-page gift grid over a faded couple photo background (`giftpage.jpg`, fixed).
- `productsContainer`: flex-wrap, gap 44px 34px, justify-center, max-width 2400px, padding 164px 64px.
- 60 gift **cards** (300px wide): frosted glass `rgba(255,255,255,0.44)` + `backdrop-filter: blur(11.3px)`, radius 18px, border 1px `#ddd`, shadow `0 4px 8px rgba(0,0,0,.25)`, padding 32px.
  - Image (arch/rounded 8px, ~210×158, object-fit cover), title (uppercase serif, centered), price "R$ x,xx" (bold), pill button "Comprado" (disabled/gold outline) or available.
- 30 bought (Comprado, disabled), 30 available. Full data in `src/lib/gifts.ts`.

## Behaviors
- Hero bg slideshow: crossfade banners ~every few seconds.
- Countdown: live setInterval updating months/days/hours/mins/secs since 2024-06-29.
- HorizontalScroll: sticky/pinned, vertical scroll → horizontal translateX across 6 panels.
- Nav: transparent/white → solid-white/dark past hero.
- Buttons/cards: subtle hover (scale/opacity).
