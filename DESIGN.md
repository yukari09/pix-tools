---
name: PixTools
description: "图片不出本机 — seven browser-local image tools in one paper-and-ink directory."
colors:
  signal: "#E4442A"
  accent-removebg: "#E4442A"
  accent-compress: "#2E6E8E"
  accent-convert: "#A6632F"
  accent-resize: "#2E7D5B"
  accent-nine-grid: "#2B3A67"
  accent-watermark: "#C9871A"
  accent-filters: "#A83E5B"
  local-green: "#0A8F4D"
  local-green-dark: "#7BCB9A"
  saving-green: "#0A6F43"
  danger: "#B42318"
  paper: "#F6F7F5"
  surface: "#FFFFFF"
  ink: "#121417"
  ink-soft: "#33383E"
  muted: "#5B6167"
  line: "#DDE0DB"
  line-strong: "#B8BDB6"
  hairline: "#EEF0EB"
  plate: "#ECEEE8"
  recess: "#F1F2EE"
  checker: "#E6E8E2"
  footer-text: "#CFD3CC"
  footer-muted: "#8F958D"
  footer-rule: "#2A2E2B"
typography:
  display:
    fontFamily: "\"Smiley Sans\", \"Noto Sans SC\", \"PingFang SC\", sans-serif"
    fontSize: "clamp(38px, 4.6vw, 58px)"
    fontWeight: 400
    lineHeight: 1.01
    letterSpacing: "-0.015em"
  display-tool:
    fontFamily: "\"Smiley Sans\", \"Noto Sans SC\", \"PingFang SC\", sans-serif"
    fontSize: "clamp(34px, 4.2vw, 52px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  display-404:
    fontFamily: "\"Smiley Sans\", \"Noto Sans SC\", \"PingFang SC\", sans-serif"
    fontSize: "clamp(48px, 8vw, 88px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "\"Smiley Sans\", \"Noto Sans SC\", \"PingFang SC\", sans-serif"
    fontSize: "22px"
    fontWeight: 400
    letterSpacing: "-0.015em"
  title:
    fontFamily: "\"Smiley Sans\", \"Noto Sans SC\", \"PingFang SC\", sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: "\"Noto Sans SC\", \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", \"Segoe UI\", sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  button:
    fontFamily: "\"Noto Sans SC\", \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", \"Segoe UI\", sans-serif"
    fontSize: "14px"
    fontWeight: 700
  label:
    fontFamily: "\"Noto Sans SC\", \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", \"Segoe UI\", sans-serif"
    fontSize: "10.5px"
    fontWeight: 600
    letterSpacing: "0.16em"
  readout:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "10.5px"
    fontWeight: 400
    letterSpacing: "0.06em"
rounded:
  sm: "2px"
  circle: "50%"
spacing:
  tight: "8px"
  grid: "12px"
  rail: "14px"
  inset: "20px"
  block: "22px"
  gutter: "28px"
  hero: "40px"
  section: "72px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "#000000"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  nav-link:
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: "7px 9px"
  nav-link-current:
    textColor: "{colors.ink}"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: "6px 11px"
  filter-chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "6px 11px"
  tool-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "13px 15px 15px"
  dropzone:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    padding: "20px"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 10px"
    height: "38px"
  spec-card:
    backgroundColor: "{colors.surface}"
    padding: "18px 20px"
  compare-plate:
    backgroundColor: "{colors.surface}"
    padding: "10px"
---

# Design System: PixTools

## Overview

**Creative North Star: "The Local Darkroom"**

A workbench for images that never leave the device. The ground is cool paper, the type is ink, and photographs sit in white plates like frames on a contact sheet. Machine facts — sizes, dimensions, counts, positions, savings — are printed in mono on small spec strips, the way a lab labels a sheet. One safelight red carries the brand; each of the seven tools is a calibrated station with its own accent, but the hardware is identical everywhere.

The material discipline is narrow on purpose. Paper is the page; white is a plate placed on it; hairlines do the separating, not boxes or shadows. The display face is a single self-hosted oblique cut, used only for statements, against a neutral Chinese system sans for everything spoken at length. Color is carried by the images, not by chrome: no decorative gradients, no rounded icon tiles, no emoji or glyph icons, no shadowed cards at rest.

