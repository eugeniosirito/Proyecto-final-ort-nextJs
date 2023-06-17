import axios from "axios";

/* getEstaciones mockeado a modo de ejemplo con mockapi.io */

export const getEstaciones = async () => {
  const { data } = await axios.get(
    "https://646faee909ff19b12087a570.mockapi.io/postEstacion"
  );
  return data;
};

export const getEstacion = async (id: string) => {
  const { data } = await axios.get(`http://localhost:3000/stations/${id}`);
  return data;
};

/* postEstaciones mockeado a modo de ejemplo con mockapi.io */

export const postEstacion = async (estacion: any) => {
  const { data } = await axios.post(
    "http://localhost:3000/stations/",
    estacion
  );
  return data;
};

export const deleteEstacion = async (id: string) => {
  const { data } = await axios.delete(`http://localhost:3000/estaciones/${id}`);
  return data;
};

/* SENSORES */

export const postSensor = async (sensor: any) => {
  const { data } = await axios.post("http://localhost:3000/sensors/", sensor);
  return data;
};
