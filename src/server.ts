import express from 'express';
import cors from 'cors';
import {
    LOGIN_ROUTE_NAME,
    loginRoute,
    USER_ROUTE_NAME,
} from './routes';

export const server = express();

server.use(cors());

server.use(`/${USER_ROUTE_NAME}/${LOGIN_ROUTE_NAME}`, loginRoute);
