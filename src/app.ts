import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

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

export default app;
