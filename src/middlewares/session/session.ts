import expressSession from 'express-session';
import { SESSION_CONFIG } from '@/constants';

export const sessionMiddleware = expressSession(SESSION_CONFIG);
