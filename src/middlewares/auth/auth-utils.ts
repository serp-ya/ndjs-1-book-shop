import { authUser, getUserByLogin, getUserById } from '@/database/users-database';

export const verifyUser = async (login, password, done) => {
    try {
        const user = await getUserByLogin(login);

        if (!user) {
            return done(null, false);
        }
        const userIsVerifyed = await authUser(login, password);

        if (!userIsVerifyed) {
            return done(null, false)
        }
        done(null, user);

    } catch (error) {
        done(error);
    }
};

export const serializeUser = (user, cb) => {
    cb(null, user._id);
};

export const deserializeUser = async (id, cb) => {
    const user = await getUserById(id);
    cb(null, user);
};