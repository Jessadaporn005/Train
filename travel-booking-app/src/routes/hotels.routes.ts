import { Router } from 'express';
import { HotelsController } from '../controllers/hotels.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { createHotelSchema } from '../validators/schemas';

const router = Router();
const hotelsController = new HotelsController();

router.get('/', hotelsController.getAllHotels.bind(hotelsController));
router.get('/:id', hotelsController.getHotelById.bind(hotelsController));
router.post('/', validateBody(createHotelSchema), hotelsController.createHotel.bind(hotelsController));
router.put('/:id', hotelsController.updateHotel.bind(hotelsController));
router.delete('/:id', hotelsController.deleteHotel.bind(hotelsController));

export default router;