import { supabase } from "../supabase/client.js";

export const getCurrentUserController = async (req, res) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutController = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) return res.status(500).json({ message: error.message });

    res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Error al cerrar sesión" });
  }
};

export const loginWithPasswordController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña requeridos" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(401).json({ message: error.message });

    res.status(200).json({ user: data.user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error en el inicio de sesión" });
  }
};

export const loginWithMagicLinkController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email requerido" });
    }

    const { data, error } = await supabase.auth.signInWithOtp({ email });

    if (error) return res.status(500).json({ message: error.message });

    res.status(200).json({ message: "Enlace mágico enviado", data });
  } catch (error) {
    console.error("Magic link login error:", error);
    res.status(500).json({ message: "Error al enviar el enlace mágico" });
  }
};

export const registerUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña requeridos" });
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return res.status(400).json({ data, error });

    res.status(201).json({ message: "Usuario registrado", user: data.user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};
