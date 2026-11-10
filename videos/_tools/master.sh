#!/bin/bash
# Two-pass loudness normalisation of a rendered MP4 to -15 LUFS / -1.5 dBTP (video copied).
# Usage: master.sh in.mp4 out.mp4
set -e
in="$1"; out="$2"
stats=$(ffmpeg -hide_banner -nostats -i "$in" -af loudnorm=I=-15:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
get() { echo "$stats" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -hide_banner -loglevel error -y -i "$in" -c:v copy -af "loudnorm=I=-15:TP=-1.5:LRA=11:measured_I=$(get input_i):measured_TP=$(get input_tp):measured_LRA=$(get input_lra):measured_thresh=$(get input_thresh):offset=$(get target_offset):linear=true,aresample=48000" -c:a aac -b:a 192k -movflags +faststart "$out"
ffmpeg -hide_banner -nostats -i "$out" -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I|Peak):"
