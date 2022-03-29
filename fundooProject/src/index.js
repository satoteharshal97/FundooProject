import dotenv from 'dotenv';
dotenv.config();
import swaggerUi  from 'swagger-ui-express';
import swaggerDocument from '../src/swagger/swagger.json';
import { redisConnect } from './config/redis';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import database from './config/database';
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';
import morgan from 'morgan';


//Creates express app
const app = express();
// Setup server host
const host = process.env.APP_HOST;
// Setup server port
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: logStream }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//redisConnect();

database();


app.use(`/api/${api_version}`, routes());
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

// listen for requests
app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/api/${api_version}/`);
});

export default app;
