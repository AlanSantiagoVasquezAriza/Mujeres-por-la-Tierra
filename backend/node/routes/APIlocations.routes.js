import express from 'express';
import {getAllLocations, getLocationById, getNearbyLocationsForEvent} from '../controllers/APIlocation.controller.js';

const router = express.Router();

// Rutas para obtener ubicaciones del microservicio
router.get('/', getAllLocations);
router.get('/:id', getLocationById);
//router.get('api/events/:eventId/nearby-locations/:distance', getNearbyLocationsForEvent);

export default router;