import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { BOOKS_COLLECTION_NAME } from './book-constants';
import { EBookFields } from './book-enum';

@modelOptions({ schemaOptions: { collection: BOOKS_COLLECTION_NAME } })
export class Book {
    @prop({ required: true })
    public [EBookFields.Authors]!: string;

    @prop({ required: true })
    public [EBookFields.Description]!: string;

    @prop({ default: false })
    public [EBookFields.Favorite]?: boolean;

    @prop({ required: true })
    public [EBookFields.FileCover]!: string;

    @prop({ required: true })
    public [EBookFields.FileName]!: string;

    @prop({ required: true })
    public [EBookFields.Title]!: string;
}

export const bookModel = getModelForClass(Book);