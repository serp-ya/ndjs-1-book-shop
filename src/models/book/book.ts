import { v4 as uuid } from 'uuid';
import type { TBookParams } from './book-types';
import { bookParamsSchema } from './book-schema';

export class Book {
    public readonly id: string;
    public readonly title: string;
    public readonly description: string;
    public readonly authors: string;
    public readonly favorite: boolean;
    public readonly fileCover: string;
    public readonly fileName: string;

    constructor(params: TBookParams) {
        const { error } = bookParamsSchema.validate(params);

        if (error) {
            throw new Error(JSON.stringify(error.details));
        }

        this.id = params.id || uuid();
        this.title = params.title;
        this.description = params.description;
        this.authors = params.authors;
        this.favorite = params.favorite || false;
        this.fileCover = params.fileCover;
        this.fileName = params.fileName;
    }
}