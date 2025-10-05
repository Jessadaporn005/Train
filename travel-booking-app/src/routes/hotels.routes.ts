import { Router } from 'express';
import { HotelsController } from '../controllers/hotels.controller';

const router = Router();
const hotelsController = new HotelsController();

router.get('/', hotelsController.getAllHotels.bind(hotelsController));
router.get('/:id', hotelsController.getHotelById.bind(hotelsController));
router.post('/', hotelsController.createHotel.bind(hotelsController));
router.put('/:id', hotelsController.updateHotel.bind(hotelsController));
router.delete('/:id', hotelsController.deleteHotel.bind(hotelsController));

export default router;