The home behaves like a directory/contact sheet — all seven tools visible, images first, one featured cutout plate spanning two columns. Tool pages open with their own mechanism at scale (cutout split, size delta, format switchboard, dimension readout, grid, tiled watermark, filmstrip) before asking for anything, then reveal a work bench after a file is chosen. Local processing is not a paragraph: it is a green status dot, a "0 上传" stamp, a "本地处理 · 0 上传" line in every work section, and a footer badge.

**Key Characteristics:**

- Cool paper ground, white plates, ink text; 1px rules separate sections instead of cards.
- One accent per page and a calibrated accent per tool (the cutout reuses the signal); directory cards carry their own as 3px identifiers.
- Self-hosted oblique display face for statements, system Chinese sans for prose, mono for machine facts.
- Large image plates carry all the color and the proof; no illustration or decorative imagery.
- Flat at rest; depth appears only as hover lift and one authored result settle-in.
- Local-processing proof is a visible widget on every surface.

## Colors

A cool paper-and-ink neutral field with one safelight red, six additional calibrated tool accents, and a green status channel reserved for on-device proof and measured savings. Warmth is rationed to the red, the umber and the ochre; the imagery supplies everything else.

### Primary

- **Safelight Red** (`signal`): the brand accent and the default `--accent`. It draws the current-page underline, selection, focus ring, spinner and progress fill on the home, and the AI cutout's top rule and icon. It is a signal, not a background wash; it never fills a large area.
- **Cutout Signal** (`accent-removebg`): the AI cutout's tool accent, deliberately identical to the brand red — the flagship tool carries the safelight.
- **Compress Steel Blue** (`accent-compress`): the compression page's top rule, dropzone, focus ring and progress.
- **Convert Burnt Umber** (`accent-convert`): the format-conversion page's accent.
- **Resize Deep Green** (`accent-resize`): the resize page's accent; a tool accent, not the status green.
- **Nine-Grid Ink Navy** (`accent-nine-grid`): the grid page's accent.
- **Watermark Ochre** (`accent-watermark`): the watermark page's accent.
- **Filters Wine Rose** (`accent-filters`): the filters page's accent.

The seven accents are assigned in `src/data/tools.ts` and injected as `--accent` on `<body>`; every accent-bearing rule reads that variable.

### Secondary

- **Local Green** (`local-green`): the 7px on-device dot in the header and the mobile home status line.
- **Local Green on Ink** (`local-green-dark`): the 6px footer badge dot, lightened so it reads on the dark footer.
- **Savings Green** (`saving-green`): file-size reductions, the compression delta, and the "0 上传" stamp text. This green reports a measured result.
- **Danger Red** (`danger`): the original-size readout in compare plates. Role, not hue, separates it from the safelight.

### Neutral

- **Cool Paper** (`paper`): the page ground on every surface.
- **Plate White** (`surface`): cards, demo stages, spec cards, controls, fields, and compare plates.
- **Ink** (`ink`): body text, primary buttons, footer ground, and 2px emphasis rules.
- **Soft Ink** (`ink-soft`): long-form benefit and proof copy; a touch lighter than headings.
- **Muted** (`muted`): secondary text, nav labels, labels, readouts, and descriptions.
- **Line** (`line`): section hairlines, card borders, faq rows.
- **Strong Line** (`line-strong`): form-field borders and the dashed dropzone outline.
- **Hairline** (`hairline`): internal separators inside cards, spec rows and card meta.
- **Plate Ground** (`plate`): the ground behind cover-fitted images on directory cards.
- **Recess** (`recess`): the demo-stage and preview well, one step below plate white.
- **Checker** (`checker`): the transparency checker square, paired with white for alpha results.
- **Footer Text** / **Footer Muted** / **Footer Rule** (`footer-text`, `footer-muted`, `footer-rule`): the dark footer's link, secondary and divider tones.

### Named Rules

**The One Accent Per Surface Rule.** A page declares exactly one accent for its own actions and state. Tool pages set it to the tool's color; the home keeps the signal. That accent colors the 3px hero rule, focus ring, dropzone glyph and drag border, range thumb, spinner, progress fill and related-tool squares. The home directory is the one allowed pluralism: each card carries its own tool accent as a 3px identifier. Never mix two accents inside one component, and never paint a page action with another page's accent.

**The Green Is A Witness Rule.** The status greens never decorate and never mark an action: local green says "this happened on your device", savings green says "this measurement improved". If either appears, it is reporting a fact. The resize tool's deep green accent is a separate calibration, not a status signal.

