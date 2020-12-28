import { Router } from 'express';
import path from 'path';
import { getBook } from '@/database/books-database/models/book';
import { ROUTES_BASE } from '../../../routes-constants';
import { EStatusCodes } from '../../../routes-enums';

export const mainPageRoute = Router();

mainPageRoute.get(ROUTES_BASE, async (req, res) => {
    try {
        const books = await getBook();
    
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

    } catch (error) {
        res.status(EStatusCodes.InternalError);
        res.json(error);
    }
});