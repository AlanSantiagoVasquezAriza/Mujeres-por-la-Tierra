import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser, loginByPassword, loginByMagicLink } from "../api/users.ts";
import { supabase } from "../supabase/client.ts";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMethod, setAuthMethod] = useState<"password" | "magic-link">(
    "password"
  );
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (authMethod === "password") {
        await loginByPassword({ email, password });
        navigate("/");
      } else {
        await supabase.auth.signInWithOtp({ email });
        // await loginByMagicLink({ email });
        alert("Revisa tu correo para el enlace mágico ✨");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const checkUserExists = async () => {
    const user = await checkUser();
    if (user.data) navigate("/");
  };

  useEffect(() => {
    checkUserExists();
  }, []);

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