**The Paper Ground Rule.** The page is paper, never white. White is a plate placed on paper when there is content to hold. A surface with nothing to hold does not turn white.

## Typography

**Display Font:** Smiley Sans (self-hosted 63KB WOFF2 subset, SIL OFL, `font-display: swap`) with the body sans as fallback
**Body Font:** Noto Sans SC / PingFang SC / Hiragino Sans GB / Microsoft YaHei / Segoe UI
**Label/Mono Font:** system ui-monospace (SFMono-Regular, Menlo, Consolas)

**Character:** One oblique, slightly informal Chinese display face answers a neutral system sans, with mono reserved for spec readouts. The result reads like a printed sheet annotated by hand, not a dashboard. The display face is always weight 400 — its lean is in the cut, not in a synthesized style.

### Hierarchy

- **Display** (400; clamp(38px, 4.6vw, 58px) home, clamp(34px, 4.2vw, 52px) tool pages, clamp(48px, 8vw, 88px) 404; line-height ~1): every H1, the home line "图片不出本机。" at clamp(19px, 2vw, 24px), the 404 statement. Negative tracking is part of the style rule.
- **Headline** (400; 22px work-section heads, 23px FAQ, clamp(26px, 3vw, 36px) proof): section statements and the "文件没有离开这台设备。" claim.
- **Title** (400; 19px, line-height 1.2): directory card titles; the featured card scales to clamp(26px, 2.6vw, 34px). The title is a statement, so it takes the display face.
- **Body** (400; 15px, line-height 1.65): all prose, at 13–15px in dense UI and 12.5px for card descriptions. Measure caps at 54–58ch in heroes, 78ch in FAQ answers.
- **Label** (600; 10.5px, 0.16em tracking, muted, no uppercase): section labels such as "常用入口", "接着做下一件事", footer column headings. Chinese labels are tracked, not uppercased.
- **Readout** (400, mono; 10.5–13px): plate annotations, spec rows, file sizes, dimensions, counts, step numbers, compare metadata. Tracking 0.05–0.12em; the file's own fact, never a sentence.
- **Action** (700; 14px): buttons and outlined CTAs.

### Named Rules

**The Two Pens Rule.** Display face for statements, mono for facts, system sans for anything read at length. Never set a sentence in mono; never set a number a user might verify in the display face.

**The No Synthetic Display Rule.** The display face ships one oblique 400 cut. Never bold, italicize, or letterspace it. If the WOFF2 fails, fall back to the body sans stack — never to a system display or serif face.

## Layout

A single 1240px container with 28px side gutters (16px under 760px) sits on the paper ground; the layout is a set of ruled horizontal bands rather than a card dashboard.

- **Home hero:** two columns at 1.5fr / 0.5fr with a 40px gap, end-aligned, 38px top and 24px bottom padding. The narrow column is the local-status spec card (260px minimum). Below 1080px it collapses to one column with the spec card capped at 420px; below 760px the spec card is hidden and a one-line mono status takes its place.
- **Filter bar:** a full-width band ruled 1px ink on top and 1px line on the bottom, filter chips left, mono count right. The selected chip inverts to ink.
- **Directory:** three equal columns, 12px gap. The removebg card spans two columns as a horizontal featured card; the filters card spans two columns as a horizontal wide card with a filmstrip plate. At 1080px the grid drops to two columns and both span cards stack their plates above the text; at 760px everything is a single column. Cards keep a 16:10 plate; horizontal cards hold a 280px minimum plate height.
- **Tool page:** 26px top padding, a 12px breadcrumb, then a `5fr / 7fr` hero split with a 40px gap, led by a 3px accent rule and 22px of air. The work section uses a `4fr / 8fr` grid with a 14px gap, collapsing to one column at 1080px; nine-grid uses a single stacked column at every width.
- **Vertical rhythm:** major sections sit 46–54px apart and open with 18–22px of air under their rule; the footer starts 72px below the last section (48px on mobile).
- **Breakpoints:** 1080px (two-column directory, single-column heroes), 760px (single-column everything, scrollable nav), 420px (format switchboard stacks, featured title clamps to 24px).

### Named Rules

**The Rule-Before-Section Rule.** Every major section opens with a horizontal rule and its air, not a box: 1px `line` for ordinary boundaries, 2px ink for claims and stats (proof, compression delta, spec-card header), 3px accent for the tool hero. Sections are ruled, never wrapped in cards.

