import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import url from 'url';
import { authenticate } from '@/middlewares/auth';
import { ROUTES_BASE } from '../../../routes-constants';
import { EStatusCodes } from '../../../routes-enums';
import { ME_PAGE_ROUTE_NAME } from '../me';

export const loginPageRoute = Router();

loginPageRoute.get(ROUTES_BASE, authenticate(
    (req, res) => {
        const { error } = req.query;
    
        const templatePath = path.join(__dirname, './template/index.ejs');
        const templateData = {
            error,
            title: 'Login page',
            user: req.user,
        };
    
        res.renderPage(templatePath, templateData)
            .catch(error => {
                res.statusCode = EStatusCodes.InternalError;
                res.json(error);
            });
    },
    (req, res) => res.redirect(ME_PAGE_ROUTE_NAME),
));

loginPageRoute.post(
    ROUTES_BASE,
    multer().none(),
    authenticate(
        (req, res) => {
            res.redirect(url.format({
                pathname: req.baseUrl,
                query: {
                    error: 'Login is failed',
                },
            }));
        },
        (req, res) => {
            res.redirect(ME_PAGE_ROUTE_NAME);
        },
    ),
);
