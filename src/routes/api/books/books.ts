import { Router } from 'express';
import { Book, getBook } from '@/database/books-database/models/book';
import { getBookFileName } from '@/database/books-database/models/book-file';
import { downloadBooksMiddleware, getPathForBookFile } from '@/middlewares/download-book';
import { NOT_FOUND_MESSAGE, ROUTES_BASE } from '../../routes-constants';
import { EStatusCodes } from '../../routes-enums';
import { createBook, deleteBook, editBook } from '../../utils/books';

export const booksRoute = Router();

booksRoute.get(ROUTES_BASE, async (_, res) => {
    try {
        const books = await getBook();
        res.json(books);

    } catch (error) {
        res.status(EStatusCodes.InternalError);
        res.json(error);
    }
});

booksRoute.get(`${ROUTES_BASE}:id`, async (req, res) => {
    const { id } = req.params;

    try {
        const book = await getBook(id);
        res.json(book);

    } catch (error) {
        res.status(EStatusCodes.InternalError);
        res.json(error);
    }
});

booksRoute.get(`${ROUTES_BASE}:id/download`, async (req, res) => {
    const { id } = req.params;

    try {
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

    } catch (error) {
        res.status(EStatusCodes.InternalError);
        res.json(error);
    }
});

booksRoute.post(ROUTES_BASE, downloadBooksMiddleware, async (req, res) => {
    try {
        const newBook = await createBook(req);
        res.json(newBook);

    } catch (error) {
        res.status(EStatusCodes.InternalError);
        res.json(error);
    }
});

booksRoute.put(`${ROUTES_BASE}:id`, downloadBooksMiddleware, async (req, res) => {
    try {
        const updatedBook = await editBook(req);
        res.json(updatedBook);

    } catch (error) {
        res.status(EStatusCodes.InternalError);
        res.json(error);
    }
});

booksRoute.delete(`${ROUTES_BASE}:id`, async (req, res) => {
    try {
        const status = await deleteBook(req);
        res.json(status);

    } catch (error) {
        res.status(EStatusCodes.InternalError);
        res.json(error);
    }
});
    