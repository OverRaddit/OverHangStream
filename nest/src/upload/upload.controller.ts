import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/*
FileInterceptor의 역할은? http로 첨부된 파일을 파일구조체에 타입에 담아 uploadFile에 주입해준다.
- localOptions
  - storage
    - destination : 업로드 폴더
    - filename : 파일명
  - fileFilter
    - 파일형식 검증가능
*/

@Controller('upload')
export class UploadController {
  @Post()
  // @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`); // 확장자 추가
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // const uploadParams = {
    //   Bucket: process.env.AWS_S3_BUCKET,
    //   Key: `videos/${file.originalname}`,
    //   Body: file.buffer,
    //   ACL: 'public-read', // 필요에 따라 수정
    // };

    // await s3.send(new PutObjectCommand(uploadParams));
    console.log('file:', file);
  }
}
