import * as functions from 'firebase-functions';
import * as express from 'express';
import * as shortid from 'shortid';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
    const host: string = "https://whentomeet.com/";
    res.send(host.concat(shortid.generate()));
});

export const helloWorld = functions.https.onRequest(app);
