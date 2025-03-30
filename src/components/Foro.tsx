export const Foro = ({ msj }: { msj: string }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <p className="text-lg text-gray-700 font-medium">{msj}</p>
    </div>
  );
};
