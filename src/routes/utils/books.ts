import fs from 'fs';
import { db, DBError } from '@/database';
import { Book } from '@/models'
import { generateSecretFilename, getFilePathByFileName } from '@/middlewares/download-book';

export const createBook = (req) => new Promise((done, fail) => {
    const { key, ...newBookParams } = req.body;
    const fileName = req.file?.originalname;

    const newBook = db.createBook({ ...newBookParams, fileName });

    if (newBook instanceof DBError) {
        fail(newBook.errors);
    }

    done(newBook);
});

export const deleteBook = (req) => new Promise((done, fail) => {
    const { id } = req.params;
    const recordIsDelete = db.deleteBook(id);

    if (!recordIsDelete) {
        fail();
    }

    done('ok');
});

export const editBook = (req): Promise<Book | DBError | boolean> => new Promise((done, fail) => {
    const { id } = req.params;
    const { key, ...newBookParams } = req.body;
    const fileName = req.file?.filename;

    if (fileName) {
        Object.assign(newBookParams, { fileName })
    }
    const prevBook = db.getBook(id) as Book;
    const updatedBook = db.updateBook(id, newBookParams);

    if (updatedBook === false) {
        fail(false);
    }

    if (updatedBook instanceof DBError) {
        fail(updatedBook.errors);
    }
    const prevSecretFileName = generateSecretFilename(prevBook.fileName, prevBook);
    const newSecretFileName = generateSecretFilename((updatedBook as Book).fileName, updatedBook as Book);

    fs.promises.rename(
        getFilePathByFileName(prevSecretFileName),
        getFilePathByFileName(newSecretFileName),
    )
    .then(() => done(updatedBook))
    .catch(err => {
        db.updateBook(id, prevBook);
        fail(err);
    });
});
