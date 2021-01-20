import { server } from './server';
import { websocket } from './websocket';
import { APP_DEFAULT_PORT } from './constants';
import { booksDBConnection, usersDBConnection } from './database';
import { PORT } from './env';

const appPort = PORT || APP_DEFAULT_PORT;

Promise.all([booksDBConnection, usersDBConnection])
    .then(() => {
        const httpServer = server.listen(appPort, () => {
            process.stdout.write(`Server started on ${appPort} port!\n`);
        });

        websocket.listen(httpServer);
    })
    .catch(error => process.stdout.write(JSON.stringify(error)));
