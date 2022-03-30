import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import { diskStorage } from 'multer';

import * as bcrypt from 'bcrypt';

export const fileUploadOptions: MulterOptions = {
  storage: diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => {
      const randomName = Math.random().toString(36).slice(2);
      cb(null, `${randomName}_${file.originalname}`);
    },
  }),
};

export function encryptPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(given: string, crypted: string) {
  return bcrypt.compare(given, crypted);
}
