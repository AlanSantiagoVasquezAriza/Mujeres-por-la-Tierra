const express = require('express');
const {getAllLocations, getLocationById, createLocation, updateLocation, deleteLocation, getNearbyLocations} = require('../controllers/location.controller');
const router = express.Router();

// Obtener todas las ubicaciones
router.get('/', getAllLocations);

// Obtener una ubicación por ID
router.get('/:id', getLocationById);

// Crear una nueva ubicación
router.post('/', createLocation);

// Actualizar una ubicación
router.put('/:id', updateLocation);

// Eliminar una ubicación
router.delete('/:id', deleteLocation);

// Buscar ubicaciones por proximidad
router.get('/nearby/:lat/:lng/:distance', getNearbyLocations);

module.exports = router;