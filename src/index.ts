import express, { Express, Request, Response } from 'express';
import { config } from 'dotenv';

config();

const app: Express = express();
const port = process.env.PORT;
console.log('puerto: ', port);

app.get('/', (req: Request, res: Response) => {
  res.send('hola mundo');
});

app.listen(port, () => {
  console.log('servidor corriendooo');
});
