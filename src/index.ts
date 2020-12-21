import { server } from './server';
import { APP_DEFAULT_PORT } from './constants';

const appPort = process.env.PORT || APP_DEFAULT_PORT;

server.listen(appPort, () => {
    process.stdout.write(`Server started on ${appPort} port!\n`);
});