import path from 'path';
import { PUBLIC_FOLDER_PATH } from '@/constants';
import { EMimeTypes } from '@/enums';

export const BOOKS_ROUTE_NAME = 'books';
export const BOOKS_FOLDER_NAME = 'books';
export const BOOKS_FOLDER_PATH = path.join(PUBLIC_FOLDER_PATH, BOOKS_FOLDER_NAME);
export const BOOKS_AVAILABLE_FILETYPES = [EMimeTypes.ApplicationPDF];

export const BOOKS_FILE_FIELDNAME = 'fileBook';
export const BOOKS_FILENAME_DELIMETER = '__';