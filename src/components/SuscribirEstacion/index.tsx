import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Box, Stepper, Step, StepLabel } from '@mui/material'
import styles from './styles.module.css';

const SuscribirEstacion = () => {

  /* acá se guarda la estación */

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

  /* acá empieza el step */

  const steps = ['Ingresá tu cuenta', 'Información de la estación', 'Mas información'];
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
                  <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }} padding={12}>
                    {contactValues.map((item, i) => (
                      <Grid item key={i}>
                        <TextField name={item.name} label={item.label} variant="outlined" onChange={handleChange}
                          sx={{
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
                </Grid>
              ) : (activeStep === 1 ? (
                <Grid lg={12} xs={12}>
                  <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }} padding={12}>
                    {stationValues.map((item, i) => (
                      <Grid item key={i}>
                        <TextField name={item.name} label={item.label} variant="outlined" onChange={handleChange} sx={{
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
                </Grid>
              ) :
                <Grid lg={12} xs={12} className={styles.leftContainer}>
                  <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }} padding={12}>
                    {locationValues.map((item, i) => (
                      <Grid item key={i}>
                        <TextField name={item.name} label={item.label} variant="outlined" onChange={handleChange} sx={{
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