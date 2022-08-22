import Person from '../models/person.js';

const getPersons = () => {
  return Person.find({});
};

const getPersonById = (id) => {
  return Person.findById(id);
};

const deletePerson = (id) => {
  return Person.findByIdAndDelete(id);
};

const createPerson = (person) => {
  return Person.create(person);
};

const updatePerson = (id, person) => {
  return Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  });
};

export default {
  getPersons,
  getPersonById,
  deletePerson,
  createPerson,
  updatePerson,
};
