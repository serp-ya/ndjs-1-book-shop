import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Book } from '../book';
import { BOOKS_FILES_COLLECTION_NAME } from './book-file-constants';
import { EBookFileFields } from './book-file-enum';

@modelOptions({ schemaOptions: { collection: BOOKS_FILES_COLLECTION_NAME } })
export class BookFile {
    @prop({ ref: () => Book, required: true })
    public [EBookFileFields.BookId]!: Ref<Book>;
    
    @prop({ required: true })
    public [EBookFileFields.FileName]!: string;
}

export const bookFileModel = getModelForClass(BookFile);