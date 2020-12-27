import mongoose from 'mongoose';
import { DB_CONNECTION_CONFIG, DB_URL } from './database-constants';

export const dbConnect = mongoose.connect(DB_URL, DB_CONNECTION_CONFIG)