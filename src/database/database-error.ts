import { ValidationErrorItem } from 'joi';

export class DBError {
    public readonly errors: ValidationErrorItem[];

    constructor(errors) {
        this.errors = errors.details;
    };
};