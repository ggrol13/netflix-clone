import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import * as AWS from 'aws-sdk';
import * as path from 'path';
import { diskStorage } from 'multer';

@Injectable()
export class UploadService {
  private readonly client: S3Client;

  constructor(private configService: ConfigService) {}

  async uploadFiles(files: Array<Express.Multer.File>, route: string) {
    const s3 = new AWS.S3({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_Key'),
      },
    });
    try {
      const url = [];
      files.map(async (file) => {
        const key = uuidv4() + path.extname(file.originalname);
        url.push(key);
        await s3
          .putObject(
            {
              Key: key,
              Body: file.buffer,
              Bucket: this.configService.get('AWS_S3_BUCKET_NAME') + route,
            },
            (err) => {
              if (err) {
                throw err;
              }
            },
          )
          .promise();
      });
      // // AWS 객체 생성

      return url;
    } catch (error) {
      console.log(error);
    }
  }
}
