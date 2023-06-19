import axios from "axios";

export const getEstaciones = async () => {
  const { data } = await axios.get("http://localhost:3000/stations");
  return data;
};

export const getEstacion = async (id: string) => {
  const { data } = await axios.get(`http://localhost:3000/stations/${id}`);
  return data;
};

export const postEstacion = async (estacion: any) => {
  const { data } = await axios.post(
    "http://localhost:3000/stations/",
    estacion
  );
  return data;
};

export const deleteEstacion = async (id: string) => {
  const { data } = await axios.delete(`http://localhost:3000/stations/${id}`);
  return data;
};

export const patchEstacion = async (id: string, bodyEditado: any) => {
  const { data } = await axios.patch(
    `http://localhost:3000/stations/${id}`,
    bodyEditado
  );
  return data;
};

/* SENSORES */

export const postSensor = async (sensor: any) => {
  const { data } = await axios.post("http://localhost:3000/sensors/", sensor);
  return data;
};

export const getSensor = async (id: string) => {
  const { data } = await axios.get(`http://localhost:3000/sensors/${id}`);
  return data;
};

export const deleteSensor = async (id: string) => {
  const { data } = await axios.delete(`http://localhost:3000/sensors/${id}`);
  return data;
};
