import { Router } from 'express';
import path from 'path';
import { downloadBooksMiddleware } from '@/middlewares/download-book';
import { ROUTES_BASE } from '../../../../routes-constants';
import { EStatusCodes } from '../../../../routes-enums';
import { createBook } from '../../../../utils/books';

export const createBookPageRoute = Router();

createBookPageRoute.get(ROUTES_BASE, async (req, res) => {
    const templatePath = path.join(__dirname, './template/index.ejs');
    const templateData = {
        title: 'Добавить новую книгу',
    };

    try {
        await res.renderPage(templatePath, templateData);
    
    } catch (error) {
        res.statusCode = EStatusCodes.BadRequest;
        res.json(error);
    }
});

createBookPageRoute.post(ROUTES_BASE, downloadBooksMiddleware, async (req, res) => {
    try {
        await createBook(req);
        res.redirect(ROUTES_BASE);

    } catch (error) {
        res.status(EStatusCodes.InternalError);
        res.json(error);
    }
});