**The Plate-Scale Rule.** Image plates hold their scale: 430px minimum hero stages on desktop, 300px on mobile, directory plates at 16:10. Shrink the frame, never crop the proof; use `contain` when the result must not be cut.

## Elevation & Depth

The system is flat at rest and tonal in depth. Paper sits under white, white sits over recess, and alpha sits on the checker; 1px lines do the separation. There are no ambient shadows, no hard offset shadows, and no shadowed cards at rest. Depth appears only as a state response: a lifted hover card, one lifted preview plate, and the settle-in of result plates.

### Shadow Vocabulary

- **Hover lift** (`box-shadow: 0 12px 26px rgba(18,20,23,.08)`): directory cards on pointer hover, paired with an ink border and a -2px translate.
- **Preview lift** (`box-shadow: 0 14px 30px rgba(18,20,23,.12)`): the nine-grid plate only, so the image reads as sitting above the stage.
- **Divider halo** (`box-shadow: 0 0 0 1px rgba(0,0,0,.18)`): the 2px white split handle over cutout imagery.
- **Target ring** (`box-shadow: inset 0 0 0 1px var(--accent)`): the selected format card, added to its accent border.
- **Current nav** (`box-shadow: inset 0 -2px 0 var(--accent)`): the active header item.

### Motion

One authored moment: when a work section first appears, its result plates settle in with a 280ms rise of 6px (`cubic-bezier(.2,.7,.2,1)`), the second plate delayed 60ms. Everything else is functional: 150ms color/border transitions, a 200ms progress fill, an 800ms spinner, and smooth scroll to the revealed work area. The reduced-motion guard disables the settle-in and smooth scroll and near-zeroes all durations.

### Named Rules

**The Flat-At-Rest Rule.** No chrome — header, card, control, panel — carries a shadow while idle. The only at-rest shadow is the single lifted nine-grid preview plate; otherwise a visible shadow means pointer hover.

**The One Authored Moment Rule.** Motion may dramatize one thing only: the result arriving. Do not add entrance animations, parallax, or animated illustrations.

## Shapes

Precise, rectilinear hardware. Framed surfaces take a 2px radius; plates, stages, dropzones, spec cards, compare plates, related links and footer badges stay square. Borders are 1px (`line`, or `line-strong` for fields); the dropzone uses a 1.5px dashed `line-strong` outline. The only circles are the 6–7px status dots and the 16px spinner. Emphasis rules are straight and horizontal: 3px accent for the tool hero, 2px ink for claims and stats.

The upload glyph sits in a 42px square, 1px-bordered well with an accent-colored 20px inline SVG (1.6 stroke). This is the one permitted icon tile: square, outlined, unfilled — never rounded, filled, or tinted with a tool wash.

**The Two-Pixel Rule.** Framed surfaces get 2px at most; circles are reserved for live status and the spinner. A pill or a 4px+ card radius reads as a different product. (Runtime note: `nine-grid.js` applies 4px to preview thumbnails; that is uncanonized drift, not a pattern to copy.)

## Components

### Header

A sticky 64px bar on paper at 94% opacity with an 8px backdrop blur and a 1px `line` bottom edge. The brand is a 22px inline SVG document mark (outline with a solid square) plus the 21px/800 wordmark "PixTools" and a 10.5px tracked "图片工具" subtitle after a 1px divider. Seven 13px nav labels in `muted` sit at the right with 7px 9px padding and a 2px radius; hover turns the label ink on a white rectangle, and the current page keeps ink with a 2px accent inset underline. The local status is a 7px green dot plus 11px tracked "本地处理" behind a 1px left rule.

The name PixTools is a working name (final naming is unlocked); the durable part is the construction — document mark, heavy sans wordmark, tracked subtitle — not the name itself. Below 760px the brand and nav wrap: the nav becomes a full-width horizontally scrollable row, the subtitle and header status hide, and there is no hamburger.

### Footer

A dark ink slab 72px below the content (48px on mobile), 44px top and 22px bottom padding, with a 1.5fr + three 1fr column grid. The brand repeats the document mark and wordmark in white; the paragraph below is 13px in a lighter muted tone, capped at 32ch. Column headings are 10.5px, 0.18em tracked, `footer-muted`; links are 13px `footer-text` with 4px vertical padding and turn white on hover. The bottom bar is separated by a 1px `footer-rule`, set at 12px, and carries the copyright, the 1px-outlined "0 上传 · 0 账号" badge with its 6px green dot, and home/sitemap links. At 760px the grid becomes two columns with the brand spanning both.

