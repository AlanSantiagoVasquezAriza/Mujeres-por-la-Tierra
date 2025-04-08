import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv"; // Libreria para que desde js lea las variables en el .env
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);