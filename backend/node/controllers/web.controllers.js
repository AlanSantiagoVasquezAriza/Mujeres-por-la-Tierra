import { supabase } from "../supabase/client.js";

export const checkUserDB = async (req, res) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

export const onLogout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    res.send(error);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

export const onLoginByPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(error);
    res.send(error);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

export const onLoginByMagicLink = async (req, res) => {
  try {
    const { email } = req.body;
    const { data, error } = await supabase.auth.signInWithOtp({ email });
    res.send({ data, error });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

export const onRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    res.send({ data, error });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

// Prueba

export const onLogin = async (req, res) => {
  try {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: "wodawi8582@movfull.com",
      password: "nnnnnn",
    });
    res.send(data);
    console.log("Estoy en onLogin");
  } catch (error) {
    res.send(error);
    console.log("Ocurrio un error en login", error);
  }
};

export const get = async (req, res) => {
  try {
    const { data, error } = await supabase.from("prueba").select("*");
    res.send(data);
    console.log(data, error);
    console.log("holaaaaa desde get");
  } catch (error) {
    res.send(error);
  }
};
