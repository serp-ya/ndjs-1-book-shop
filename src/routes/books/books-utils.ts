import path from 'path';
import crypto from 'crypto';
import { TBookParams } from '@/models';
import { BOOKS_FILENAME_DELIMETER, BOOKS_FOLDER_PATH } from './books-constants';

const generateBookFilenamePrefix = (bookInfo: Partial<TBookParams>): string => {
    const md5Sum = crypto.createHash('md5');
    md5Sum.update(JSON.stringify(bookInfo));

    return md5Sum.digest('hex');
};

export const generateSecretFilename = (
    fileName: string,
    { title, description, authors, fileCover }: Partial<TBookParams>,
): string => ([
    generateBookFilenamePrefix({ title, fileName, description, authors, fileCover }),
    fileName,
].join(BOOKS_FILENAME_DELIMETER));

export const getFilePathByFileName = (fileName: string): string => (
    path.join(BOOKS_FOLDER_PATH, fileName)
);