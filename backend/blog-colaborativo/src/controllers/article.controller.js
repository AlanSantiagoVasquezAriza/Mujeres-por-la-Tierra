const supabase = require('../lib/supabaseClient');

// Crear un nuevo artículo
const createArticle = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const author_id = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ error: 'Título y contenido son obligatorios' });
    }

    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          title,
          content,
          author_id,
          status: 'pending',
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'Artículo creado correctamente', data });
  } catch (err) {
    next(err);
  }
};


const getAllArticles = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*');

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createArticle,
  getAllArticles,
};

const approveArticle = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body; // Puede ser 'approved' o 'rejected'

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Estado inválido. Usa "approved" o "rejected".' });
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    res.json({ message: `Artículo ${status} correctamente`, data });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  approveArticle,
};
