import { Router } from 'express';
import path from 'path';
import { downloadBooksMiddleware } from '@/middlewares/download-book';
import { ROUTES_BASE } from '../../../../routes-constants';
import { EStatusCodes } from '../../../../routes-enums';
import { createBook } from '../../../../utils/books';

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

createBookPageRoute.post(ROUTES_BASE, downloadBooksMiddleware, (req, res) => {
    createBook(req)
        .then(_ => res.redirect(ROUTES_BASE))
        .catch(errors => {
            res.statusCode = EStatusCodes.BadRequest;
            res.json(errors);
        });
});