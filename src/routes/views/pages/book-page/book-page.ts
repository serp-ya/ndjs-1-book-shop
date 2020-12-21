import { Router } from 'express';
import path from 'path';
import { db } from '@/database';
import { Book } from '@/models';
import { EStatusCodes, NOT_FOUND_MESSAGE, ROUTES_BASE } from '@/routes';

export const bookPageRoute = Router();

bookPageRoute.get(`${ROUTES_BASE}:id`, (req, res) => {
    const { id } = req.params;
    const bookById = db.getBook(id) as Book;

    if (!bookById) {
        res.statusCode = EStatusCodes.NotFound;
        res.json(NOT_FOUND_MESSAGE);
        return;
    }

    const templatePath = path.join(__dirname, 'index.ejs');
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