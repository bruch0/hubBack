import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (Request, Response) => Response.status(200).send());

export default app;
