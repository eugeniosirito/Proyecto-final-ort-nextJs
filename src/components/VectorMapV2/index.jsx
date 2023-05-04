import React from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { arMill } from "@react-jvectormap/argentina";
import { southAmericaMill } from "@react-jvectormap/southamerica";

const VectorMapV2 = () => {
  return <VectorMap map={southAmericaMill} backgroundColor="rgb(35, 48, 68)" />;
};

export default VectorMapV2;
