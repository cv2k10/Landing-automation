# REVIEW — redesign-offer (45.5 s, 1920×1080, 30 fps)

## Creative calls

- **Storyline built:** problem → cost → offer → proof → CTA. Captions carry the whole message
  together with an American male voiceover (19 caption groups, each timed to the line it
  captions), and each beat is backed by a b-roll photo or a drawn demo. Other storylines considered but not built: a testimonial-led cut (needs real client
  quotes) and a pure before/after slider film (loses the "it's a real, working site" point).
- **The differentiator gets the most screen time** (s5, 10.2 s): a "redesign-mockup.jpg"
  picture is struck through, then it turns into a real browser. The old site is rebuilt as the
  new one under a scan line, and a cursor *uses* it (Menu click scrolls the page; Book a table
  shows a confirmation). That makes "not just an image, a real live website" visible.
- **Look:** real photographs plus printed "sticker" captions: ink box, white uppercase Archivo
  Black, one highlighted word on signal yellow #FFD23F. Yellow is also the ground of the drawn
  scenes, and the FREE badge grows to become that ground.
- **Transitions:** hard-cut montage (hook), a whip out of the old site, the FREE badge growing
  into the next scene, a card morphing into a browser, a zoom-through out of the browser, and an
  iris onto the end card.

## Voiceover

Local Kokoro-82M, voice `am_michael` (American male), speed 1.05, one file per line. Each
line was trimmed, levelled to about -17 LUFS, and placed so the picture lands on the word:

| Film time | Line | Lands on |
| --- | --- | --- |
| 0.35 | Calling all business owners! | hook montage |
| 5.5 | Is your website holding you back? | old site rises in |
| 7.55 / 8.5 / 9.25 | Outdated. / Slow. / Not mobile-friendly. | each stamp slams on its word |
| 11.85 | Customers decide in seconds. | |
| 13.75 | And then, they're gone. | tab closes on "gone" (14.35) |
| 15.75 | Now's your chance. | |
| 16.9 / 18.85 | Get a brand-new redesign. Fast, / and free! | FREE badge on "free" (~19.1) |
| 21.0 | And it's not just a redesign image. | mockup struck through |
| 23.55 | We take your existing website, | old site in the browser |
| 25.45 | and rebuild it as a real, live site. | scan rebuild; LIVE pill on "live" |
| 28.0 | Click it. Use it. Launch it. | Menu click, then Book click |
| 31.3 / 33.1 / 34.9 | Fully functional. / Mobile-ready. / Live on the web. | phone in; LIVE chip |
| 36.85 | Your new website is waiting. | high five |
| 39.25 | Redesigned and live. Fast and free. | end card headline |
| 41.9 | Reply "redesign" to claim yours today. | cursor clicks the CTA (42.4) |

The final mix was loudness-normalised to -15 LUFS / -1.5 dBTP (no clipping, measured).

## Measured vs looked at

- `hyperframes check`: passes, 0 errors. One lint warning is left on purpose
  (`duplicate_media_discovery_risk`: the same café photo is used in the mockup card and in the
  new-site hero).
- Looked at the review sheets (beats, every seam, phone width at 360 px). Every caption reads at
  phone width. The old-site body text does not, and doesn't need to: it is texture there.
- Sound: voiceover plus 16 SFX hits (whooshes on transitions, pops on stamps/LIVE chips, clicks on cursor
  clicks, one riser → impact on the FREE badge). Each was placed from its measured peak.
  **Measured, not heard.** There is **no music bed**: this environment has no music source
  (no HeyGen sign-in, no local MusicGen). To add one, drop a track in `assets/` and add an
  `<audio id="bgm" data-volume="0.25" data-fade-in="0.4" data-fade-out="1.5">` to `index.html`.

## Weakest shot / next steps

- The hook (2.0–5.1 s) has about 3 s with no voice while the owner montage plays; a music bed
  would fill it.
- Kokoro is a free local voice: clear and natural, but less expressive than a premium voice
  (HeyGen / ElevenLabs). Re-voicing only means swapping the 20 files in `assets/vo/`.
- s3 (11.6–15.6 s) is the thinnest beat: one photo plus a tab being closed. A real analytics
  screen or a real bounce moment would hit harder.
- "Corner Café" is a fictional sample business. Swapping in a real client's before/after
  (screenshots of their old site and the live redesign) would make s2/s5 proof instead of
  illustration.
- No logo or brand name is on the end card because none was supplied. Add the agency mark
  to s7 when available.
