import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export const fileUploadOptions: MulterOptions = {
  storage: diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => {
      const randomName = Math.random().toString(36).slice(2);
      cb(null, `${randomName}_${file.originalname}`);
    },
  }),
};
