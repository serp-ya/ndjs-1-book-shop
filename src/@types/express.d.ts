declare namespace Express {
    import { User } from '@/database/users-database/models/user';

    export interface Response {
        renderPage: (templatePath: string, pageData?: object, options?: object) => Promise<string>;
    }
    
    export interface Request {
        user?: User
    }
 }