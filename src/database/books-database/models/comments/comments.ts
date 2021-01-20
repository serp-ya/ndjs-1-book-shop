import { EUserFields, userModel } from '../../../users-database';
import { ECommentFields } from './comments-enum';
import { commentModel } from './comments-model';

const populateAuthorOptions = {
    model: userModel,
    path: ECommentFields.Author,
    select: [EUserFields.FirstName, EUserFields.Login, EUserFields.SecondNameName],
};

export const getBookComments = async (bookId: string) => (
    await commentModel
        .find({ [ECommentFields.BookId]: bookId })
        .populate(populateAuthorOptions)
);

export const createComment = async (author: string, bookId: string, text: string) => {
    const { _id } = await commentModel.create({
        [ECommentFields.Author]: author,
        [ECommentFields.BookId]: bookId,
        [ECommentFields.Text]: text,
    });

    return commentModel.findById(_id).populate(populateAuthorOptions);
};

export const deleteComment = async (commentId: string): Promise<boolean> => {
    try {
        const res = await commentModel.findByIdAndDelete(commentId);
        return true;
    } catch (error) {
        process.stdout.write(`${JSON.stringify(error)}\n`);
        return false;
    }
} 