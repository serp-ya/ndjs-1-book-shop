declare namespace Express {
    export interface Response {
        renderPage: (templatePath: string, pageData?: object, options?: object) => Promise<string>;
    }
 }