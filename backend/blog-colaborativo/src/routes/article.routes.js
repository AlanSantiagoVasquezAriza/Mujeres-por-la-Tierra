const express = require('express');
const router = express.Router();

const {
  createArticle,
  getAllArticles,
  approveArticle,
} = require('../controllers/article.controller');

const {
  createArticleValidator,
} = require('../validators/article.validator');

const validationResultHandler = require('../middlewares/validationResultHandler');
const { authenticate, requireAdmin } = require('../middlewares/authMiddleware');

router.get('/', getAllArticles);

router.post(
  '/',
  authenticate,
  createArticleValidator,
  validationResultHandler,
  createArticle
);

// Aprobar/rechazar artículo (solo admin)
router.patch(
  '/:id/approve',
  authenticate,
  requireAdmin,
  approveArticle
);

module.exports = router;
