import express from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/event.controllers.js';

const router = express.Router();

// Rutas para /api/events
router.route('/')
  .get(getEvents)
  .post(createEvent);

// Rutas para /api/events/:id
router.route('/:id')
  .get(getEventById)
  .put(updateEvent)
  .delete(deleteEvent);

export default router;
