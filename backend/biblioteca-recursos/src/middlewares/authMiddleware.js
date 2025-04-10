// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: 'Token no proporcionado' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.decode(token);

    if (!decoded || !decoded.sub) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    // ✅ Extrae el rol desde Supabase (usualmente en app_metadata)
    const userRole = decoded.app_metadata?.role || 'user';

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: userRole,
    };

    next();
  } catch (err) {
    console.error(err); 
    return res.status(401).json({ error: 'Error de autenticación' });
  }

};

// Middleware específico para admins
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado: solo administradoras' });
  }
  next();
};

module.exports = { authenticate, requireAdmin };
