import { NextFunction, Response, Request } from 'express';
import { User } from '@/database/users-database/models/user';
import { auth } from './auth';
import { STRATEGY_NAME } from './auth-constants';

type TAuthenticate = (
    onFail: (Response, Request) => void,
    onSuccess: (Response, Request) => void,
    checkPermissions?: (user: User | undefined) => boolean,
) => (
    (Response, Request, NextFunction) => void
);

export const authenticate: TAuthenticate = (onFail, onSuccess, checkPermissions) => (req, res, next) => {
    auth.authenticate(STRATEGY_NAME, { session: true }, (err, user, info) => {
        const currentUser = user || req.user;
        const hasPermissions = checkPermissions ? checkPermissions(currentUser) : true;

        if (err) {
            return next(err);
        }

        // Redirect if it fails
        if (!currentUser || !hasPermissions) {
            return onFail(req, res);
        }

        req.logIn(currentUser, (err) => {
            if (err) {
                return next(err);
            }

            // Redirect if it succeeds
            return onSuccess(req, res);
        });
      })(req, res, next);
};
