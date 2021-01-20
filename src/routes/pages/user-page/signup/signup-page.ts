import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { createUser, User } from '@/database/users-database';
import { authenticate } from '@/middlewares/auth';
import { ROUTES_BASE } from '../../../routes-constants';
import { EStatusCodes } from '../../../routes-enums';
import { ME_PAGE_ROUTE_NAME } from '../me';

export const signupPageRoute = Router();

signupPageRoute.get(ROUTES_BASE, authenticate(
    (req, res) => {
        const templatePath = path.join(__dirname, './template/index.ejs');
        const templateData = {
            title: 'Sign up page',
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

signupPageRoute.post(
    ROUTES_BASE,
    multer().none(),
    async (req, res) => {
        const { firstName, login, password, secondName } = req.body;

        try {
            const newUser = await createUser({ firstName, login, password, secondName } as User);

            req.logIn(newUser, (err) => {
                if (err) {
                    throw new Error(err);
                }
                res.redirect(ME_PAGE_ROUTE_NAME);
            });

        } catch (error) {
            res.statusCode = EStatusCodes.InternalError;
            res.json(error);
        }
    },
);
