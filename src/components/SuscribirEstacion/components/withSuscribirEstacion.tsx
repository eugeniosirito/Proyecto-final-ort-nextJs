// /* eslint-disable react-hooks/rules-of-hooks */
// import { useState } from "react";

// // eslint-disable-next-line react/display-name
// const WithSuscribirEstacion = Component => props => {


//   const [values, setValues] = useState({
//     name: "",
//     lastName: "",
//     email: "",
//     model: "",
//     description: "",
//     sensors: 0,
//     dataPublication: "",
//     longitude: 0,
//     latitude: 0,
//     desc: "",
//   });

//   const [contactValues, setContactValues] = useState([
//     { label: "Nombre", name: "name", value: "" },
//     { label: "Apellido", name: "lastName", value: "" },
//     { label: "Mail", name: "email", value: "" },
//   ]);
//   const [stationValues, setStationValues] = useState([
//     { label: "Modelo", name: "model", value: "" },
//     { label: "Descripción", name: "description", value: "" },
//     { label: "Sensores", name: "sensors", value: "" },
//     { label: "Publicacion de información", name: "dataPublication", value: "" },
//   ]);
//   const [locationValues, setLocationValues] = useState([
//     { label: "Longitud", name: "longitude", value: "" },
//     { label: "Latitud", name: "latitude", value: "" },
//     { label: "Descripción", name: "desc", value: "" },
//   ]);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setValues((prevValores) => ({ ...prevValores, [name]: value }));
//   };

//   const handleGuardar = () => {
//     console.log(values);
//   };

//   const actionsSuscribirEstacion = {
//     values,
//     contactValues,
//     stationValues,
//     locationValues,
//     handleChange,
//     handleGuardar,
//   };

//   return (
//     <>
//       <Component {...props} {...actionsSuscribirEstacion} />
//     </>
//   )
// };

// export default WithSuscribirEstacion;
