import { Book, bookModel } from './book-model';
import { EBookFields } from './book-enum';

export const getBook = async (bookId?: string) => {
    if (bookId) {
        return await bookModel.findById(bookId);
    }
    return await bookModel.find({});
};

export const createBook = async (req) => (
    await bookModel.create({ ...req.body, [EBookFields.FileName]: req.file?.originalname })
);

export const updateBook = async (bookId: string, params: Partial<Book>) => (
    await bookModel.findByIdAndUpdate(bookId, params, { new: true })
);

export const deleteBook = async (bookId: string) => (
    await bookModel.findByIdAndDelete(bookId)
);