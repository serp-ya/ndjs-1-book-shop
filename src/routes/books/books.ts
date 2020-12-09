import fs from 'fs';
import { Router } from 'express';
import { db, DBError } from '@/database';
import { EStatusCodes, NOT_FOUND_MESSAGE, ROUTES_BASE } from '@/routes';
import { Book } from '@/models';
import { downloadBooksMiddleware } from './books-middlewares';
import { getFilePathByFileName, generateSecretFilename } from './books-utils';

export const booksRoute = Router();

booksRoute.get(ROUTES_BASE, (_, res) => {
    res.json(db.getBook());
});

booksRoute.get(`${ROUTES_BASE}:id`, (req, res) => {
    const { id } = req.params;
    const bookById = db.getBook(id);

    if (!bookById) {
        res.statusCode = EStatusCodes.NotFound;
        res.json(NOT_FOUND_MESSAGE);
        return;
    }

    res.json(bookById);
});

booksRoute.get(`${ROUTES_BASE}:id/download`, (req, res) => {
    const { id } = req.params;
    const bookById = db.getBook(id) as Book;

    if (!bookById) {
        res.statusCode = EStatusCodes.NotFound;
        res.json(NOT_FOUND_MESSAGE);
        return;
    }

    const { fileName } = bookById;
    const secretFileName = generateSecretFilename(fileName, bookById);

    res.download(
        getFilePathByFileName(secretFileName),
        fileName,
        (err) => err && res.status(EStatusCodes.NotFound).json(NOT_FOUND_MESSAGE)
    );
});

booksRoute.post(ROUTES_BASE, downloadBooksMiddleware, (req, res) => {
    const { key, ...newBookParams } = req.body;
    const fileName = req.file?.originalname;

    const newBook = db.createBook({ ...newBookParams, fileName });

    if (newBook instanceof DBError) {
        res.statusCode = EStatusCodes.BadRequest;
        res.json(newBook.errors);
        return;
    }

    res.json(newBook);
});

/*
* Unfortunately we have a issue with form-data handling and `multer` middleware
* and need to use multer instance with every route, who use form-data.
*
* However, this route can get new file for updating Book instance
* and multer instance usage with this route is good idea.
*
* https://github.com/expressjs/multer/issues/952
*/
booksRoute.put(`${ROUTES_BASE}:id`, downloadBooksMiddleware, (req, res) => {
    const { id } = req.params;
    const { key, ...newBookParams } = req.body;
    const fileName = req.file?.filename;

    if (fileName) {
        Object.assign(newBookParams, { fileName })
    }
    const prevBook = db.getBook(id) as Book;
    const updatedBook = db.updateBook(id, newBookParams);

    if (updatedBook === false) {
        res.statusCode = EStatusCodes.NotFound;
        res.json(NOT_FOUND_MESSAGE);
        return;
    }

    if (updatedBook instanceof DBError) {
        res.statusCode = EStatusCodes.BadRequest;
        res.json(updatedBook.errors);
        return;
    }
    const prevSecretFileName = generateSecretFilename(prevBook.fileName, prevBook);
    const newSecretFileName = generateSecretFilename((updatedBook as Book).fileName, updatedBook as Book);

    fs.promises.rename(
        getFilePathByFileName(prevSecretFileName),
        getFilePathByFileName(newSecretFileName),
    )
    .then(() => res.json(updatedBook))
    .catch(err => {
        db.updateBook(id, prevBook);
        throw err;
    });
});

booksRoute.delete(`${ROUTES_BASE}:id`, (req, res) => {
    const { id } = req.params;
    const recordIsDelete = db.deleteBook(id);

    if (!recordIsDelete) {
        res.statusCode = EStatusCodes.NotFound;
        res.json(NOT_FOUND_MESSAGE);
        return;
    }
        
    res.json('ok');
});
    