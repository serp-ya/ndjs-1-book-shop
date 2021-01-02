import { ADMINS_USER_GROUP_CODES } from './user-group-constants';

export const checkIsAdmin = (userGroup): boolean => (
    ADMINS_USER_GROUP_CODES.includes(userGroup)
);
