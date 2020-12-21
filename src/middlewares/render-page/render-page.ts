import fs from 'fs';
import ejs from 'ejs';

const renderTemplate = async (templatePath, pageData, options) => {
    const template = await fs.promises.readFile(templatePath, 'utf-8');

    return ejs.render(template, pageData, { ...options, filename: templatePath });
};

export const renderPage = () => (req, res, next) => {
    const renderPageCb = async (templatePath, pageData, options) => {
        res.end(await renderTemplate(templatePath, pageData, options));
    };

    Object.assign(res, { renderPage: renderPageCb });

    next();
};