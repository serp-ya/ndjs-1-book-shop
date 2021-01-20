import { Router } from 'express';
import { checkIsAdmin } from '@/database/users-database/models/user-group';
import { authenticate } from '@/middlewares/auth';
import { ROUTES_BASE } from '../../../routes-constants';
import { EStatusCodes } from '../../../routes-enums';
import { deleteBook } from '../../../utils/books';
import { LOGIN_PAGE_PATH } from '../../user-page';

export const deleteBookPageRoute = Router();

deleteBookPageRoute.get(`${ROUTES_BASE}:id`, authenticate(
    (req, res) => res.redirect(LOGIN_PAGE_PATH),
    async (req, res) => {
        try {
            await deleteBook(req);
            res.redirect(ROUTES_BASE);
        } catch (error) {
            res.status(EStatusCodes.InternalError);
            res.json(error);
        }
    },
    (user) => checkIsAdmin(user?.userGroupCode),
));