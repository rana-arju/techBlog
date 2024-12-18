import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();
//json parser
app.use(express.json());

// cors

app.use(cors());

// application routes

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Working...');
});

export default app;
