import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import * as AWS from 'aws-sdk';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly client: S3Client;

  constructor(private configService: ConfigService) {}

  async uploadFiles(
    files: Array<Express.Multer.File>,
    route: string,
    name: string,
  ) {
    const filesByName = files[`${name}`].filter((file) => file);
    const s3 = new AWS.S3({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_Key'),
      },
    });
    try {
      const urls = await Promise.all(
        filesByName.map((file) => {
          const key = uuidv4() + path.extname(file.originalname);
          s3.putObject(
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
          );
          return key;
        }),
      );

      return urls;
    } catch (error) {
      throw error;
    }
  }
}
