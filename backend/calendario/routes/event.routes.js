const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/event.controller');

// Rutas para /api/events
router.route('/')
  .get(getEvents)
  .post(createEvent);

// Rutas para /api/events/:id
router.route('/:id')
  .get(getEventById)
  .put(updateEvent)
  .delete(deleteEvent);

module.exports = router;