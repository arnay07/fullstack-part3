const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { info, error } = require('./utils/logger');
const { PORT, MONGODB_URI } = require('./utils/config');
const {
  requestLogger,
  errorHandler,
  unknownEndpoint,
} = require('./utils/middleware');
const PersonRoutes = require('./routes/PersonRoutes');
const mongoose = require('mongoose');

const app = express();

info('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info('connected to MongoDB');
  })
  .catch((err) => {
    error('error connecting to MongoDB:', err.message);
  });

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

app.use(requestLogger);

morgan.token('payload', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :response-time ms :payload'));

app.use('/api/persons', PersonRoutes);

app.use(unknownEndpoint);

app.use(errorHandler);

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
