import mongoose from 'mongoose';
import { USERS_DB_CONNECTION_CONFIG, USERS_DB_URL } from './users-database-constants';

export const usersDBConnection = mongoose.createConnection(USERS_DB_URL, USERS_DB_CONNECTION_CONFIG)
// export const booksDBConnect = mongoose.connect(DB_URL, DB_CONNECTION_CONFIG)