### Home Hero and Local-Status Card

The H1 is the display face; the line "图片不出本机。" follows at display scale, then a 15px muted paragraph capped at 58ch with the phrase "免费、无账号、无水印" in ink 700.

The status card is a white plate with a 1px `line` border, 18px 20px padding, and no radius. Its header row is mono 10.5px with 0.12em tracking over a 2px ink bottom rule, carrying the "0 上传" stamp (mono 10.5px, savings green, pale green wash with a soft green border). Five 13px rows below are separated by `hairline` rules: 处理位置, 上传, 账号, 次数, 费用. This card is the brand's argument in the first viewport; on mobile it is replaced by the one-line mono status "运行状态 · 0 上传 · 0 账号" with the green dot.

### Filter Bar and Tool Directory

The filter bar is a 1px-ink / 1px-line band with 13px chips at 6px 11px and a 2px radius; unselected chips are muted with a transparent border, hover adds a `line` border, and the selected chip is ink with white text. The mono count sits at the far right.

Every tool card is a white plate with a 1px `line` border, 2px radius, and a 3px accent rule across its top. The plate is 16:10 with a cover image on `plate` ground; a mono annotation chip or a white bordered size chip sits over the image; the watermark card adds a rotated, tiled "© 示例" overlay; the filters card uses a three-frame filmstrip. The removebg card is the featured card: two columns, the cutout split plate on the left (with a 2px white divider and "原图" / "透明 PNG" tags), title and copy on the right, plus an outlined "打开工具 →" CTA. The filters card is the wide card: filmstrip plate left, body right. The card body is 13px 15px 15px; the title is the display face at 19px (featured 26–34px); the description is 12.5px muted, clamped to two lines (three when featured); the meta bar is a `hairline`-topped mono 10.5px line reading "category · metric" with a right arrow. Hover: ink border, soft lift, -2px translate.

### Tool Page Shell

A 12px breadcrumb ("全部工具 / category / tool") in muted with muted separators, then the hero: a 3px accent top rule, 22px of air, a `5fr / 7fr` split, and a 40px gap. The H1 is the display face; the benefit paragraph is 15px/1.7 in soft ink, capped at 54ch, with key promises in ink 700. The right column is always the tool's own demo stage, never a generic upload illustration.

### Dropzone

A square white field with a 1.5px dashed `line-strong` outline, 20px padding, and no radius, holding a 42px square outlined icon well with the accent upload glyph, a 14.5px bold instruction, and a 12px muted format line. Hover and drag-over turn the outline accent. The whole field is a `role="button"`, `tabindex="0"` control (Enter/Space opens the picker); the native file input is hidden.

### Per-Tool Hero Plates

Each stage is a white 1px `line` plate with a 430px minimum height (300px mobile) and a mono 10.5px annotation at 12px 12px.

- **Cutout:** a two-column split, the result half on the transparency checker, separated by a 2px white handle with a thin dark halo; dark "原图" tag and white "透明 PNG" tag.
- **Compress:** two stacked file cards (the second on a pale green wash with a savings-green size), mono format chips, a 2px ink rule, then a 44px mono "-28%" in savings green with a 12px explanation and a 6px rail.
- **Convert:** two 32px mono extension cards with a 44px mono arrow between them; the target card takes the accent border plus inset ring; format chips and a three-fact strip below.
- **Resize:** a 34px mono dimension line ("1200 × 800 → 800 × 533"), a dashed accent frame around the resized image, and a mono caption "宽高比不变 / 双三次插值".
- **Nine-grid:** a `recess` ground with a centered image plate carrying the preview lift, and mono 2×2 / 3×3 / 4×4 tabs at the top right (selected tab ink).
- **Watermark:** a dark media stage with the photo at 0.92 opacity under a rotated 4×4 tiled overlay at 0.7, plus a 3×3 position pad in the lower right (selected cell white).
- **Filters:** a 1.25fr / 0.75fr split with the large preset plate left and a six-cell vertical filmstrip right, each cell mono-labeled; at 760px the split stacks and the strip becomes three columns of 100px rows.

### Work Section

