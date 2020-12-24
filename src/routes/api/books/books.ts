import { Router } from 'express';
import { db } from '@/database';
import { Book } from '@/models';
import {
    downloadBooksMiddleware,
    getFilePathByFileName,
    generateSecretFilename,
} from '@/middlewares/download-book';
import { NOT_FOUND_MESSAGE, ROUTES_BASE } from '../../routes-constants';
import { EStatusCodes } from '../../routes-enums';
import { createBook, deleteBook, editBook } from '../../utils/books';

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
    createBook(req)
        .then(newBook => res.json(newBook))
        .catch(errors => {
            res.statusCode = EStatusCodes.BadRequest;
            res.json(errors);
        });
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
    editBook(req)
        .then(updatedBook => res.json(updatedBook))
        .catch(errors => {
            if (errors === false) {
                res.statusCode = EStatusCodes.NotFound;
                res.json(NOT_FOUND_MESSAGE);
                return;
            }

            res.statusCode = EStatusCodes.BadRequest;
            res.json(errors);
            return;
        })
});

booksRoute.delete(`${ROUTES_BASE}:id`, (req, res) => {
    deleteBook(req)
        .then(status => res.json(status))
        .catch(() => {
            res.statusCode = EStatusCodes.NotFound;
            res.json(NOT_FOUND_MESSAGE);
        });
});
    