import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import PersonController from './controllers/PersonController.js';
import logger from './utils/logger.js';
import config from './utils/config.js';

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

app.get('/api/persons', PersonController.getPersons);

app.get('/info', PersonController.getInfo);

app.get('/api/persons/:id', PersonController.getPersonById);

app.delete('/api/persons/:id', PersonController.deletePerson);

app.post('/api/persons', PersonController.createPerson);

app.put('/api/persons/:id', PersonController.updatePerson);

const unknownEndpoint = (req, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
