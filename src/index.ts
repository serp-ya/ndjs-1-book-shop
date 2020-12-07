import express from 'express';
import cors from 'cors';
import { APP_DEFAULT_PORT } from './constants';

const app = express();
app.use(cors());

const appPort = process.env.APP_PORT || APP_DEFAULT_PORT
app.listen(appPort, () => {
    process.stdout.write(`Server started on ${appPort} port!\n`);
});