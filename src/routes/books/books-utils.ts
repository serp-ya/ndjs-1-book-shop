import path from 'path';
import { BOOKS_FILENAME_DELIMETER, BOOKS_FOLDER_PATH } from './books-constants';

const generareBookFilenamePrefix = () => Buffer.from(Date.now().toString()).toString('base64');

export const generateUniqueFilename = (filename: string): string => ([
    generareBookFilenamePrefix(),
    filename,
].join(BOOKS_FILENAME_DELIMETER));

export const recoverOriginalFilename = (filename: string): string => {
    const [_, ...filenameParts] = filename.split(BOOKS_FILENAME_DELIMETER);
    const recoveredFileName = filenameParts.join(BOOKS_FILENAME_DELIMETER);

    return recoveredFileName;
};

export const getFilePathByFileName = (fileName: string): string => (
    path.join(BOOKS_FOLDER_PATH, fileName)
);