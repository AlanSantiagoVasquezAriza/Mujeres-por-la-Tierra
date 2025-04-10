const { validationResult } = require('express-validator');

const validationResultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => ({
      campo: err.param,
      mensaje: err.msg,
    }));
    return res.status(422).json({
      errores: extractedErrors,
    });
  }
  next();
};

module.exports = validationResultHandler;
