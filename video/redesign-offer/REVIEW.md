# REVIEW — redesign-offer (44 s, 1920×1080, 30 fps)

## Creative calls

- **Storyline built:** problem → cost → offer → proof → CTA. Captions carry the whole message
  (16 caption groups, no voiceover), and each beat is backed by a b-roll photo or a drawn
  demo. Other storylines considered but not built: a testimonial-led cut (needs real client
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

## Measured vs looked at

- `hyperframes check`: passes, 0 errors. One lint warning is left on purpose
  (`duplicate_media_discovery_risk`: the same café photo is used in the mockup card and in the
  new-site hero).
- Looked at the review sheets (beats, every seam, phone width at 360 px). Every caption reads at
  phone width. The old-site body text does not, and doesn't need to: it is texture there.
- Sound: 18 SFX hits (whooshes on transitions, pops on stamps/LIVE chips, clicks on cursor
  clicks, one riser → impact on the FREE badge). Each was placed from its measured peak.
  **Measured, not heard.** There is **no music bed**: this environment has no music source
  (no HeyGen sign-in, no local MusicGen). To add one, drop a track in `assets/` and add an
  `<audio id="bgm" data-volume="0.25" data-fade-in="0.4" data-fade-out="1.5">` to `index.html`.

## Weakest shot / next steps

- s3 (11.6–15.6 s) is the thinnest beat: one photo plus a tab being closed. A real analytics
  screen or a real bounce moment would hit harder.
- "Corner Café" is a fictional sample business. Swapping in a real client's before/after
  (screenshots of their old site and the live redesign) would make s2/s5 proof instead of
  illustration.
- No logo or brand name is on the end card because none was supplied. Add the agency mark
  to s7 when available.
