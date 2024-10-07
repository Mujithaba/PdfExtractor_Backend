

import express from 'express';
import cors from 'cors';
import pdfRoutes from './routes/pdfRoutes';
import { errorHandler } from './middlewares/errorHandlerMiddleware';

import path from 'path';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files (uploaded PDFs)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Use PDF routes
app.use('/api/pdf', pdfRoutes);
app.use(errorHandler);


export default app;