Hidden until a file is chosen, then revealed and scrolled into view. It opens with a 1px top rule, 22px of air and a head: 22px display heading plus a mono "本地处理 · 0 上传" status at the right. The bench is a `4fr / 8fr` grid: a white controls rail (1px border, 16px padding, 14px gaps) facing result plates (12px gap).

- **Controls:** 12px muted labels with the live value in mono ink; 38px fields with 1px `line-strong`, 2px radius, 10px padding; selects stay native; range inputs use `accent-color: var(--accent)` at 24px height; the primary action is full-width ink. The rail can collapse to one column (nine-grid) or disappear entirely (cutout, where the compare and download row stand alone).
- **Compare plates:** white, 1px `line`, 10px padding, with a 10.5px tracked muted heading. Media is capped at 440px and `object-fit: contain` on a `recess` well with a 1px pale border; alpha results use the checker. Metadata is mono 11px; original sizes take `danger`, new sizes take savings green.
- **Status and errors:** the status bar is a white 1px strip with a 16px spinner (2px border, accent top), a 4px track, an accent fill, and 12px muted text, announced with `aria-live="polite"`. Errors are a pale red panel with a 1px soft red border in dark red 13px text.

### Steps, FAQ, Related

Steps sit 48px below with a 1px top rule: three columns, a 26px mono number gutter, 14px bold titles, and 12.5px muted copy; one column on mobile. FAQ uses native `<details>` rows separated by 1px lines, with the first open: 14.5px 600 summaries, a mono "+"/"−" indicator, and 13.5px/1.75 answers capped at 78ch. Related links are white 1px chips at 7px 11px with a 7px accent square; hover darkens the border.

### 404

The display face at clamp(48px, 8vw, 88px) and 0.98 line-height over a 46ch muted paragraph, left-aligned in a 56vh minimum column, followed by the standard ink primary button.

### Local Proof

The same fact is stated in five widgets: the header green dot with "本地处理", the mobile home status line, the home spec card's "0 上传" stamp, the "本地处理 · 0 上传" line in every work head, and the footer badge. Removing all of them would make the page indistinguishable from a server-based competitor.

### Named Rules

**The Local Proof Rule.** Locality is a visible state, not a claim in prose. Every page carries a status widget in the header (desktop) or footer badge; every tool page repeats it as "本地处理 · 0 上传" in the work section and states "图片不离开本机" at the dropzone.

**The Work Bench Rule.** Controls and results never share a visual style: controls are a rail of 38px fields, results are image plates at scale. Do not shrink the result to make room for the form.

## Do's and Don'ts

### Do:

- **Do** ground every page in paper (`paper`) and reserve white for plates and controls that hold content.
- **Do** declare one accent per page and use it through the calibrated set: 3px hero rule, focus ring, dropzone glyph and drag border, range thumb, spinner, progress, related squares; on the home, let each card carry its own tool accent as a 3px identifier.
- **Do** lead with the image plate; every card and hero shows a real or real-derived result before it asks for anything.
- **Do** set machine facts — sizes, dimensions, counts, positions, step numbers — in mono at 10.5–13px, and set statements in the display face at 400.
- **Do** use 2px radii, 1px rules, 44px primary actions, and 38px fields.
- **Do** state locality in the interface on every page and in every work section.
- **Do** keep the display face's oblique as-is; let the cut carry the voice.
- **Do** honor visible focus (2px accent outline, 2px offset), the skip link, keyboard-operable dropzones, and reduced motion.

### Don't:

- **Don't** use decorative gradients; the only gradient in the system is the transparency checker.
- **Don't** use rounded icon tiles, filled icon badges, emoji icons, or glyph fonts. The only icon tile is the 42px square, 1px-outlined upload well; icons are inline SVG at 1.6–1.7 stroke.
- **Don't** add ambient shadows or hard offset shadows; the only at-rest shadow in the system is the single lifted nine-grid preview plate, and card lift exists only on hover.
- **Don't** place a second accent on a tool page, and never use the status greens for an action or a brand moment; the resize tool's deep green accent is the only green allowed to mark action, and it never doubles as status.
- **Don't** set prose in mono or the display face, and never synthesize weight or italic on the display face.
- **Don't** use pill radii or rounded cards above 2px; circles belong to status dots and the spinner only.
- **Don't** wrap sections in cards or add background bands; use the rule-plus-air rhythm.
- **Don't** invent marketing proof. The only quantitative claims available are the local-processing zeros and the demonstrated file deltas.
