const { body } = require('express-validator');

const validarRecursoPOST = [
  body('titulo')
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres'),

  body('url_archivo')
    .notEmpty().withMessage('La URL del archivo es obligatoria')
    .isURL().withMessage('La URL del archivo no es válida'),

  body('categoria')
    .optional()
    .isLength({ min: 2 }).withMessage('La categoría debe tener al menos 2 caracteres'),

  body('descripcion')
    .optional()
    .isLength({ max: 500 }).withMessage('La descripción no debe superar 500 caracteres'),

  body('creado_por')
    .notEmpty().withMessage('El campo "creado_por" es obligatorio'),
];

const validarRecursoPUT = [
  body('titulo')
    .optional()
    .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres'),

  body('url_archivo')
    .optional()
    .isURL().withMessage('La URL del archivo no es válida'),

  body('categoria')
    .optional()
    .isLength({ min: 2 }),

  body('descripcion')
    .optional()
    .isLength({ max: 500 }),
];

module.exports = {
  validarRecursoPOST,
  validarRecursoPUT,
};
