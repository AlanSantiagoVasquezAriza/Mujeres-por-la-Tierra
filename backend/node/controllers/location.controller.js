const Event = require('../models/Event');

exports.receiveLocationNotification = async (req, res) => {
  try {
    const { locationId, coordinates, name, eventId } = req.body;
    
    console.log(`Notificación de ubicación recibida: ${name}`, coordinates);
    
    // Si hay un ID de evento, actualizar el evento con la nueva ubicación
    if (eventId) {
      const event = await Event.findById(eventId);
      if (event) {
        // Suponiendo que el evento tiene un campo locations para guardar referencias
        if (!event.locations) {
          event.locations = [];
        }
        event.locations.push({
          locationId,
          name,
          coordinates
        });
        await event.save();
      }
    }
    
    res.status(200).json({ message: 'Notificación de ubicación recibida correctamente' });
  } catch (error) {
    console.error('Error al procesar notificación de ubicación:', error);
    res.status(500).json({ message: error.message });
  }
};