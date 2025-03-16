import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController } from './upload/upload.controller';
import { TranscodeController } from './transcode/transcode.controller';
import { StreamController } from './stream/stream.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './myupload',
    }),
  ],
  controllers: [
    AppController,
    UploadController,
    TranscodeController,
    StreamController,
  ],
  providers: [AppService],
})
export class AppModule {}
