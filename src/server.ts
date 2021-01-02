import express from 'express';
import expressSession from 'express-session';
import cors from 'cors';
import { BOOKS_ROUTE_NAME, booksRoute } from './routes/api/books';
import { LOGIN_ROUTE_NAME, loginRoute } from './routes/api/login';
import { USER_ROUTE_NAME } from './routes/api/user';
import { BOOK_PAGE_ROUTE_NAME, bookPageRoute } from './routes/pages/book-page';
import { mainPageRoute } from './routes/pages/main-page';
import { USER_PAGE_ROUTE_NAME, userPageRoute } from './routes/pages/user-page';
import { auth } from './middlewares/auth';
import { renderPage } from './middlewares/render-page';
import {
    PUBLIC_FOLDER_NAME,
    PUBLIC_FOLDER_PATH,
    SESSION_CONFIG,
} from './constants';

export const server = express();

server.set('view engine', 'ejs');

server.use(cors());
server.use(expressSession(SESSION_CONFIG));
server.use(auth.initialize());
server.use(auth.session());
server.use(renderPage());
server.use(`/${PUBLIC_FOLDER_NAME}`, express.static(PUBLIC_FOLDER_PATH));

// API routes
server.use(`/api/${BOOKS_ROUTE_NAME}`, booksRoute);
server.use(`/api/${USER_ROUTE_NAME}/${LOGIN_ROUTE_NAME}`, loginRoute);

// UI routes
server.use('/', mainPageRoute);
server.use(`/${BOOK_PAGE_ROUTE_NAME}`, bookPageRoute);
server.use(`/${USER_PAGE_ROUTE_NAME}`, userPageRoute);