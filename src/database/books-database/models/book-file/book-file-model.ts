import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { booksDBConnection } from '../../books-database';
import { Book } from '../book';
import { BOOKS_FILES_COLLECTION_NAME } from './book-file-constants';
import { EBookFileFields } from './book-file-enum';

const bookFileModelOptions = {
    existingConnection: booksDBConnection,
    schemaOptions: { collection: BOOKS_FILES_COLLECTION_NAME },
};

@modelOptions(bookFileModelOptions)
export class BookFile {
    @prop({ ref: () => Book, required: true })
    public [EBookFileFields.BookId]!: Ref<Book>;
    
    @prop({ required: true })
    public [EBookFileFields.FileName]!: string;
}

export const bookFileModel = getModelForClass(BookFile);