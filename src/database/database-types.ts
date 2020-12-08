
import { Book } from '@/models';

export type TDBStorage = {
    books: { [id: string]: Book },
};
