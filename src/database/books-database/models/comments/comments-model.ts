import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from '../../../users-database';
import { booksDBConnection } from '../../books-database';
import { Book } from '../book';
import { COMMENTS_COLLECTION_NAME } from './comments-constants';
import { ECommentFields } from './comments-enum';

const commentModelOptions = {
    existingConnection: booksDBConnection,
    schemaOptions: { collection: COMMENTS_COLLECTION_NAME },
};

@modelOptions(commentModelOptions)
export class Comment {
    @prop({ ref: () => User, required: true })
    public [ECommentFields.Author]!: Ref<User>;

    @prop({ ref: () => Book, required: true })
    public [ECommentFields.BookId]!: Ref<Book>;

    @prop({ required: true })
    public [ECommentFields.Text]!: string;

    @prop({ default: () => new Date() })
    public [ECommentFields.Timestamp]?: Date;
}

export const commentModel = getModelForClass(Comment);