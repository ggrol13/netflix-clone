import { HttpException, HttpStatus } from '@nestjs/common';

export const multer = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|mp4|plain)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: 1,
            error: '지원하지 않는 형식입니다.',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
};
