#!/bin/bash
INPUT_FILE=$1
OUTPUT_DIR=$2

mkdir -p $OUTPUT_DIR

ffmpeg -i $INPUT_FILE \
  -map 0:v -map 0:a \
  -c:v libx264 -crf 23 -preset veryfast \
  -b:v:0 5000k -maxrate:v:0 5500k -bufsize:v:0 10000k \
  -s:v:0 1920x1080 \
  -b:v:1 2500k -maxrate:v:1 2750k -bufsize:v:1 5000k \
  -s:v:1 1280x720 \
  -b:v:2 1000k -maxrate:v:2 1100k -bufsize:v:2 2000k \
  -s:v:2 854x480 \
  -f hls \
  -hls_time 4 \
  -hls_playlist_type vod \
  -hls_segment_filename "$OUTPUT_DIR/%v/segment_%03d.ts" \
  $OUTPUT_DIR/%v/index.m3u8
