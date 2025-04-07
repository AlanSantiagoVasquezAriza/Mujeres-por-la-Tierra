import { supabase } from "../supabase/client.js";

export const get = async (req, res) => {
  try {
    const { data, error } = await supabase.from("prueba").select("*");
    res.send(data);
    console.log(data, error);
  } catch (error) {
    res.send(error);
  }
};
