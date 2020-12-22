import { Router } from 'express';
import path from 'path';
import { db } from '@/database';
import { Book } from '@/models';
import { EStatusCodes, NOT_FOUND_MESSAGE, ROUTES_BASE } from '@/routes';
import { BOOK_CREATE_PAGE_PATH_NAME, createBookPageRoute } from './create-book';
import { BOOK_DELETE_PAGE_PATH_NAME, deleteBookPageRoute } from './delete-book';
import { BOOK_EDIT_PAGE_PATH_NAME, editBookPageRoute } from './edit-book';

export const bookPageRoute = Router();

bookPageRoute.use(`/${BOOK_CREATE_PAGE_PATH_NAME}`, createBookPageRoute);
bookPageRoute.use(`/${BOOK_DELETE_PAGE_PATH_NAME}`, deleteBookPageRoute);
bookPageRoute.use(`/${BOOK_EDIT_PAGE_PATH_NAME}`, editBookPageRoute);

bookPageRoute.get(`${ROUTES_BASE}:id`, (req, res) => {
    const { id } = req.params;
    const bookById = db.getBook(id) as Book;

    if (!bookById) {
        res.statusCode = EStatusCodes.NotFound;
        res.json(NOT_FOUND_MESSAGE);
        return;
    }

    const templatePath = path.join(__dirname, './template/index.ejs');
    const templateData = {
        book: bookById,
        title: bookById.title,
    };

    res.renderPage(templatePath, templateData)
        .catch(error => {
            res.statusCode = EStatusCodes.InternalError;
            res.json(error);
        });
});