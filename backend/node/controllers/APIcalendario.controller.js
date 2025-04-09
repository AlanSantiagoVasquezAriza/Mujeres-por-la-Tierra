import axios from 'axios';

const LOCATION_SERVICE_URL = 'http://localhost:3002'; // URL del microservicio de ubicación

// Obtener todas las ubicaciones
export const getAllevents = async (req, res) => {
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

export const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const response = await axios.post(LOCATION_SERVICE_URL, eventData);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error al crear evento:', error);
    res.status(500).json({ 
      message: 'Error al crear evento', 
      error: error.response?.data || error.message 
    });
  }
};

// Obtener una ubicación por ID
export const getEventsById = async (req, res) => {
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

// Actualizar una ubicación por ID
export const updateEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const eventData = req.body;
    const response = await axios.put(`${LOCATION_SERVICE_URL}/${id}`, eventData);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    if (error.response?.status === 404) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(500).json({ 
      message: 'Error al actualizar evento', 
      error: error.response?.data || error.message 
    });
  }
};

// Eliminar una ubicación por ID
export const deleteEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(`${LOCATION_SERVICE_URL}/${id}`);
    res.status(200).json({ message: 'Evento eliminado correctamente', data: response.data });
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    if (error.response?.status === 404) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(500).json({ 
      message: 'Error al eliminar evento', 
      error: error.response?.data || error.message 
    });
  }
};