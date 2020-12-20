import express from 'express';
import cors from 'cors';
import { BOOKS_ROUTE_NAME, booksRoute } from './routes/api/books';
import { LOGIN_ROUTE_NAME, loginRoute } from './routes/api/login';
import { USER_ROUTE_NAME } from './routes/api/user';
import { mainPageRoute } from './routes/views/pages/main-page';
import { renderPage } from './middlewares/render-page';
import { PUBLIC_FOLDER_NAME, PUBLIC_FOLDER_PATH } from './constants';

export const server = express();

server.set('view engine', 'ejs');

server.use(cors());
server.use(renderPage());
server.use(`/${PUBLIC_FOLDER_NAME}`, express.static(PUBLIC_FOLDER_PATH));

server.use(`/api/${BOOKS_ROUTE_NAME}`, booksRoute);
server.use(`/api/${USER_ROUTE_NAME}/${LOGIN_ROUTE_NAME}`, loginRoute);

server.use(mainPageRoute);