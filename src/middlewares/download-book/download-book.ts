import multer from 'multer';
import { v4 as uuid } from 'uuid'
import {
  BOOKS_AVAILABLE_FILETYPES,
  BOOKS_FILE_FIELDNAME,
  BOOKS_FILENAME_DELIMETER,
  BOOKS_FOLDER_PATH,
} from './download-book-constants';

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
      [uuid(), file.originalname].join(BOOKS_FILENAME_DELIMETER)
    )
  ),
});

export const downloadBooksMiddleware = multer({
  fileFilter: downloadBooksFileFilter,
  storage: downloadBooksStorage,
}).single(BOOKS_FILE_FIELDNAME);
