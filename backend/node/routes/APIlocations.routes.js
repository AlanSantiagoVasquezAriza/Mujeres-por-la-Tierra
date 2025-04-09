import express from 'express';
import {getAllLocations, getLocationById, createLocation, updateLocation, deleteLocation} from '../controllers/APIlocation.controller.js';

const router = express.Router();

// Rutas para obtener ubicaciones del microservicio
router.route('/')
    .get(getAllLocations)
    .post(createLocation);

router.route('/:id')
    .get(getLocationById)
    .put(updateLocation)
    .delete(deleteLocation);

export default router;