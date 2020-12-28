import { Router } from 'express';
import path from 'path';
import { Book, getBook } from '@/database/books-database/models/book';
import { downloadBooksMiddleware } from '@/middlewares/download-book';
import { NOT_FOUND_MESSAGE, ROUTES_BASE } from '../../../../routes-constants';
import { EStatusCodes } from '../../../../routes-enums';
import { editBook } from '../../../../utils/books';

export const editBookPageRoute = Router();

editBookPageRoute.get(`${ROUTES_BASE}:id`, async (req, res) => {
    const { id } = req.params;

    try {
        const bookById = await getBook(id) as Book;
    
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

    } catch (error) {
        res.status(EStatusCodes.InternalError);
        res.json(error);
    }
});

editBookPageRoute.post(`${ROUTES_BASE}:id`, downloadBooksMiddleware, async (req, res) => {
    try {
        await editBook(req);
        res.redirect(ROUTES_BASE);

    } catch (error) {
        res.status(EStatusCodes.InternalError);
        res.json(error);
    }
});