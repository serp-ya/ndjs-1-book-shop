import Joi from 'joi';

export const bookParamsSchema = Joi.object({
    id: Joi.string().min(10),
    title: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    authors: Joi.string().min(2).required(),
    favorite: Joi.string(),
    fileCover: Joi.string().min(2).required(),
    fileName: Joi.string().min(2).required(),
});
