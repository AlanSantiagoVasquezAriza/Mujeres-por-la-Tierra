import { useState, useEffect } from "react";
import { Foro } from "./components";
import { postMessage, getMessages } from "./api/mensajes.ts";
import { supabase } from "./supabase/client.ts";
import { useNavigate } from "react-router-dom";

interface MessageType {
  id: number;
  mensaje: string;
}

const App = () => {
  const navigate = useNavigate();

  const [mensaje, setMensaje] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<unknown>();

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((session: any) => {
  //     if (!session) {
  //       navigate("/login");
  //     } else {
  //       navigate("/");
  //     }
  //   });
  // }, []);

  useEffect(() => {
    listMessages();
  }, []);

  const publishMessage = async () => {
    try {
      await postMessage(inputValue);
      listMessages();
      setError("");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const listMessages = async () => {
    try {
      const response = await getMessages();
      setMensaje(response?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // e: React.FormEvent<HTMLButtonElement>
  const handleOnSubmit = () => {
    if (inputValue.trim() === "") return;
    publishMessage();
    setInputValue("");

    // setMensaje((prev) => [...(prev ?? []), inputValue]); // Esto es para guardarlos y recorrerlas aca solo en el
    // front pero lo vamos a hacer desde los datos del backend
    // console.log(mensaje);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 font-inter">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Foro de Discusión
        </h1>
        <div className="flex space-x-2">
          <input
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            type="text"
            placeholder="Escribe tu mensaje..."
            value={inputValue}
            onChange={handleOnChange}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            onClick={handleOnSubmit}
          >
            Enviar
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {mensaje.map((msj, index) => (
            <Foro msj={msj.mensaje} key={index} />
          ))}
        </div>
        {error instanceof Error && (
          <h1 className="text-red-500">
            Haz enviado mas de 5 mensajes tienes que esperar 1 min
          </h1>
        )}
      </div>
    </div>
  );
};

export default App;
