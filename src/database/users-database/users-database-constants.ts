import { MONGO_DB_ATLAS_PSW } from '@/env';

const USERS_DB_NAME = 'users';

export const USERS_DB_URL = (
    `mongodb+srv://book-man:${MONGO_DB_ATLAS_PSW}@cluster0.ibep9.mongodb.net/${USERS_DB_NAME}?retryWrites=true&w=majority`
);

export const USERS_DB_CONNECTION_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
