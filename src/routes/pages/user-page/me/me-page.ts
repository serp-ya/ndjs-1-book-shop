import { Router } from 'express';
import path from 'path';
import { authenticate } from '@/middlewares/auth';
import { ROUTES_BASE } from '../../../routes-constants';
import { EStatusCodes } from '../../../routes-enums';
import { LOGIN_PAGE_ROUTE_NAME } from '../login';

export const mePageRoute = Router();

mePageRoute.get(ROUTES_BASE, authenticate(
    (req, res) => res.redirect(LOGIN_PAGE_ROUTE_NAME),
    (req, res) => {
        const templatePath = path.join(__dirname, './template/index.ejs');
        const templateData = {
            title: `${req.user?.firstName} ${req.user?.secondName} page`,
            user: req.user,
        };
    
        res.renderPage(templatePath, templateData)
            .catch(error => {
                res.statusCode = EStatusCodes.InternalError;
                res.json(error);
            });
    }
));
