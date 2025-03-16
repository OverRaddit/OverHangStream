import { Controller, Get, Query } from '@nestjs/common';

@Controller('stream')
export class StreamController {
  @Get()
  getStreamUrl(@Query('filename') filename: string) {
    return {
      url: `https://video-streaming.cloudfront.net/hls/${filename}/index.m3u8`,
    };
  }
}
