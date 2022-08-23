const { Router } = require('express');
const {
  getPersons,
  getInfo,
  getPersonById,
  deletePerson,
  createPerson,
  updatePerson,
} = require('../controllers/PersonController');

const router = Router();

router.get('/', getPersons);
router.get('/info', getInfo);
router.get('/:id', getPersonById);
router.delete('/:id', deletePerson);
router.post('/', createPerson);
router.put('/:id', updatePerson);

module.exports = router;
