import express from 'express';
import cors from 'cors';

import userRouter from './routers/user';
import companyRouter from './routers/company';

import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(companyRouter);

app.use(errorHandler);

export default app;
