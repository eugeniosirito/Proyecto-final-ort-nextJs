import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Typography, Box, Stepper, Step, StepLabel } from '@mui/material'
import styles from './styles.module.css';
import { getEstacion, getEstaciones, postEstacion } from "@/services";
import { IngresoEstacionValues } from "@/utils/interfaces";

const SuscribirEstacion = () => {

  /* acá se guarda la estación y sensor */


  const [ingresoSensor, setIngresoSensor] = useState({
    description: {
      value: '',
      metadata: {},
    },
    station_id: {
      value: '',
      metadata: '',
    }
  })

  const [ingresoEstacion, setIngresoEstacion] = useState<IngresoEstacionValues>({
    description: {
      value: '',
      metadata: {},
    },
    user: {
      value: {
        name: '',
        lastName: '',
        email: '',
        metadata: {},
      }
    },
    sensors: {
      value: [],
      metadata: {},
    },
    dataPublication: '',
    location: {
      coordinates: [],
      metadata: {},
    }
  })

  const handleChange = (fieldName: any, value: any) => {
    setIngresoEstacion(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleChangeSensor = (fieldName: any, value: any) => {
    setIngresoSensor(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleGuardar = () => {
    console.log('ESTACION', ingresoEstacion);
    console.log('SENSOR', ingresoSensor)
    suscribirEstacion();
  };

  /* llamado a las apis */

  const suscribirEstacion = async () => {
    try {
      const resultado = await postEstacion(ingresoEstacion);
      console.log(resultado, "post correcto");
    } catch (error) {
      console.error(error);
    }
  };

  /* acá empieza el step */

  const steps = ['Estación', 'Sensor', 'Resumen'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const ingresoEstacionFields = [
    {
      label: 'Name',
      stateKey: 'user',
      value: ingresoEstacion.user.value.name,
      handleChange: (value: any) => handleChange('user', { value: { ...ingresoEstacion.user.value, name: value }, metadata: {} }),
    },
    {
      label: 'Last Name',
      stateKey: 'user',
      value: ingresoEstacion.user.value.lastName,
      handleChange: (value: any) => handleChange('user', { value: { ...ingresoEstacion.user.value, lastName: value }, metadata: {} }),
    },
    {
      label: 'Email',
      stateKey: 'user',
      value: ingresoEstacion.user.value.email,
      handleChange: (value: any) => handleChange('user', { value: { ...ingresoEstacion.user.value, email: value }, metadata: {} }),
    },
    {
      label: 'Description',
      stateKey: 'description',
      value: ingresoEstacion.description.value,
      handleChange: (value: any) => handleChange('description', { value, metadata: {} }),
    },
    {
      label: 'Data Publication',
      stateKey: 'dataPublication',
      value: ingresoEstacion.dataPublication,
      handleChange: (value: any) => handleChange('dataPublication', value),
    },
    {
      label: 'Coordinates',
      stateKey: 'location',
      value: ingresoEstacion.location.coordinates.join(', '),
      handleChange: (value: any) => handleChange('location', { coordinates: value.split(', '), metadata: {} }),
    },
  ];

  const ingresoSensorFields = [
    {
      label: 'Tipo de sensor',
      stateKey: 'description',
      value: ingresoSensor.description.value,
      handleChangeSensor: (value: any) => handleChangeSensor('description', { value, metadata: {} }),
    },
    {
      label: 'Estación',
      stateKey: 'station_id',
      value: ingresoSensor.station_id.value,
      handleChangeSensor: (value: any) => handleChangeSensor('station_id', { value, metadata: {} }),
    },
  ]

  const resumenFields = [
    {
      label: 'Nombre',
      value: ingresoEstacion.user.value.name
    },
    {
      label: 'Apellido',
      value: ingresoEstacion.user.value.lastName
    },
    {
      label: 'Email',
      value: ingresoEstacion.user.value.email
    },
    {
      label: 'Descripción',
      value: ingresoEstacion.description.value
    },
    {
      label: 'Data publication',
      value: ingresoEstacion.dataPublication,
    },
    {
      label: 'Coordenadas/Locación',
      value: ingresoEstacion.location.coordinates,
    },
    {
      label: 'Tipo de sensor',
      value: ingresoSensor.description.value,
    },
    {
      label: 'Estación N°',
      value: ingresoSensor.station_id.value,
    },
  ]


  return (
    <>
      <Box paddingTop={5}>
        <Grid display={'flex'} flexDirection={'column'} padding={5} sx={{ backgroundColor: 'rgb(35, 48, 68)', margin: '0 auto' }} lg={10}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel sx={{
                    '& .MuiStepLabel-label.Mui-active': {
                      color: 'white',
                    },
                    '& .MuiStepLabel-label.Mui-completed': {
                      color: 'white',
                    },
                    '& .MuiStepLabel-label': {
                      color: 'white',
                    },
                  }} className={styles.stepperStyles} {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 ? (
                <Grid lg={12} xs={12}>
                  <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }} padding={12} >
                    {ingresoEstacionFields.map((field, index) => (
                      <TextField
                        key={index}
                        type="text"
                        label={field.label}
                        value={field.value}
                        onChange={e => field.handleChange(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.63)',
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.63)',
                          },
                          margin: '12px'
                        }}
                      />
                    ))}
                  </Grid>
                </Grid>
              ) : (activeStep === 1 ? (
                <Grid lg={12} xs={12}>
                  <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }} padding={12}>
                    {ingresoSensorFields.map((field, index) => (
                      <TextField
                        key={index}
                        type="text"
                        label={field.label}
                        value={field.value}
                        onChange={e => field.handleChangeSensor(e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.63)',
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.63)',
                          },
                          margin: '12px'
                        }}
                      />
                    ))}
                  </Grid>
                </Grid>
              ) :
                <Grid lg={12} xs={12} className={styles.leftContainer}>
                  <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }} padding={12}>
                    {resumenFields.map((index, i) => (
                      <Grid item key={i}>
                        <TextField label={index.label} value={index.value} variant="outlined" sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.63)',
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255, 255, 255, 0.63)',
                          },
                        }} />
                      </Grid>
                    ))}
                  </Grid>
                  <Grid padding={1}>
                    <Button variant="contained" className={styles.btnRegistrar} color="success" size="large" onClick={handleGuardar}>Registrar</Button>
                  </Grid>
                </Grid>
              )
              }
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Grid>
      </Box>
    </>
    /*  <>
       <Grid lg={12} xs={12} className={styles.leftContainer}>
         <Typography marginTop={4} marginBottom={2} color={'white'}>Contacto</Typography>
         <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} padding={2}>
           {contactValues.map((item, i) => (
             <Grid item key={i}>
               <TextField name={item.name} label={item.label} variant="outlined" onChange={handleChange} sx={{ backgroundColor: 'white' }} />
             </Grid>
           ))}
         </Grid>
         <Typography marginTop={5} marginBottom={2} color={'white'}>Estación</Typography>
         <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} padding={2}>
           {stationValues.map((item, i) => (
             <Grid item key={i}>
               <TextField name={item.name} label={item.label} variant="outlined" onChange={handleChange} sx={{ backgroundColor: 'white' }} />
             </Grid>
           ))}
         </Grid>
         <Typography marginTop={5} marginBottom={2} color={'white'}>Ubicación</Typography>
         <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} padding={1}>
           {locationValues.map((item, i) => (
             <Grid item key={i}>
               <TextField name={item.name} label={item.label} variant="outlined" onChange={handleChange} sx={{ backgroundColor: 'white' }} />
             </Grid>
           ))}
         </Grid>
         <Grid padding={1}>
           <Button variant="contained" className={styles.btnRegistrar} color="success" size="large" onClick={handleGuardar}>Registrar</Button>
         </Grid>
       </Grid>
     </> */
  )
}

export default SuscribirEstacion;