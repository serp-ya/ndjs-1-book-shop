import { v4 as uuid } from 'uuid';
import { Book, bookParamsSchema, TBookParams } from '@/models';
import type { TDBStorage } from './database-types';
import { DBError } from './database-error';

const booksInitialData = require('./data') as TBookParams[];

export class DB {
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
            return new DBError(error);
        }

        const newBook = new Book(params);
        this.storage.books[newBook.id] = newBook;

        return newBook;
    }

    updateBook(bookId: string, { id, ...rest }: Partial<TBookParams>): Book | DBError | boolean  {
        if (!(bookId in this.storage.books)) {
            return false;
        }
        const oldBook = this.storage.books[bookId];
        const updatedBookParams = { ...oldBook, ...rest };
        const { error } = bookParamsSchema.validate(updatedBookParams);

        if (error) {
            return new DBError(error);
        }

        const updatedBook = new Book(updatedBookParams);
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