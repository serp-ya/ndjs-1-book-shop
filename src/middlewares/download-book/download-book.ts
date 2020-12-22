import multer from 'multer';
import {
  BOOKS_AVAILABLE_FILETYPES,
  BOOKS_FILE_FIELDNAME,
  BOOKS_FOLDER_PATH,
} from './download-book-constants';
import { generateSecretFilename } from './download-book-utils';

const downloadBooksFileFilter = (req, file, cb) => {
  const fileIsAvalibleByType = BOOKS_AVAILABLE_FILETYPES.some(availableType => (
    availableType === file.mimetype
  ));

  cb(null, fileIsAvalibleByType);
};

const downloadBooksStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, BOOKS_FOLDER_PATH),
  filename: (req, file, cb) => (
    cb(
      Object.values(req.body).length !== 0
        ? null
        : new Error('Can\'t to handle request (empty body)'),
      generateSecretFilename(file.originalname, req.body),
    )
  ),
});

export const downloadBooksMiddleware = multer({
  fileFilter: downloadBooksFileFilter,
  storage: downloadBooksStorage,
}).single(BOOKS_FILE_FIELDNAME);
