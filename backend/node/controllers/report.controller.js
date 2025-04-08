import { supabase } from "../supabase/client.js";

export const createReport = async (req, res) => {
  const { title, description, category, created_by } = req.body;

  console.log("BODY recibido:", req.body);

  try {
    const { data, error } = await supabase.from("reports").insert([
      {
        title,
        description,
        category,
        created_by,
      },
    ]);

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      console.error("Error insertando reporte:", JSON.stringify(error, null, 2));
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: "Reporte creado exitosamente", data });
  } catch (err) {
    console.error("Error interno:", err);
    res.status(500).json({ error: "Error del servidor", details: err.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const { data, error } = await supabase.from("reports").select("*");

    if (error) {
      console.error("Error obteniendo reportes:", error);
      return res.status(500).json({ error });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error interno:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const updateReport = async (req, res) => {
  const { id } = req.params; // ID del reporte a actualizar
  const { title, description, category } = req.body;

  try {
    const { data, error } = await supabase
      .from("reports")
      .update({ title, description, category })
      .eq("id", id); // Asegúrate de que el campo sea 'id'

    if (error) {
      console.error("Error actualizando reporte:", error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Reporte actualizado", data });
  } catch (err) {
    console.error("Error interno:", err);
    res.status(500).json({ error: "Error del servidor", details: err.message });
  }
};


export const deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("reports")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error eliminando reporte:", error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Reporte eliminado", data });
  } catch (err) {
    console.error("Error interno:", err);
    res.status(500).json({ error: "Error del servidor", details: err.message });
  }
};


