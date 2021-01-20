import { Server, Socket } from 'socket.io';
import { auth } from '@/middlewares/auth';
import { sessionMiddleware } from '@/middlewares/session';

const adaptExpressMiddleware = middleware => (socket: Socket, next) => (
    middleware(socket.request, {}, next)
);

export const createSocketNamespace = (server: Server, namespace: string) => (
    server
        .of(namespace)
        .use(adaptExpressMiddleware(sessionMiddleware))
        .use(adaptExpressMiddleware(auth.initialize()))
        .use(adaptExpressMiddleware(auth.session()))
);