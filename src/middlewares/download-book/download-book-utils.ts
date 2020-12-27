import path from 'path';
import { BOOKS_FOLDER_PATH } from './download-book-constants';

export const getPathForBookFile = (fileName: string): string => path.join(BOOKS_FOLDER_PATH, fileName);