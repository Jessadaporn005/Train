import { Router } from 'express';
import { AttractionsController } from '../controllers/attractions.controller';

const router = Router();
const attractionsController = new AttractionsController();

router.get('/', attractionsController.getAllAttractions.bind(attractionsController));
router.get('/:id', attractionsController.getAttractionById.bind(attractionsController));
router.post('/', attractionsController.createAttraction.bind(attractionsController));
router.put('/:id', attractionsController.updateAttraction.bind(attractionsController));
router.delete('/:id', attractionsController.deleteAttraction.bind(attractionsController));

export default router;