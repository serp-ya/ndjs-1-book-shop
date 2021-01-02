import { Router } from 'express';
import path from 'path';
import { Book, getBook } from '@/database/books-database/models/book';
import { checkIsAdmin } from '@/database/users-database/models/user-group';
import { authenticate } from '@/middlewares/auth';
import { downloadBooksMiddleware } from '@/middlewares/download-book';
import { NOT_FOUND_MESSAGE, ROUTES_BASE } from '../../../routes-constants';
import { EStatusCodes } from '../../../routes-enums';
import { editBook } from '../../../utils/books';
import { LOGIN_PAGE_PATH } from '../../user-page';

export const editBookPageRoute = Router();

editBookPageRoute.get(`${ROUTES_BASE}:id`, authenticate(
    (req, res) => res.redirect(LOGIN_PAGE_PATH),
    async (req, res) => {
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
                user: req.user,
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
    },
    (user) => checkIsAdmin(user?.userGroupCode),
));

editBookPageRoute.post(`${ROUTES_BASE}:id`, downloadBooksMiddleware, authenticate(
    (req, res) => res.redirect(LOGIN_PAGE_PATH),
    async (req, res) => {
        try {
            await editBook(req);
            res.redirect(ROUTES_BASE);
    
        } catch (error) {
            res.status(EStatusCodes.InternalError);
            res.json(error);
        }
    },
    (user) => checkIsAdmin(user?.userGroupCode),
));