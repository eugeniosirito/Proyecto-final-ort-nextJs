import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Typography, Box, Stepper, Step, StepLabel, Tooltip } from '@mui/material'
import styles from './styles.module.css';
import { postEstacion } from "@/services";
import { IngresoEstacionValues } from "@/utils/interfaces";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const SuscribirEstacion = () => {
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
    id: '',
    description: {
      metadata: {},
      value: '',
    },
    location: {
      coordinates: [],
      metadata: {},
    },
    user: {
      value: 'user_15'
    }
  })
  const [isButtonDisable, setIsButtonDisable] = useState(true);

  useEffect(() => {
    if ((ingresoEstacion.description.value == '' || ingresoEstacion.location.coordinates.length == 0)) {
      setIsButtonDisable(true)
    } else {
      setIsButtonDisable(false)
    }
  }, [ingresoEstacion.description.value, ingresoEstacion.location.coordinates])

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
      label: 'Descripción',
      stateKey: 'description',
      value: ingresoEstacion.description.value,
      handleChange: (value: any) => handleChange('description', { value, metadata: {} }),
      tooltip: {
        value: 'Ingrese la descripción deseada',
      },
      type: 'text'
    },
    {
      label: 'Coordenadas',
      stateKey: 'location',
      value: ingresoEstacion.location.coordinates.join(', '),
      handleChange: (value: any) => handleChange('location', { coordinates: value.split(', '), metadata: {} }),
      tooltip: {
        value: 'Ingrese latitud y longitud separados por una coma. (Ej: -50.250, 25.110)',
      },
      type: 'text'
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
      value: ingresoEstacion.description.metadata
    },
    {
      label: 'Apellido',
      value: ingresoEstacion.description.metadata
    },
    {
      label: 'Email',
      value: ingresoEstacion.description.metadata
    },
    {
      label: 'Descripción',
      value: ingresoEstacion.description.value
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

  const notify = () => {
    const returnPostPromise = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const resultado = await postEstacion(ingresoEstacion);
          setIngresoEstacion({
            id: '',
            description: {
              metadata: {},
              value: '',
            },
            location: {
              coordinates: [],
              metadata: {},
            },
            user: {
              value: 'user_15'
            }
          })
          resolve(resultado)
          console.log(resultado, "post correcto");
        } catch (error) {
          console.error(error);
          reject(error)
        }
      })
    }

    toast.promise(
      returnPostPromise,
      {
        pending: 'Inscribiendo estación',
        success: 'Inscripta correctamente 👌',
        error: 'Ha occurido un error, vuelva a intentar mas tarde 🤯'
      }
    )
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
                <Grid lg={12} xs={12} className={styles.inputsContainer}>
                  <Typography textAlign={'center'} variant="h4" paddingTop={4} color={'white'}>Ingrese su estación</Typography>
                  <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} paddingTop={6} >
                    {ingresoEstacionFields.map((field, index) => (
                      <Tooltip key={index} title={field.tooltip.value} placement={'top'}>
                        <TextField
                          key={index}
                          type={field.type}
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
                            '& .MuiOutlinedInput-input': {
                              color: 'rgba(255, 255, 255, 0.63)',
                            },
                            margin: '12px'
                          }}
                        />
                      </Tooltip>
                    ))}
                  </Grid>
                  <Grid paddingTop={3}>
                    <Button size="large" onClick={notify} disabled={isButtonDisable} variant="contained" className={styles.loadingButtonStatic}>
                      Ingresar estación
                    </Button>
                  </Grid>
                </Grid>
              ) : (activeStep === 1 ? (
                <Grid lg={12} xs={12}>
                  <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} padding={12}>
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
                <Grid lg={12} xs={12} className={styles.inputsContainer}>
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
                </Grid>
              )
              }
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="primary"
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
  )
}

export default SuscribirEstacion;