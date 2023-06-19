export const dateFormatted = (date) => {
  const fechaOriginal = date;
  const fecha = new Date(fechaOriginal);

  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const anio = fecha.getFullYear().toString();
  const horas = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  const segundos = fecha.getSeconds().toString().padStart(2, "0");

  const fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

  return fechaFormateada;
};
