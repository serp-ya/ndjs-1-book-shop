import { Router } from 'express';
import path from 'path';
import { db, DBError } from '@/database';
import { EStatusCodes, ROUTES_BASE } from '@/routes';
import { createBook } from '@/routes/utils/books';
import { downloadBooksMiddleware } from '@/middlewares/download-book';

export const createBookPageRoute = Router();

createBookPageRoute.get(ROUTES_BASE, (req, res) => {
    const templatePath = path.join(__dirname, './template/index.ejs');
    const templateData = {
        title: 'Добавить новую книгу',
    };

    res.renderPage(templatePath, templateData)
        .catch(error => {
            res.statusCode = EStatusCodes.InternalError;
            res.json(error);
        });
});

createBookPageRoute.post(ROUTES_BASE, downloadBooksMiddleware, async (req, res) => {
    await createBook(req)
        .then(_ => res.redirect(ROUTES_BASE))
        .catch(errors => {
            res.statusCode = EStatusCodes.BadRequest;
            res.json(errors);
        });
});