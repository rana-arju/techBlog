import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import { notFound } from './app/middleware/notFound';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';

const app: Application = express();
//json parser
app.use(express.json());

// cors

app.use(cors());

// application routes
app.use("/api", router)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Working...');
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
