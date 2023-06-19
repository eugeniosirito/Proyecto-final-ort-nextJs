import { deleteSensor, patchEstacion } from "@/services";
import router from "next/router";
import { toast } from "react-toastify";

export const editarEstacion = (idEstacion: string, estacionEdit: any) => {
  const returnDeletePromise = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const resultado = await patchEstacion(idEstacion, estacionEdit);
        resolve(resultado);
        console.log("editado correctamente", resultado);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  toast.promise(returnDeletePromise, {
    pending: "Editando",
    success: "Sensor editado exitosamente 👌",
    error: "Ha occurido un error, vuelva a intentar mas tarde 🤯",
  });
};

export const deleteSensorOnClick = (sensorId: string) => {
  const returnDeletePromise = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const resultado = await deleteSensor(sensorId);
        resolve(resultado);
        router.reload();
        console.log("DELETE CORRECTO", resultado);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  toast.promise(returnDeletePromise, {
    pending: "Borrando sensor",
    success: "Sensor borrado exitosamente 👌",
    error: "Ha occurido un error, vuelva a intentar mas tarde 🤯",
  });
};
