import PersonService from '../services/PersonService.js';
import mongoose from 'mongoose';

const getPersons = (req, res) => {
  PersonService.getPersons()
    .then((persons) => {
      res.json({ data: persons, status: 'success' });
    })
    .catch((error) =>
      res.status(500).json({ error: error.message, status: 'error' })
    );
};

const getPersonById = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  PersonService.getPersonById(id)
    .then((person) => {
      res.json({ data: person, status: 'success' });
    })
    .catch((error) =>
      res.status(500).json({ error: error.message, status: 'error' })
    );
};

const deletePerson = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  PersonService.deletePerson(id)
    .then((person) => {
      res.json({ data: person, status: 'success' });
    })
    .catch((error) =>
      res.status(500).json({ error: error.message, status: 'error' })
    );
};

const createPerson = (req, res) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  PersonService.createPerson(person)
    .then((savedPerson) => {
      res.json({ data: savedPerson, status: 'success' });
    })
    .catch((error) =>
      res.status(500).json({ error: error.message, status: 'error' })
    );
};

const updatePerson = (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  PersonService.updatePerson(id, person)
    .then((updatedPerson) => {
      res.json({ data: updatedPerson, status: 'success' });
    })
    .catch((error) =>
      res.status(500).json({ error: error.message, status: 'error' })
    );
};

const getInfo = (req, res) => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  const dateString = date.toDateString();
  PersonService.getPersons().then((persons) => {
    res.send(
      `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${dateString} ${time}</p>
        `
    );
  });
};

export default {
  getPersons,
  getPersonById,
  deletePerson,
  createPerson,
  updatePerson,
  getInfo,
};
