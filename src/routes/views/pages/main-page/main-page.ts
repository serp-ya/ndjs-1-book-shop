import { Router } from 'express';
import path from 'path';
import { db } from '@/database';
import { ROUTES_BASE } from '../../../routes-constants';
import { EStatusCodes } from '../../../routes-enums';

export const mainPageRoute = Router();

mainPageRoute.get(ROUTES_BASE, (req, res) => {
    const books = db.getBook();

    const templatePath = path.join(__dirname, './template/index.ejs');
    const templateData = {
        books,
        title: 'Книги',
    };

    res.renderPage(templatePath, templateData)
        .catch(error => {
            res.statusCode = EStatusCodes.InternalError;
            res.json(error);
        });
});