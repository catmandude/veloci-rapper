import Express from 'express';
import * as bodyParser from 'body-parser';
import './common/env';
import generate from './generate';

const app = new Express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/generate', generate);

app.listen(process.env.PORT);
