import axios from "axios";

export const getEstaciones = async () => {
  const { data } = await axios.get("http://localhost:3000/estaciones");
  return data;
};

export const getEstacion = async (id: string) => {
  const { data } = await axios.get(`http://localhost:3000/estaciones/${id}`);
  return data;
};

export const postEstacion = async (estacion: any) => {
  const { data } = await axios.post(
    "http://localhost:3000/estaciones",
    estacion
  );
  return data;
};

export const putEstacion = async (id: string, estacion: any) => {
  const { data } = await axios.put(
    `http://localhost:3000/estaciones/${id}`,
    estacion
  );
  return data;
};

export const deleteEstacion = async (id: string) => {
  const { data } = await axios.delete(`http://localhost:3000/estaciones/${id}`);
  return data;
};
