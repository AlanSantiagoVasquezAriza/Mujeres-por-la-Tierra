import axios from 'axios';

const LOCATION_SERVICE_URL = 'http://localhost:3001'; // URL del microservicio de ubicación

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

// Crear una nueva ubicación
export const createLocation = async (req, res) => {
  try {
    const newLocation = req.body;
    const response = await axios.post(LOCATION_SERVICE_URL, newLocation);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error al crear ubicación:', error);
    res.status(500).json({ 
      message: 'Error al crear ubicación', 
      error: error.response?.data || error.message 
    });
  }
};

// Actualizar una ubicación existente
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLocation = req.body;
    const response = await axios.put(`${LOCATION_SERVICE_URL}/${id}`, updatedLocation);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al actualizar ubicación:', error);
    if (error.response?.status === 404) {
      return res.status(404).json({ message: 'Ubicación no encontrada' });
    }
    res.status(500).json({ 
      message: 'Error al actualizar ubicación', 
      error: error.response?.data || error.message 
    });
  }
};

// Eliminar una ubicación
export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${LOCATION_SERVICE_URL}/${id}`);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar ubicación:', error);
    if (error.response?.status === 404) {
      return res.status(404).json({ message: 'Ubicación no encontrada' });
    }
    res.status(500).json({ 
      message: 'Error al eliminar ubicación', 
      error: error.response?.data || error.message 
    });
  }
};