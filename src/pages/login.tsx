import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabase/client.ts';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMethod, setAuthMethod] = useState<"password" | "magic-link">("password");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (authMethod === "password") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/");
      } else {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
        alert("Revisa tu correo para el enlace mágico ✨");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) navigate("/");
    };
    checkUser();
  }, [navigate]);

  return (
    <div>
      <h2>Iniciar sesión</h2>

      <div>
        <label>
          <input
            type="radio"
            name="authMethod"
            value="password"
            checked={authMethod === "password"}
            onChange={() => setAuthMethod("password")}
          />
          Con contraseña
        </label>

        <label>
          <input
            type="radio"
            name="authMethod"
            value="magic-link"
            checked={authMethod === "magic-link"}
            onChange={() => setAuthMethod("magic-link")}
          />
          Con enlace mágico
        </label>
      </div>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {authMethod === "password" && (
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}

        <button type="submit">
          {authMethod === "password" ? "Iniciar sesión" : "Enviar Magic Link"}
        </button>
      </form>
    </div>
  );
}

export default Login;
