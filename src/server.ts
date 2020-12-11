import express from 'express';
import cors from 'cors';
import { PUBLIC_FOLDER_NAME, PUBLIC_FOLDER_PATH } from './constants';
import { BOOKS_ROUTE_NAME, booksRoute } from './routes/books';
import { LOGIN_ROUTE_NAME, loginRoute } from './routes/login';
import { USER_ROUTE_NAME } from './routes/user';

export const server = express();

server.use(cors());
server.use(`/${PUBLIC_FOLDER_NAME}`, express.static(PUBLIC_FOLDER_PATH));

server.use(`/api/${BOOKS_ROUTE_NAME}`, booksRoute);
server.use(`/api/${USER_ROUTE_NAME}/${LOGIN_ROUTE_NAME}`, loginRoute);
