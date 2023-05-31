import React from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { arMill } from "@react-jvectormap/argentina";
import { southAmericaMill } from "@react-jvectormap/southamerica";

const VectorMapV2 = () => {
  const mapData = {
    US: 100, // Puedes ajustar el valor según tus necesidades
    // Otros códigos de país y sus valores correspondientes
  };

  const mapOptions = {
    // Configura las opciones del mapa según tus necesidades
    backgroundColor: "#ffffff",
    // ...
  };

  return (
    <VectorMap
      map={arMill} // Utiliza el mapa deseado, por ejemplo 'arMill' para el mapa de Argentina
      backgroundColor="rgb(35, 48, 68)" // color del fondo
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
          latLng: [-34.510986, -58.497743], // Aquí puedes colocar las coordenadas de latitud y longitud de tu punto
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
