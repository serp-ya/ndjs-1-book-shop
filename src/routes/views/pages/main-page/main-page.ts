import { Router } from 'express';
import path from 'path';
import { db } from '@/database';
import { EStatusCodes, ROUTES_BASE } from '@/routes';

export const mainPageRoute = Router();

mainPageRoute.get(ROUTES_BASE, (req, res) => {
    const books = db.getBook();
    const pageData = {
        books,
        title: 'Книги',
    };
    const templatePath = path.join(__dirname, 'index.ejs');

    res.renderPage(templatePath, pageData)
        .catch(error => {
            res.statusCode = EStatusCodes.InternalError;
            res.json(error);
        });
});