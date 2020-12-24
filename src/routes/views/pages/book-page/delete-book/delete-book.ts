import { Router } from 'express';
import { NOT_FOUND_MESSAGE, ROUTES_BASE } from '../../../../routes-constants';
import { EStatusCodes } from '../../../../routes-enums';
import { deleteBook } from '../../../../utils/books';

export const deleteBookPageRoute = Router();

deleteBookPageRoute.get(`${ROUTES_BASE}:id`, (req, res) => {
    deleteBook(req)
        .then(() => res.redirect(ROUTES_BASE))
        .catch(() => {
            res.statusCode = EStatusCodes.NotFound;
            res.json(NOT_FOUND_MESSAGE);
        });
});