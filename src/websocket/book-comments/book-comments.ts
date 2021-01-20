import { createComment, deleteComment, getBookComments } from '@/database/books-database';

type TBookCommentsQuery = {
    bookId: string;
};

export const bookCommentsListener = (socket) => {
    const { bookId } = socket.handshake.query as TBookCommentsQuery;
    const userId = socket.request?.session?.passport?.user;

    socket.join(bookId);
    
    socket.on('load all comments', async () => {
        const comments = await getBookComments(bookId);

        comments.forEach(comment => (
            socket.emit('recive comment', comment)
        ));
    });

    socket.on('add comment', async ({ text }) => {
        if (!userId || !bookId) {
            return;
        }

        const newComment = await createComment(userId, bookId, text);

        socket.to(bookId).emit('recive comment', newComment);
        socket.emit('recive comment', newComment);
    });

    socket.on('delete comment', async ({ commentId }) => {
        const deletionResult = await deleteComment(commentId);

        if (deletionResult) {
            socket.to(bookId).emit('delete comment', commentId);
            socket.emit('delete comment', commentId);
        }
    })
};
