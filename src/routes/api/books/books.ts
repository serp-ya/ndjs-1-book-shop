import { Router } from 'express';
import { Book, getBook } from '@/database/book';
import { getBookFileName } from '@/database/book-file';
import { downloadBooksMiddleware, getPathForBookFile } from '@/middlewares/download-book';
import { NOT_FOUND_MESSAGE, ROUTES_BASE } from '../../routes-constants';
import { EStatusCodes } from '../../routes-enums';
import { createBook, deleteBook, editBook } from '../../utils/books';

export const booksRoute = Router();

booksRoute.get(ROUTES_BASE, (_, res) => {
    getBook()
        .then(book => res.json(book))
        .catch(error => {
            res.status(EStatusCodes.BadRequest);
            res.json(error);
        });
});

booksRoute.get(`${ROUTES_BASE}:id`, (req, res) => {
    const { id } = req.params;

    getBook(id)
        .then(book => res.json(book))
        .catch(error => {
            res.status(EStatusCodes.BadRequest);
            res.json(error);
        });
});

booksRoute.get(`${ROUTES_BASE}:id/download`, async (req, res) => {
    const { id } = req.params;
    const { fileName } = await getBook(id) as Book;

    if (!fileName) {
        res.statusCode = EStatusCodes.NotFound;
        res.json(NOT_FOUND_MESSAGE);
        return;
    }

    const secretFileName = await getBookFileName(id);

    res.download(
        getPathForBookFile(secretFileName || ''),
        fileName,
        (err) => err && res.status(EStatusCodes.NotFound).json(NOT_FOUND_MESSAGE)
    );
});

booksRoute.post(ROUTES_BASE, downloadBooksMiddleware, (req, res) => {
    createBook(req)
        .then(newBook => res.json(newBook))
        .catch(error => {
            res.status(EStatusCodes.BadRequest);
            res.json(error);
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
            res.statusCode = EStatusCodes.BadRequest;
            res.json(errors);
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
    