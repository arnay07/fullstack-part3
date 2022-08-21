import { Router } from 'express';
import PersonController from '../controllers/PersonController.js';

const router = Router();

router.get('/', PersonController.getPersons);
router.get('/info', PersonController.getInfo);
router.get('/:id', PersonController.getPersonById);
router.delete('/:id', PersonController.deletePerson);
router.post('/', PersonController.addPerson);
router.put('/:id', PersonController.updatePerson);

export default router;
