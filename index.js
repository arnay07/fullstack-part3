import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import mongoose from 'mongoose';
import PersonRoutes from './routers/PersonRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);

morgan.token('payload', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :response-time ms :payload'));

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use('/api/persons', PersonRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
