import path from 'path';
import { COOKIE_SECRET } from './env';

export const APP_DEFAULT_PORT = 3000;

export const PUBLIC_FOLDER_NAME = 'public';
export const PUBLIC_FOLDER_PATH = path.join(__dirname, '../', PUBLIC_FOLDER_NAME);

const DEFAULT_SESSION_SECRET = 'kitties_eat_pretties';
export const SESSION_CONFIG = {
    secret: COOKIE_SECRET || DEFAULT_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};