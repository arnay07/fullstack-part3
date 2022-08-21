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

const addPerson = (person) => {
  return Person.create(person);
};

const updatePerson = (id, person) => {
  return Person.findByIdAndUpdate(id, person, { new: true });
};

export default {
  getPersons,
  getPersonById,
  deletePerson,
  addPerson,
  updatePerson,
};
