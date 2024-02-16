import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundErrorHandler from './app/middlewares/notFOund';
import router from './app/routes/intex';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  //   Promise.reject();
  const a = 10;
  res.send(a);
};
app.use('/', test);
app.use(globalErrorHandler);
app.use('*', notFoundErrorHandler);

export default app;
