/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import bodyParser from 'body-parser';
import { authRouter } from './modules/auth/index';

const app = express();

// body-parser
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', authRouter);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// const port = config.port;
// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/api`);
// });
// server.on('error', console.error);

export default app;