import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser, logout } from "../api/users.ts";

export function Home() {
  const navigate = useNavigate();

  const checkUserExists = async () => {
    const user = await checkUser();
    if (!user.data) navigate("/login");
  };

  useEffect(() => {
    checkUserExists();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // redirige al login después del logout
  };

  return (
    <div>
      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
