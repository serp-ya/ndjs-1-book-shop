import { Router } from 'express';
import { ROUTES_BASE } from '../../../routes-constants';

export const signoutPageRoute = Router();

signoutPageRoute.get(ROUTES_BASE, (req, res) => {
    req.logOut();
    res.redirect('/');
});
