import React, { useEffect, useState } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { arMill } from "@react-jvectormap/argentina";
import { southAmericaMill } from "@react-jvectormap/southamerica";
import { IngresoEstacionValues } from "@/utils/interfaces";
import { getEstaciones } from "@/services";

const VectorMapV2 = () => {

  return (
    <VectorMap
      map={arMill} // Utiliza el mapa deseado, por ejemplo 'arMill' para el mapa de Argentina
      backgroundColor="rgb(12, 52, 110)" // color del fondo
      markerStyle={{
        //color del marcador
        initial: {
          fill: "#FF0000",
          stroke: "#FF0000",
        },
        hover: {
          fill: "#FF0000",
          stroke: "#FF0000",
        },
      }}
      markers={[
        // posición y nombre del marcador en el mapa
        {
          latLng: [-37.597205, -65.678607], // Aquí puedes colocar las coordenadas de latitud y longitud de tu punto
          name: "Punto1, Estación de humedad",
        },
        {
          latLng: [-37.597205, -65.678607], // Aquí puedes colocar las coordenadas de latitud y longitud de tu punto
          name: "Punto2, Estación de temperatura",
        },
        {
          latLng: [-25.078169, -63.760239], // Aquí puedes colocar las coordenadas de latitud y longitud de tu punto
          name: "Punto3, Estación de presión",
        },
      ]}
    />
  );
};

export default VectorMapV2;
