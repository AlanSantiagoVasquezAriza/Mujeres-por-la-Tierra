import axios from 'axios';
import Event from '../models/Event.js';

const LOCATION_SERVICE_URL = 'http://localhost:3001'; // URL del microservicio de ubicación

// Obtener ubicaciones cercanas a un evento
export const getNearbyLocationsForEvent = async (req, res) => {
  try {
    const { eventId, distance } = req.params;
    
    // Obtener el evento para conseguir sus coordenadas
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    
    // Extraer la latitud y longitud del evento
    const lat = event.location.coordinates[1]; // Latitud
    const lng = event.location.coordinates[0]; // Longitud
    
    // Llamar al microservicio de ubicación para obtener ubicaciones cercanas
    const response = await axios.get(`${LOCATION_SERVICE_URL}/nearby/${lat}/${lng}/${distance}`);
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al obtener ubicaciones cercanas:', error);
    res.status(500).json({ 
      message: 'Error al obtener ubicaciones cercanas', 
      error: error.response?.data || error.message 
    });
  }
};

// Obtener todas las ubicaciones
export const getAllLocations = async (req, res) => {
  try {
    const response = await axios.get(LOCATION_SERVICE_URL);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al obtener ubicaciones:', error);
    res.status(500).json({ 
      message: 'Error al obtener ubicaciones', 
    });
  }
};

// Obtener una ubicación por ID
export const getLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${LOCATION_SERVICE_URL}/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al obtener ubicación:', error);
    if (error.response?.status === 404) {
      return res.status(404).json({ message: 'Ubicación no encontrada' });
    }
    res.status(500).json({ 
      message: 'Error al obtener ubicación', 
      error: error.response?.data || error.message 
    });
  }
};