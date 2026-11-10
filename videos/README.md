# Explainer reels (HyperFrames)

Two portrait (1080×1920, 30 fps) Facebook Reel explainers for beginner web builders,
built with [HyperFrames](https://hyperframes.heygen.com). Each has an American English
voiceover (Kokoro `af_heart`, on-device) and burned-in running captions with
word-by-word highlighting.

| Project | Topic | Length |
| --- | --- | --- |
| `hosting-explainer/` | Which hosting to choose for a client: shared, static, VPS, managed WordPress, cloud, plus a quick decision guide | ~76 s |
| `github-explainer/` | What GitHub and a repository are: version control, commits, backup, recover, clone, feature branches, pull requests, teamwork | ~69 s |

Rendered files: `renders/hosting-explainer-reel.mp4`, `renders/github-explainer-reel.mp4`.

## How it is built

- `script.json`: the voiceover, one entry per scene. Edit the words here.
- `../_tools/voice.mjs`: makes each scene's voice line (`hyperframes tts`), gets word timings
  (`hyperframes transcribe`, whisper `small.en`), lines them up with the script words, and
  joins them into `assets/voice/voiceover.wav` plus `timing.json`.
  Delete `assets/voice/*.wav` before re-running after a script change.
- `scenes.mjs`: the visuals for each scene. Animations are keyed to spoken words
  (`T("word")`), so they stay in sync when the voice changes.
- `../_tools/build.mjs`: writes `index.html`, `compositions/<scene>.html` and
  `compositions/captions.html` (caption groups of up to four words, active word highlighted).

```bash
cd hosting-explainer            # or github-explainer
node ../_tools/voice.mjs        # needs: pip install kokoro-onnx soundfile
node ../_tools/build.mjs
npx hyperframes@0.9.27 check
npx hyperframes@0.9.27 preview  # edit in the Studio
npx hyperframes@0.9.27 render -o ../renders/<name>.mp4
```

Sound effects are the Pixabay-licensed files bundled with HyperFrames. There is no music
bed; add one as an `<audio>` clip in `index.html` at about `data-volume="0.14"`.
Brand marks come from the Simple Icons package.
