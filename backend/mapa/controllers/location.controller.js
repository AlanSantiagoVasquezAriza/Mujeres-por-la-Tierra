const Location = require('../models/Location');

// Obtener todas las ubicaciones
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ubicaciones', error: error.message });
  }
};

// Obtener una ubicación por ID
exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Ubicación no encontrada' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la ubicación', error: error.message });
  }
};

// Crear una nueva ubicación
exports.createLocation = async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la ubicación', error: error.message });
  }
};

// Actualizar una ubicación
exports.updateLocation = async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLocation) {
      return res.status(404).json({ message: 'Ubicación no encontrada' });
    }
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la ubicación', error: error.message });
  }
};

// Eliminar una ubicación
exports.deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);
    if (!deletedLocation) {
      return res.status(404).json({ message: 'Ubicación no encontrada' });
    }
    res.status(200).json({ message: 'Ubicación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la ubicación', error: error.message });
  }
};

// Buscar ubicaciones cercanas
exports.getNearbyLocations = async (req, res) => {
  try {
    const { lat, lng, distance } = req.params;
    
    const locations = await Location.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(distance) * 1000 // Convertir km a metros
        }
      }
    });
    
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar ubicaciones cercanas', error: error.message });
  }
};