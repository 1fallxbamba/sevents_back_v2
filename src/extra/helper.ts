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

export function generateCustomID(forWhat: string) {
  if (forWhat === 'S') {
    // Sevent
    return 'SS_' + Math.random().toString(36).substring(2, 14).toUpperCase(); // SS = Sevent Sevent
  } else if (forWhat === 'U') {
    // User
    return 'SU_' + Math.random().toString(36).substring(2, 14).toUpperCase(); // SU = Sevent User
  } else if (forWhat === 'T') {
    // Ticket
    return 'STKT_' + Math.random().toString(36).substring(2, 14).toUpperCase(); // STKT = Sevent Ticket
  }
}

export function encryptPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(given: string, crypted: string) {
  return bcrypt.compare(given, crypted);
}
