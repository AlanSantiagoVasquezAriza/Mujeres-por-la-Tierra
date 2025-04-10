// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  console.error('Error capturado:', err.stack);
  res.status(500).json({ error: 'Algo salió mal 😵' });
};
