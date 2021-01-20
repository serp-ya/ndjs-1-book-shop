import { Router } from 'express';
import path from 'path';
import { checkIsAdmin } from '@/database/users-database/models/user-group';
import { authenticate } from '@/middlewares/auth';
import { downloadBooksMiddleware } from '@/middlewares/download-book';
import { ROUTES_BASE } from '../../../routes-constants';
import { EStatusCodes } from '../../../routes-enums';
import { createBook } from '../../../utils/books';
import { LOGIN_PAGE_PATH } from '../../user-page';

export const createBookPageRoute = Router();

createBookPageRoute.get(ROUTES_BASE, authenticate(
    (req, res) => res.redirect(LOGIN_PAGE_PATH),
    async (req, res) => {
        const templatePath = path.join(__dirname, './template/index.ejs');
        const templateData = {
            title: 'Добавить новую книгу',
            user: req.user,
        };
    
        try {
            await res.renderPage(templatePath, templateData);
        
        } catch (error) {
            res.statusCode = EStatusCodes.BadRequest;
            res.json(error);
        }
    },
    (user) => checkIsAdmin(user?.userGroupCode),
));

createBookPageRoute.post(ROUTES_BASE, downloadBooksMiddleware, authenticate(
    (req, res) => res.redirect(LOGIN_PAGE_PATH),
    async (req, res) => {
        try {
            await createBook(req);
            res.redirect(ROUTES_BASE);
    
        } catch (error) {
            res.status(EStatusCodes.InternalError);
            res.json(error);
        }
    },
    (user) => checkIsAdmin(user?.userGroupCode),
));