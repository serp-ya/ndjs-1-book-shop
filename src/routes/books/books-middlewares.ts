import multer from 'multer';
import {
  BOOKS_AVAILABLE_FILETYPES,
  BOOKS_FILE_FIELDNAME,
  BOOKS_FOLDER_PATH,
} from './books-constants';
import { generateUniqueFilename } from './books-utils';

const downloadBooksFileFilter = (req, file, cb) => {
  const fileIsAvalibleByType = BOOKS_AVAILABLE_FILETYPES.some(availableType => (
    availableType === file.mimetype
  ));

  cb(null, fileIsAvalibleByType);
};

const downloadBooksStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, BOOKS_FOLDER_PATH),
  filename: (req, file, cb) => cb(null, generateUniqueFilename(file.originalname)),
});

export const downloadBooksMiddleware = multer({
  fileFilter: downloadBooksFileFilter,
  storage: downloadBooksStorage,
}).single(BOOKS_FILE_FIELDNAME);
