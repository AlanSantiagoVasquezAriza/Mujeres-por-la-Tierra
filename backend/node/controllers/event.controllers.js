import Event from '../models/Event.js';

// @desc    Obtener todos los eventos
// @route   GET /api/events
// @access  Privado
export const getEvents = async (req, res) => {
    try {
        const { userId, startDate, endDate } = req.query;
        
        // Construir filtro de consulta
        let query = {};
        
        // Filtrar por usuario
        if (userId) {
            query.userId = userId;
        }
        
        // Filtrar por rango de fechas
        if (startDate && endDate) {
            query.startDate = { $gte: new Date(startDate) };
            query.endDate = { $lte: new Date(endDate) };
        }
        
        const events = await Event.find(query).sort({ startDate: 1 });
        
        res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener eventos',
            error: error.message
        });
    }
};

// @desc    Obtener un evento por ID
// @route   GET /api/events/:id
// @access  Privado
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Evento no encontrado'
            });
        }
        
        res.status(200).json({
            success: true,
            data: event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el evento',
            error: error.message
        });
    }
};

// @desc    Crear un nuevo evento
// @route   POST /api/events
// @access  Privado
export const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        
        res.status(201).json({
            success: true,
            data: event
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                error: messages
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error al crear el evento',
            error: error.message
        });
    }
};

// @desc    Actualizar un evento
// @route   PUT /api/events/:id
// @access  Privado
export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Evento no encontrado'
            });
        }
        
        // Verificar que el usuario es dueño del evento
        if (event.userId !== req.body.userId) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para actualizar este evento'
            });
        }
        
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            data: updatedEvent
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                error: messages
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el evento',
            error: error.message
        });
    }
};

// @desc    Eliminar un evento
// @route   DELETE /api/events/:id
// @access  Privado
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Evento no encontrado'
            });
        }
        
        // Verificar que el usuario es dueño del evento
        if (event.userId !== req.query.userId) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para eliminar este evento'
            });
        }
        
        await event.remove();
        
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el evento',
            error: error.message
        });
    }
};