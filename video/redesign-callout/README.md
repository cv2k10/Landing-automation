# Redesign Callout — kinetic-type promo (HyperFrames)

A 38-second, 1920×1080 call-out ad for business owners: **big centred text, drawn icons and
illustrations, an American male voiceover and an original music bed.** No photos or other
third-party images: every icon and illustration is drawn in SVG/CSS in the scene files.

Rendered file: `renders/redesign-callout.mp4`

## Script (voiceover = on-screen text)

| Time | Line | On screen |
| --- | --- | --- |
| 0.4 | Hey, business owner! | megaphone calls out |
| 2.05 | Yes, you! | giant YOU! in a burst |
| 3.6 | When did your website last get an upgrade? | calendar rolls back to 2014 |
| 6.8 / 8.35 / 10.35 | Slow pages. / Tiny text on phones. / Customers clicking away. | snail + loading bar / phone + magnifier / cursor leaves the site |
| 12.2 | Every day it stays that way, you're losing business. | customers walk out one by one |
| 15.8 | So here's our offer. | gift box pops open |
| 17.35 / 18.85 | We'll redesign your website, / for free! | new website rises out of the box / $0 tag |
| 20.85 | Not just a pretty picture. | picture of a site, crossed out |
| 22.75 | A real, live, working website, built from the one you already have. | LIVE browser; old site → arrow → new site |
| 27.45 / 28.35 / 29.45 | Fast. / Mobile-ready. / Ready to launch. | lightning / phone ✓ / rocket takes off |
| 31.2 | Don't wait. Claim your free redesign today. | alarm clock, then the headline |
| 34.0 | Reply "redesign" now! | button is clicked, "REDESIGN ✓✓ Sent" |

## Edit & re-render

```bash
cd video/redesign-callout
npx hyperframes@0.8.221 preview      # Studio editor in the browser
npm run check
npx hyperframes@0.8.221 render -o renders/redesign-callout.mp4
```

| File | What |
| --- | --- |
| `compositions/s1-hey.html` … `s8-cta.html` | One scene each (text, illustrations, motion) |
| `index.html` | Scene timing, brand colours, voiceover, music, sound effects |
| `assets/vo/l01–l17.wav` | Voiceover lines (Kokoro `am_michael`) |
| `assets/bgm/bed.mp3` | Music bed |

Re-voice a line: `npx hyperframes@0.8.221 tts "New line" -v am_michael -s 1.08 -o assets/vo/l05.wav`
(needs `pip install kokoro-onnx soundfile`), then update its `data-duration` in `index.html` and
the matching on-screen words in the scene file.

## Credits

- Voiceover: Kokoro-82M (Apache-2.0), voice `am_michael`, generated locally.
- Music: original track generated locally with Meta MusicGen (`facebook/musicgen-small`),
  then looped and levelled. **The MusicGen weights are licensed CC-BY-NC 4.0 (non-commercial),
  so treat this bed as a placeholder:** before running the ad commercially, replace
  `assets/bgm/bed.mp3` with a track you hold a commercial licence for (same file name, re-render).
- Sound effects: HyperFrames bundled set (Pixabay Content License).
- Illustrations: drawn in code for this video.
