import { ValidationErrorItem } from 'joi';
import { v4 as uuid } from 'uuid';
import { Book, bookParamsSchema, TBookParams } from '@/models';

const booksInitialData = require('./data') as TBookParams[];

type TDBStorage = {
    books: { [id: string]: Book },
};

type DBError = { errors: ValidationErrorItem[] };

class DB {
    private storage: TDBStorage;

    constructor() {
        this.storage = {} as TDBStorage;
        this.storage.books = booksInitialData.reduce((acc, book) => {
            acc[book.id || uuid()] = new Book(book);
            return acc;
        }, {} as { [id: string]: Book });
    }

    getBook(bookId?: string): Book | Book[] | undefined {
        return bookId
            ? this.storage.books[bookId]
            : Object.values(this.storage.books);
    }

    createBook(params: TBookParams): Book | DBError {
        const { error } = bookParamsSchema.validate(params);

        if (error) {
            return { errors: error.details };
        }

        const newBook = new Book(params);
        this.storage.books[newBook.id] = newBook;

        return newBook;
    }

    updateBook(bookId: string, { id, ...rest }: Partial<TBookParams>): boolean | Book {
        if (!(bookId in this.storage.books)) {
            return false;
        }
        const oldBook = this.storage.books[bookId];
        const updatedBook = new Book({ ...oldBook, ...rest });
        this.storage.books[bookId] = updatedBook;

        return updatedBook;
    };

    deleteBook(bookId: string): boolean {
        if (!this.storage.books[bookId]) {
            return false;
        }
        return delete this.storage.books[bookId];;
    };
};

export const db = new DB();