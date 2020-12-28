import { Router } from 'express';
import { ROUTES_BASE } from '../../../../routes-constants';
import { EStatusCodes } from '../../../../routes-enums';
import { deleteBook } from '../../../../utils/books';

export const deleteBookPageRoute = Router();

deleteBookPageRoute.get(`${ROUTES_BASE}:id`, async (req, res) => {
    try {
        await deleteBook(req);
        res.redirect(ROUTES_BASE);
    } catch (error) {
        res.status(EStatusCodes.InternalError);
        res.json(error);
    }
});