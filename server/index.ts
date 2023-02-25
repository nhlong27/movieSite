import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app: Express = express();

const port = process.env.PORT;

const corsOptions = {
  origin: process.env.CLIENT,
  optionsSuccessStatus: 200
}

app.use((cors(corsOptions)))

app.get('/profile', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server Working again');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});