import { bookFileModel } from './book-file-model';
import { EBookFileFields } from './book-file-enum';

export const getBookFileName = async (bookId: string) => {
    const bookFile = await bookFileModel.findOne({ [EBookFileFields.BookId]: bookId });

    return bookFile?.[EBookFileFields.FileName]
};

export const setBookFileName = async (bookId: string, fileName: string) => (
    await bookFileModel.findOneAndUpdate(
        { [EBookFileFields.BookId]: bookId },
        { [EBookFileFields.FileName]: fileName },
        { upsert: true, new: true, setDefaultsOnInsert: true },
    )
);