export const get = async (req, res) => {
  try {
    res.send("Hola desde controller");
  } catch (error) {
    res.send(error);
  }
};
