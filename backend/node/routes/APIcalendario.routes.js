import express from 'express';
import {getAllevents, createEvent, getEventsById, updateEventById, deleteEventById} from '../controllers/APIcalendario.controller.js';

const router = express.Router();

// Rutas para obtener ubicaciones del microservicio
// Rutas para /api/events
router.route('/')
  .get(getAllevents)
  .post(createEvent);

// Rutas para /api/events/:id
router.route('/:id')
  .get(getEventsById)
  .put(updateEventById)
  .delete(deleteEventById);

export default router;