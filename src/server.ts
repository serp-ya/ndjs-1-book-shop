import express from 'express';
import exFormData from 'express-form-data';
import cors from 'cors';
import { BOOKS_ROUTE_NAME, booksRoute } from './routes/books';
import { LOGIN_ROUTE_NAME, loginRoute } from './routes/login';
import { USER_ROUTE_NAME } from './routes/user';

export const server = express();

server.use(exFormData.parse());
server.use(cors());

server.use(`/api/${BOOKS_ROUTE_NAME}`, booksRoute);
server.use(`/api/${USER_ROUTE_NAME}/${LOGIN_ROUTE_NAME}`, loginRoute);
