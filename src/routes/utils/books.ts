import {
    createBook as createBookMongo,
    deleteBook as deleteBookMongo,
    updateBook,
} from '@/database/book';
import { setBookFileName } from '@/database/book-file';

export const createBook = async (req) => {
    const newBook = await createBookMongo(req);
    await setBookFileName(newBook._id, req.file.filename );

    return newBook;
};

export const deleteBook = (req) => (
    deleteBookMongo(req.params.id)
        .then(() => 'ok')
);

export const editBook = async (req) => {
    const { id } = req.params;
    const updateBookPrams = { ...req.body };

    if (req.file?.originalname) {
        Object.assign(updateBookPrams, { fileName: req.file?.originalname })
    }
    const updatedBook = await updateBook(id, updateBookPrams);

    if (req.file?.filename) {
        await setBookFileName(id, req.file?.filename);
    }

    return updatedBook;
}