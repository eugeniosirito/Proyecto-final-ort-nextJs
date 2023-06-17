import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Typography, Box, Stepper, Step, StepLabel, Tooltip, Zoom, Accordion, AccordionSummary, AccordionDetails, Chip, CircularProgress } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import styles from './styles.module.css';
import { getEstacion, postEstacion, postSensor } from "@/services";
import { IngresoEstacionValues } from "@/utils/interfaces";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Router from "next/router";

const SuscribirEstacion = () => {
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [ingresoOk, setIngresoOk] = useState(false);
  const [stationInputDisable, setStationInputDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stationId, setStationId] = useState('');


  /* Información del sensor */
  const [sensorData, setSensorData] = useState({
    station_id: stationId,
    description: {
      value: '',
      metadata: {
        unit: {
          value: ''
        },
        averageTemperature: {
          value: 0
        },
        minTemperature: {
          value: 0
        }
      }
    }
  });

  /* Información de la estación */
  const [ingresoEstacion, setIngresoEstacion] = useState<IngresoEstacionValues>({
    description: {
      metadata: {},
      value: '',
    },
    location: {
      coordinates: [],
      metadata: {},
    },
    user: {
      value: 'Juancito'
    },
  });

  /* Informaciòn del resumen de la estaciòn */
  const [resumenEstacion, setResumenEstacion] = useState({
    id: "",
    user: "",
    description: {
      value: "",
      metadata: {}
    },
    location: [
      0,
      0
    ],
    sensors: [
      {
        station_id: "",
        description: {
          value: "",
          metadata: {
            unit: {
              value: ""
            },
            averageTemperature: {
              value: 0
            },
            minTemperature: {
              value: 0
            }
          }
        },
        id: ""
      }
    ],
    stationState: "",
    dateCreated: "",
    dateModified: ""
  });

  /* Guarda correctamente la stationID en el sensor luego de crear la estación */

  useEffect(() => {
    const data = {
      station_id: stationId,
      description: {
        value: "",
        metadata: {
          unit: {
            value: ""
          },
          averageTemperature: {
            value: 0
          },
          minTemperature: {
            value: 0
          }
        }
      }
    };
    setSensorData(data);
  }, [stationId]);

  /* Validates if the required fields are filled  */

  useEffect(() => {
    if ((ingresoEstacion.description.value == '' || ingresoEstacion.location.coordinates.length == 0)) {
      setIsButtonDisable(true)
    } else {
      setIsButtonDisable(false)
    }
  }, [ingresoEstacion.description.value, ingresoEstacion.location.coordinates])

  /* the handle takes care of filling the attributes of for the station object */

  const handleChange = (fieldName: any, value: any) => {
    setIngresoEstacion(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  /* Here starts the stepper */

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

    if (activeStep === 1) {
      getEstacion(stationId)
        .then(response => {
          setResumenEstacion(response);
          setIsLoading(false);
          console.log('estaciones response', resumenEstacion);
        })
        .catch(error => {
          console.log(error);
        });
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

    getEstacion(stationId)
      .then(response => {
        setResumenEstacion(response);
        setIsLoading(false);
        console.log('estaciones response', resumenEstacion);
      })
      .catch(error => {
        console.log(error);
      });

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

  /* the input constructors for the TextField component (esto se encarga de mapear el componente y la función handleChange de guardar
    lo que se va escribiendo en el input en el objeto mas arriba) */

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
        value: 'Ingrese latitud y longitud de su estación separados por una coma. (Ej: -50.250, 25.110).',
      },
      type: 'text'
    },
  ];

  /* the input constructor for the TextField component for the resumenFields */

  const resumenEstacionFields = [
    {
      label: 'Nombre',
      value: resumenEstacion.user
    },
    {
      label: 'Coordenadas/Locación',
      value: resumenEstacion.location,
    },
    {
      label: 'Fecha de creación',
      value: resumenEstacion.dateCreated,
    },
  ];

  const resumenSensorFields = [
    {
      label: 'Nombre',
      value: resumenEstacion.user
    },
    {
      label: 'Coordenadas/Locación',
      value: resumenEstacion.location,
    },
    {
      label: 'Fecha de creación',
      value: resumenEstacion.dateCreated,
    },
  ];

  /* This function is in charge of sending the body of the station object to make a post request  */
  /* Also handles the Toast popUp */
  const notify = () => {
    const returnPostPromise = () => {
      return new Promise(async (resolve, reject) => {
        /* si es el primer step hace el post */
        if (activeStep === 0) {
          try {
            const resultado = await postEstacion(ingresoEstacion);
            /* resetea el objeto */
            setIngresoEstacion({
              description: {
                metadata: {},
                value: '',
              },
              location: {
                coordinates: [],
                metadata: {},
              },
              user: {
                value: ''
              },
            });
            setIngresoOk(true);
            resolve(resultado)
            setStationId(resultado.id)
            console.log(resultado, "post correcto");
          } catch (error) {
            console.error(error);
            reject(error)
          }
        } else {
          /* si es el segundo step hace el post del sensor */
          try {
            const resultado = await postSensor(sensorData);
            setIngresoOk(true);
            resolve(resultado)
            console.log(resultado, "post sensor correcto");
          } catch (error) {
            console.error(error);
            console.log('el id', stationId)
            reject(error)
          }
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

  /* Redirects to the user panel */

  const handleClick = () => {
    Router.push('/control-panel-user');
    setIsLoading(true);
  };

  return (
    <>
      <Box paddingTop={5}>
        <Grid item lg={10} display={'flex'} flexDirection={'column'} padding={5} className={styles.mainGridContainer}>
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
                      color: 'rgba(255, 255, 255, 0.63)',
                    },
                    '& .MuiStepLabel-label.Mui-completed': {
                      color: 'rgba(255, 255, 255, 0.63)',
                    },
                    '& .MuiStepLabel-label': {
                      color: 'rgba(255, 255, 255, 0.63)',
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
                <Grid container className={styles.inputsContainer}>
                  <Typography textAlign={'center'} variant="h4" paddingTop={4} color={'white'}>Ingrese su estación</Typography>
                  <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} paddingTop={6} >
                    {ingresoEstacionFields.map((field, index) => (
                      <Tooltip key={index} title={field.tooltip.value} placement={'top'} arrow TransitionComponent={Zoom}>
                        <TextField
                          key={index}
                          type={field.type}
                          label={field.label}
                          value={field.value}
                          disabled={stationInputDisable}
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
                    <Button size="large" onClick={() => { notify(); setStationInputDisable(true) }} disabled={isButtonDisable} variant="contained" className={styles.loadingButtonStatic}>
                      Ingresar estación
                    </Button>
                  </Grid>
                </Grid>
              ) : (activeStep === 1 ? (
                <Grid container className={styles.inputsContainer}>
                  <Typography textAlign={'center'} variant="h4" paddingTop={4} color={'white'}>Ingrese un sensor (Opcional)</Typography>
                  <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} paddingTop={6}>
                    <TextField
                      label="Descripción"
                      value={sensorData.description.value}
                      onChange={(event) =>
                        setSensorData({
                          ...sensorData,
                          description: {
                            ...sensorData.description,
                            value: event.target.value
                          }
                        })
                      }
                    />
                    <TextField
                      label="Unidad"
                      value={sensorData.description.metadata.unit.value}
                      onChange={(event) =>
                        setSensorData({
                          ...sensorData,
                          description: {
                            ...sensorData.description,
                            metadata: {
                              ...sensorData.description.metadata,
                              unit: {
                                value: event.target.value
                              }
                            }
                          }
                        })
                      }
                    />
                    <TextField
                      label="Temperatura promedio"
                      value={sensorData.description.metadata.averageTemperature.value}
                      onChange={(event) =>
                        setSensorData({
                          ...sensorData,
                          description: {
                            ...sensorData.description,
                            metadata: {
                              ...sensorData.description.metadata,
                              averageTemperature: {
                                value: parseInt(event.target.value)
                              }
                            }
                          }
                        })
                      }
                    />
                    <TextField
                      label="Temperatura mínima"
                      value={sensorData.description.metadata.minTemperature.value}
                      onChange={(event) =>
                        setSensorData({
                          ...sensorData,
                          description: {
                            ...sensorData.description,
                            metadata: {
                              ...sensorData.description.metadata,
                              minTemperature: {
                                value: parseInt(event.target.value)
                              }
                            }
                          }
                        })
                      }
                    />
                  </Grid>
                  <Grid paddingTop={3}>
                    <Button size="large" onClick={notify} /* disabled={isButtonDisable} */ variant="contained" className={styles.loadingButtonStatic}>
                      Ingresar Sensor
                    </Button>
                  </Grid>
                </Grid>
              ) :
                <Grid container className={styles.inputsContainer}>
                  <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }} padding={8}>
                    <Typography variant="h4" color={'rgba(255, 255, 255, 0.63)'} paddingBottom={4}>Resumen de la estación creada.</Typography>
                    <Accordion style={{ backgroundColor: 'rgb(12, 52, 110)', boxShadow: '2px 3px 6px 0px #000', padding: '12px' }}>
                      <AccordionSummary
                        expandIcon={<ExpandMore color="info" />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Grid container justifyContent={"space-between"}>
                          <Grid item display={'flex'} alignItems={'center'}>
                            <Typography color={'rgba(255, 255, 255, 0.63)'} variant='h5'>{resumenEstacion.id}</Typography>
                          </Grid>
                          <Tooltip title={'Un administrador estará revisando y aprobando esta estación.'} placement="top" arrow TransitionComponent={Zoom}>
                            <Grid item paddingRight={1}>
                              <Chip label={resumenEstacion.stationState === "IN_APPROVAL" ? 'Pendiente de aprobación' : ''} sx={{ backgroundColor: '#BBB000', fontWeight: 'bold', fontSize: '14px' }} />
                            </Grid>
                          </Tooltip>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography textAlign={'center'} variant="h5" color={'white'} pb={2}>Estación</Typography>
                        <Grid display={'flex'} justifyContent={'center'} container>
                          {resumenEstacionFields.map((item, i) => (
                            <TextField key={i} label={item.label} value={item.value}
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
                          ))}
                        </Grid>
                        <Typography textAlign={'center'} variant="h5" color={'white'} py={2}>Sensor</Typography>
                        <Grid display={'flex'} justifyContent={'center'} container>
                          {resumenSensorFields.map((item, i) => (
                            <TextField key={i} label={item.label} value={item.value}
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
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                    <Grid paddingTop={3} marginTop={4}>
                      <Button size="large" variant="contained" onClick={handleClick} className={styles.loadingButtonStatic} style={{ width: '200px' }}>
                        {isLoading ? <CircularProgress color="inherit" /> : 'Ver estaciones'}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )
              }
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                {ingresoOk ? (
                  <Tooltip title={activeStep === 0 ? 'Estación ingresada, clickea aquí para continuar.' : 'Sensor ingresado correctamente, haz click aquí para ver el resúmen.'} placement="top" arrow TransitionComponent={Zoom} open={true}>
                    <Button
                      onClick={() => {
                        handleNext();
                        setIngresoOk(false);
                      }}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Tooltip>
                ) : null}
              </Box>
            </React.Fragment>
          )}
        </Grid>
      </Box>
    </>
  )
}

export default SuscribirEstacion;