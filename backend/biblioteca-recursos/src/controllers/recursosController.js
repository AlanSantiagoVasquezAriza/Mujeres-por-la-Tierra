const supabase = require('../lib/supabaseClient');

// Obtener colección con filtros, orden y paginación
const obtenerRecursos = async (req, res) => {
  const { categoria, orden = 'creado_en', limite = 10, desde = 0 } = req.query;

  let query = supabase.from('recursos').select('*');

  if (categoria) query = query.eq('categoria', categoria);
  query = query.order(orden, { ascending: true }).range(Number(desde), Number(desde) + Number(limite) - 1);

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });

  const dataConLinks = data.map(r => ({
    ...r,
    _links: {
      self: `/api/v1/recursos/${r.id}`,
      editar: `/api/v1/recursos/${r.id}`,
      eliminar: `/api/v1/recursos/${r.id}`
    }
  }));

  res.json(dataConLinks);
};

// Obtener un recurso por ID
const obtenerRecursoPorId = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('recursos').select('*').eq('id', id).single();

  if (error) return res.status(404).json({ error: 'Recurso no encontrado' });

  data._links = {
    self: `/api/v1/recursos/${data.id}`,
    editar: `/api/v1/recursos/${data.id}`,
    eliminar: `/api/v1/recursos/${data.id}`
  };

  res.json(data);
};

// Crear recurso
const crearRecurso = async (req, res) => {
  const { titulo, descripcion, url_archivo, categoria, creado_por } = req.body;

  const { data, error } = await supabase.from('recursos').insert([{
    titulo,
    descripcion,
    url_archivo,
    categoria,
    creado_por
  }]).select().single();

  if (error) return res.status(500).json({ error: error.message });

  data._links = {
    self: `/api/v1/recursos/${data.id}`,
    editar: `/api/v1/recursos/${data.id}`,
    eliminar: `/api/v1/recursos/${data.id}`
  };

  res.status(201).json(data);
};

// Actualizar recurso
const actualizarRecurso = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, url_archivo, categoria } = req.body;

  const { data, error } = await supabase
    .from('recursos')
    .update({ titulo, descripcion, url_archivo, categoria })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  data._links = {
    self: `/api/v1/recursos/${data.id}`,
    editar: `/api/v1/recursos/${data.id}`,
    eliminar: `/api/v1/recursos/${data.id}`
  };

  res.json(data);
};

// Eliminar recurso
const eliminarRecurso = async (req, res) => {
    const { id } = req.params;
  
    // Verificar si el recurso existe antes de intentar eliminarlo
    const { data: recurso, error: errorBuscar } = await supabase
      .from('recursos')
      .select('id')
      .eq('id', id)
      .single();
  
    if (errorBuscar || !recurso) {
      return res.status(404).json({ error: 'El recurso no existe o ya fue eliminado' });
    }
  
    const { error } = await supabase.from('recursos').delete().eq('id', id);
  
    if (error) return res.status(500).json({ error: 'Error al eliminar el recurso' });
  
    return res.status(200).json({ mensaje: `Recurso con ID ${id} eliminado exitosamente` });
  };
  

module.exports = {
  obtenerRecursos,
  obtenerRecursoPorId,
  crearRecurso,
  actualizarRecurso,
  eliminarRecurso,
};
