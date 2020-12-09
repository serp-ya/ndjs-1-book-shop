import { Router } from 'express';
import { db, DBError } from '@/database';
import {
    BAD_REQUEST_MESSAGE_STATUS_CODE,
    NOT_FOUND_MESSAGE,
    NOT_FOUND_STATUS_CODE,
    ROUTES_BASE,
} from '@/routes';
import { TBookParams } from '@/models';

export const booksRoute = Router();

booksRoute.get(ROUTES_BASE, (_, res) => {
    res.json(db.getBook());
});

booksRoute.get(`${ROUTES_BASE}:id`, (req, res) => {
    const { id } = req.params;
    const bookById = db.getBook(id);

    if (!bookById) {
        res.statusCode = NOT_FOUND_STATUS_CODE;
        res.json(NOT_FOUND_MESSAGE);
        return;
    }

    res.json(bookById);
});

booksRoute.post(ROUTES_BASE, (req, res) => {
    const newBookParams = req.body as TBookParams;
    const newBook = db.createBook(newBookParams);

    if (newBook instanceof DBError) {
        res.statusCode = BAD_REQUEST_MESSAGE_STATUS_CODE;
        res.json(newBook.errors);
        return;
    }

    res.json(newBook);
});

booksRoute.put(`${ROUTES_BASE}:id`, (req, res) => {
    const { id } = req.params;
    const newBookParams = req.body as TBookParams;
    const updatedBook = db.updateBook(id, newBookParams);

    if (updatedBook === false) {
        res.statusCode = NOT_FOUND_STATUS_CODE;
        res.json(NOT_FOUND_MESSAGE);
        return;
    }

    if (updatedBook instanceof DBError) {
        res.statusCode = BAD_REQUEST_MESSAGE_STATUS_CODE;
        res.json(updatedBook.errors);
        return;
    }

    res.json(updatedBook);
});

booksRoute.delete(`${ROUTES_BASE}:id`, (req, res) => {
    const { id } = req.params;
    const recordIsDelete = db.deleteBook(id);

    if (!recordIsDelete) {
        res.statusCode = NOT_FOUND_STATUS_CODE;
        res.json(NOT_FOUND_MESSAGE);
        return;
    }
        
    res.json('ok');
});
    