# Redesign Offer — promo video (HyperFrames)

A 44-second, 1920×1080 captioned promo aimed at business owners whose website needs a refresh:
**we rebuild your existing site as a real, fully functional, live website — fast and free —
not just a redesign image.**

Rendered file: `renders/redesign-offer.mp4`

## Edit & re-render

Requires Node 22+ and FFmpeg.

```bash
cd video/redesign-offer
npx hyperframes@0.8.221 preview      # Studio editor in the browser (live preview)
npm run check                        # lint + layout + motion audit
npx hyperframes@0.8.221 render -o renders/redesign-offer.mp4
```

## What's where

| File | Scene | Time |
| --- | --- | --- |
| `compositions/s1-hook.html` | "Calling all business owners" — owner montage | 0.0–5.2 s |
| `compositions/s2-problem.html` | Old website + OUTDATED / SLOW / NOT MOBILE-FRIENDLY | 5.2–11.6 s |
| `compositions/s3-seconds.html` | Visitor closes the tab — "Customers decide in seconds" | 11.6–15.6 s |
| `compositions/s4-reveal.html` | "Fast & free" — 100% FREE badge | 15.6–20.8 s |
| `compositions/s5-real.html` | Mockup image ✗ → real live site, rebuilt and clicked | 20.8–31.0 s |
| `compositions/s6-proof.html` | Fully functional / mobile-ready / live | 31.0–36.6 s |
| `compositions/s7-cta.html` | End card + call to action | 36.6–44.0 s |
| `compositions/captions.html` | Every caption group (edit wording/timing here) | 0–38.9 s |
| `index.html` | Scene hosts, brand colours, sound effects | — |

Easy changes:

- **Caption text:** edit the words in `compositions/captions.html`; `class="w hl"` marks the
  yellow highlighted word.
- **CTA wording:** the `cta-text` and `subline` variables in `compositions/s7-cta.html` (also
  editable in Studio's Variables panel).
- **Colours:** the `--color-*` variables in `index.html`.
- **Sample domain/business:** search for `yourbusiness.com` / `Corner Café`.

See `SPEC.md` for the shot-by-shot plan, `REVIEW.md` for review notes, `CREDITS.md` for media
licences.
