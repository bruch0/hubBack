import express from 'express';
import cors from 'cors';

import userRouter from './routers/user';

import databaseError from './middlewares/databaseError';

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);

app.use(databaseError);

export default app;
