import { Router } from 'express';
import path from 'path';
import { Book, getBook } from '@/database/books-database/models/book';
import { checkIsAdmin } from '@/database/users-database/models/user-group';
import { NOT_FOUND_MESSAGE, ROUTES_BASE } from '../../routes-constants';
import { EStatusCodes } from '../../routes-enums';
import { getBookViewsCounter } from '../../utils/book-views-counter';
import { BOOK_CREATE_PAGE_PATH_NAME, createBookPageRoute } from './create-book';
import { BOOK_DELETE_PAGE_PATH_NAME, deleteBookPageRoute } from './delete-book';
import { BOOK_EDIT_PAGE_PATH_NAME, editBookPageRoute } from './edit-book';

export const bookPageRoute = Router();

bookPageRoute.use(`/${BOOK_CREATE_PAGE_PATH_NAME}`, createBookPageRoute);
bookPageRoute.use(`/${BOOK_DELETE_PAGE_PATH_NAME}`, deleteBookPageRoute);
bookPageRoute.use(`/${BOOK_EDIT_PAGE_PATH_NAME}`, editBookPageRoute);

bookPageRoute.get(`${ROUTES_BASE}:id`, async (req, res) => {
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
            isAdmin: checkIsAdmin(req.user?.userGroupCode),
            title: bookById.title,
            user: req.user,
        };
    
        try {
            const viewsCounter = await getBookViewsCounter(id);
            Object.assign(templateData, { viewsCounter });
        } catch (error) {
            process.stdout.write('Try to get book\'s view counter\n');
            process.stdout.write(JSON.stringify(error));
        }
    
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