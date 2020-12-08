import { Router } from 'express';
import { ROUTES_BASE } from '@/routes';
import { LOGIN_DEFAULT_STATUS_CODE, LOGIN_DEFAULT_RESPONSE } from './login-constants';

export const loginRoute = Router();

loginRoute
    .post(ROUTES_BASE, (_, res) => {
        res.statusCode = LOGIN_DEFAULT_STATUS_CODE;
        res.json(LOGIN_DEFAULT_RESPONSE);
    });
    