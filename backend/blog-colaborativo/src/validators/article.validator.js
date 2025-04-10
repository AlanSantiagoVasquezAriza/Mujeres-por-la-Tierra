const { body } = require('express-validator');

const createArticleValidator = [
  body('title')
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 5 }).withMessage('El título debe tener al menos 5 caracteres'),

  body('content')
    .notEmpty().withMessage('El contenido es obligatorio')
    .isLength({ min: 20 }).withMessage('El contenido debe tener al menos 20 caracteres'),
];

module.exports = {
  createArticleValidator,
};
