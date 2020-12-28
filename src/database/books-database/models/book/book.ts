import { Book, bookModel } from './book-model';

export const getBook = async (bookId?: string) => {
    if (bookId) {
        return await bookModel.findById({ _id: bookId });
    }
    return await bookModel.find({});
};

export const createBook = async (req) => (
    await bookModel.create({ ...req.body, fileName: req.file?.originalname })
);

export const updateBook = async (bookId: string, params: Partial<Book>) => (
    await bookModel.findByIdAndUpdate(bookId, params, { new: true })
);

export const deleteBook = async (bookId: string) => (
    await bookModel.findByIdAndDelete(bookId)
);