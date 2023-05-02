import React, { useState } from "react";
import { Grid, Container, TextField, Button, Typography } from '@mui/material'
import styles from './styles.module.css';

const SuscribirEstacion = () => {

  interface Values {
    name: string;
    lastName: string;
    email: string;
    model: string;
    description: string;
    sensors: number;
    dataPublication: string;
    longitude: number;
    latitude: number;
    desc: string;
  }
  const [values, setValues] = useState<Values>({
    name: '',
    lastName: '',
    email: '',
    model: '',
    description: '',
    sensors: 0,
    dataPublication: '',
    longitude: 0,
    latitude: 0,
    desc: ''
  })
  
  const [contactValues, setContactValues] = useState([
    { label: 'Nombre', name: 'name', value: '' },
    { label: 'Apellido', name: 'lastName', value: '' },
    { label: 'Mail', name: 'email', value: '' },
  ]);
  const [stationValues, setStationValues] = useState([
    { label: 'Modelo', name: 'model', value: '' },
    { label: 'Descripción', name: 'description', value: '' },
    { label: 'Sensores', name: 'sensors', value: '' },
    { label: 'Publicacion de información', name: 'dataPublication', value: '' },
  ]);
  const [locationValues, setLocationValues] = useState([
    { label: 'Longitud', name: 'longitude', value: '' },
    { label: 'Latitud', name: 'latitude', value: '' },
    { label: 'Descripción', name: 'desc', value: '' },
  ]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(prevValores => ({ ...prevValores, [name]: value }));
  };

  const handleGuardar = () => {
    console.log(values);
  };

  return (
    <>
      <Typography marginTop={4} marginBottom={2} color={'black'}>Contacto</Typography>
      <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} padding={2}>
        {contactValues.map((item, i) => (
          <Grid item key={i}>
            <TextField name={item.name} label={item.label} variant="outlined" onChange={handleChange} />
          </Grid>
        ))}
      </Grid>
      <Typography marginTop={5} marginBottom={2} color={'black'}>Estación</Typography>
      <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} padding={2}>
        {stationValues.map((item, i) => (
          <Grid item key={i}>
            <TextField name={item.name} label={item.label} variant="outlined" onChange={handleChange} />
          </Grid>
        ))}
      </Grid>
      <Typography marginTop={5} marginBottom={2} color={'black'}>Ubicación</Typography>
      <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} padding={1}>
        {locationValues.map((item, i) => (
          <Grid item key={i}>
            <TextField name={item.name} label={item.label} variant="outlined" onChange={handleChange} />
          </Grid>
        ))}
      </Grid>
      <Grid padding={1}>
        <Button variant="contained" className={styles.btnRegistrar} color="success" size="large" onClick={handleGuardar}>Registrar</Button>
      </Grid>
    </>
  )
}

export default SuscribirEstacion;