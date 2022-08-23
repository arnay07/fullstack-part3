const {
  getPersons: _getPersons,
  getPersonById: _getPersonById,
  deletePerson: _deletePerson,
  createPerson: _createPerson,
  updatePerson: _updatePerson,
} = require('../services/PersonService');

const getPersons = (req, res, next) => {
  _getPersons()
    .then((persons) => {
      res.json({ data: persons, status: 'success' });
    })
    .catch((error) => next(error));
};

const getPersonById = (req, res, next) => {
  const id = req.params.id;
  _getPersonById(id)
    .then((person) => {
      if (person) {
        res.json({ data: person, status: 'success' });
      } else {
        res.status(404).json({ error: 'person not found', status: 'error' });
      }
    })
    .catch((error) => next(error));
};

const deletePerson = (req, res, next) => {
  const id = req.params.id;
  _deletePerson(id)
    .then((person) => {
      res.json({ data: person, status: 'success' });
    })
    .catch((error) => next(error));
};

const createPerson = (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  _createPerson(person)
    .then((savedPerson) => {
      res.json({ data: savedPerson, status: 'success' });
    })
    .catch((error) => next(error));
};

const updatePerson = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  _updatePerson(id, person)
    .then((updatedPerson) => {
      res.json({ data: updatedPerson, status: 'success' });
    })
    .catch((error) => next(error));
};

const getInfo = (req, res, next) => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  const dateString = date.toDateString();
  _getPersons()
    .then((persons) => {
      res.send(
        `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${dateString} ${time}</p>
        `
      );
    })
    .catch((error) => next(error));
};

module.exports = {
  getPersons,
  getPersonById,
  deletePerson,
  createPerson,
  updatePerson,
  getInfo,
};
