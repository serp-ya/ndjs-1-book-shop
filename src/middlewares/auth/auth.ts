import { Passport } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { AUTH_OPTIONS, STRATEGY_NAME } from './auth-constants';
import { deserializeUser, serializeUser, verifyUser } from './auth-utils';

export const auth = new Passport();

auth.use(STRATEGY_NAME, new LocalStrategy(AUTH_OPTIONS, verifyUser));

auth.serializeUser(serializeUser);
auth.deserializeUser(deserializeUser);
