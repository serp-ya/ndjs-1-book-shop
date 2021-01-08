import { Server } from 'socket.io';
import { BOOK_COMMENTS_NAMESPACE, bookCommentsListener } from './book-comments';
import { createSocketNamespace } from './websocket-utils';

export const websocket = new Server();

createSocketNamespace(websocket, BOOK_COMMENTS_NAMESPACE)
    .on('connection', bookCommentsListener);