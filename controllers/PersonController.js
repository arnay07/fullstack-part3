import PersonService from '../services/PersonService.js';

const getPersons = (req, res, next) => {
  PersonService.getPersons()
    .then((persons) => {
      res.json({ data: persons, status: 'success' });
    })
    .catch((error) => next(error));
};

const getPersonById = (req, res, next) => {
  const id = req.params.id;
  PersonService.getPersonById(id)
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
  PersonService.deletePerson(id)
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
  PersonService.createPerson(person)
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
  PersonService.updatePerson(id, person)
    .then((updatedPerson) => {
      res.json({ data: updatedPerson, status: 'success' });
    })
    .catch((error) => next(error));
};

const getInfo = (req, res, next) => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  const dateString = date.toDateString();
  PersonService.getPersons()
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

export default {
  getPersons,
  getPersonById,
  deletePerson,
  createPerson,
  updatePerson,
  getInfo,
};
