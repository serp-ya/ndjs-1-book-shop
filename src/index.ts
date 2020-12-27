import { server } from './server';
import { APP_DEFAULT_PORT } from './constants';
import { PORT } from './env';

const appPort = PORT || APP_DEFAULT_PORT;

server.listen(appPort, () => {
    process.stdout.write(`Server started on ${appPort} port!\n`);
});