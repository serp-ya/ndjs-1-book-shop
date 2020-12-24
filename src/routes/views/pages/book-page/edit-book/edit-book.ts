import { Router } from 'express';
import path from 'path';
import { db } from '@/database';
import { Book } from '@/models';
import { downloadBooksMiddleware } from '@/middlewares/download-book';
import { NOT_FOUND_MESSAGE, ROUTES_BASE } from '../../../../routes-constants';
import { EStatusCodes } from '../../../../routes-enums';
import { editBook } from '../../../../utils/books';

export const editBookPageRoute = Router();

editBookPageRoute.get(`${ROUTES_BASE}:id`, (req, res) => {
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
        title: 'Редактировать книгу',
    };

    res.renderPage(templatePath, templateData)
        .catch(error => {
            res.statusCode = EStatusCodes.InternalError;
            res.json(error);
        });
});

editBookPageRoute.post(`${ROUTES_BASE}:id`, downloadBooksMiddleware, (req, res) => {
    editBook(req)
        .then(() => res.redirect(ROUTES_BASE))
        .catch(errors => {
            if (errors === false) {
                res.statusCode = EStatusCodes.NotFound;
                res.json(NOT_FOUND_MESSAGE);
                return;
            }

            res.statusCode = EStatusCodes.BadRequest;
            res.json(errors);
            return;
        });
});