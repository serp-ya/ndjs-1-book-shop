import mongoose from 'mongoose';
import { BOOKS_DB_URL, BOOKS_DB_CONNECTION_CONFIG } from './books-database-constants';

export const booksDBConnection = mongoose.createConnection(BOOKS_DB_URL, BOOKS_DB_CONNECTION_CONFIG)
