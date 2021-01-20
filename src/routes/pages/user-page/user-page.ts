import { Router } from 'express';
import { authenticate } from '@/middlewares/auth';
import { ROUTES_BASE } from '../../routes-constants';
import { LOGIN_PAGE_ROUTE_NAME, loginPageRoute } from './login';
import { ME_PAGE_ROUTE_NAME, mePageRoute } from './me';
import { SIGN_OUT_PAGE_ROUTE_NAME, signoutPageRoute } from './signout';
import { SIGN_UP_PAGE_ROUTE_NAME, signupPageRoute } from './signup';

export const userPageRoute = Router();

userPageRoute.use(`/${LOGIN_PAGE_ROUTE_NAME}`, loginPageRoute);
userPageRoute.use(`/${ME_PAGE_ROUTE_NAME}`, mePageRoute);
userPageRoute.use(`/${SIGN_OUT_PAGE_ROUTE_NAME}`, signoutPageRoute);
userPageRoute.use(`/${SIGN_UP_PAGE_ROUTE_NAME}`, signupPageRoute);

userPageRoute.get(`${ROUTES_BASE}`, authenticate(
    (req, res) => res.redirect(`${req.baseUrl}/${LOGIN_PAGE_ROUTE_NAME}`),
    (req, res) => res.redirect(`${req.baseUrl}/${ME_PAGE_ROUTE_NAME}`)
));