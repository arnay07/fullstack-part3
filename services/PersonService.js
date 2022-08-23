const Person = require('../models/person');

const getPersons = () => Person.find({});

const getPersonById = (id) => Person.findById(id);

const deletePerson = (id) => Person.findByIdAndDelete(id);

const createPerson = (person) => Person.create(person);

const updatePerson = (id, person) =>
  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  });

module.exports = {
  getPersons,
  getPersonById,
  deletePerson,
  createPerson,
  updatePerson,
};
