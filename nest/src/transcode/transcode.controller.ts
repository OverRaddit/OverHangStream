import { Controller, Post, Body } from '@nestjs/common';
import { exec } from 'child_process';

@Controller('transcode')
export class TranscodeController {
  @Post()
  async transcode(@Body() body) {
    const inputPath = `/mnt/videos/${body.filename}`;
    const outputPath = `/mnt/hls/${body.filename}`;

    exec(
      `docker run --rm -v /mnt/videos:/input -v /mnt/hls:/output video-transcoder /input/${body.filename} /output/${body.filename}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${stderr}`);
        } else {
          console.log(`Success: ${stdout}`);
        }
      },
    );

    return { message: 'Transcoding started' };
  }
}
