import { DB } from '@/database';
import { Book } from '@/models/book';

class BooksRepository extends DB {
    getBooks(): Book[] {
        return super.getBook() as Book[];
    }
};

export const booksRepository = new BooksRepository();