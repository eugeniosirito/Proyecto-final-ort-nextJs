import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Slide, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField, Typography, Zoom } from '@mui/material';
import styles from './styles.module.css';
import { deleteEstacion, deleteSensor, getEstaciones, getSensor } from '@/services';
import { ExpandMore } from '@mui/icons-material';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Slide as Slider, ToastContainer, toast } from 'react-toastify';


const UserPanel = () => {
  const router = useRouter();
  const [eliminarActivo, setEliminarActivo] = useState(false);
  const [sensorWarningActivo, setSensorWarningActivo] = useState(false);
  const [sensorModalActivo, setSensorModalActivo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [estaciones, setEstaciones] = useState([{
    id: '',
    user: '',
    description: {
      value: '',
      metadata: {}
    },
    location: [
      0,
      0
    ],
    sensors: [
      {
        station_id: '',
        description: {
          value: '',
          metadata: {}
        },
        id: ''
      },
      {
        station_id: '',
        description: {
          value: '',
          metadata: {}
        },
        id: ''
      }
    ],
    stationState: '',
    dateCreated: '',
    dateModified: ''
  }]);
  const [sensorSeleccionado, setSensorSeleccionado] = useState({
    id: '',
    description: {
      value: '',
      metadata: {
        air_quality_index: 0,
        humidity: 0,
        maxMeasurement: 0,
        minMeasurement: 0,
        pollutants: {
          co2: 0,
          co: 0,
          no2: 0,
          o3: 0,
          so2: 0,
          pm2: 0,
          pm10: 0
        },
        pressure: 0,
        temperature: 0
      }
    },
    station_id: '',
    dateCreated: '',
    dateModified: ''
  })

  useEffect(() => {
    getEstaciones()
      .then(response => {
        setEstaciones(response);
        setIsLoading(false);
        console.log('estaciones response', estaciones);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const resumenEstacionFields = [
    {
      label: 'Nombre',
      value: 'xxxxx'
    },
    {
      label: 'Apellido',
      value: 'xxxxx'
    },
    {
      label: 'Email',
      value: 'xxxxx'
    },
    {
      label: 'Descripción',
      value: 'xxxxx'
    },
    {
      label: 'Coordenadas/Locación',
      value: 'xxxxx',
    },
    {
      label: 'Tipo de sensor',
      value: 'xxxxx',
    },
    {
      label: 'Estación N°',
      value: 'xxxxx',
    },
  ];

  const resumenSensorFields = [
    {
      label: 'ID',
      value: sensorSeleccionado.id
    },
    {
      label: 'Descripción',
      value: sensorSeleccionado.description.value
    },
    {
      label: 'Pertenece a',
      value: sensorSeleccionado.station_id
    },
    {
      label: 'Fecha de creación',
      value: sensorSeleccionado.dateCreated
    },
    {
      label: 'Fecha de modificación',
      value: sensorSeleccionado.dateModified,
    },
  ];

  const handleClickOpenEliminar = () => {
    setEliminarActivo(true);
  };

  const handleCloseEliminar = () => {
    setEliminarActivo(false);
  };

  const handleCloseSensorModalWarning = () => {
    setSensorWarningActivo(false);
  };

  const handleOpenSensorSummary = () => {
    setSensorModalActivo(true);
  }

  const handleCloseSensorSummary = () => {
    setSensorModalActivo(false);
  }

  const eliminarEstacion = (idEstacion: string) => {
    const returnDeletePromise = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const resultado = await deleteEstacion(idEstacion);
          resolve(resultado)
          setIsLoading(false);
          router.reload();
          console.log('eliminada correctamente', resultado);
        } catch (error) {
          console.log(error);
          setSensorWarningActivo(true);
          setEliminarActivo(false);
          reject(error);
        }
      })
    }

    toast.promise(
      returnDeletePromise,
      {
        pending: 'Borrando estación',
        success: 'Borrada correctamente 👌',
        error: 'Ha occurido un error, vuelva a intentar mas tarde 🤯'
      }
    )
  };

  const deleteSensorOnClick = (sensorId: string) => {
    deleteSensor(sensorId)
      .then(response => {
        setIsLoading(false);
        console.log('DELETE CORRECTO', response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getSensoresOnClick = (sensorId: string) => {
    getSensor(sensorId)
      .then(response => {
        setSensorSeleccionado(response);
        setIsLoading(false);
        console.log('estaciones response', sensorSeleccionado);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Typography paddingX={3} paddingY={2} color={'white'} variant='h3' textAlign={'center'}>Vista de usuario</Typography>
      <Divider variant="middle" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.73)', paddingLeft: '12px', marginY: '12px' }} />
      <Grid container display={'flex'} justifyContent={'center'}>
        {isLoading ? (
          <Grid style={{ transform: 'translate(0%, 250%)' }}>
            <CircularProgress size={'80px'} />
          </Grid>
        ) : (
          <Grid item lg={12} paddingX={3} paddingTop={3} className='pageAnimation-containers'>
            {estaciones.map((item, i) => (
              <>
                <>
                  <Accordion className={styles.accordionContainer}>
                    <AccordionSummary
                      expandIcon={<ExpandMore color="info" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Grid container justifyContent={"space-between"}>
                        <Grid display={'flex'} flexDirection={'row'}>
                          <Grid item display={'flex'} alignItems={'center'} paddingRight={2}>
                            <Typography color={'rgba(255, 255, 255, 0.63)'} variant='h5'>{`Estación Nro° ${item.id}`}</Typography>
                          </Grid>
                          <Grid item display={'flex'} alignItems={'center'}>
                            <Typography color={'rgba(255, 255, 255, 0.63)'} variant='h5'>{`Usuario: ${item.user}`}</Typography>
                          </Grid>
                        </Grid>
                        <Grid item paddingRight={1}>
                          <Chip
                            label={item.stationState === 'IN_APPROVAL' ? 'Pendiente de aprobación' : item.stationState === 'ACEPTADO' ? 'Aceptado' : 'Rechazado'}
                            sx={{ fontWeight: 'bold', fontSize: '14px' }}
                            className={clsx({
                              'color-chip-warning': item.stationState === 'IN_APPROVAL',
                              'color-chip-success': item.stationState === 'ACEPTADO',
                              'color-chip-error': item.stationState === 'RECHAZADO',
                            })}
                          />
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
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
                    </AccordionDetails>
                    <Grid paddingTop={3} display={'flex'} justifyContent={'flex-end'}>
                      <Button size="large" variant="contained" className={styles.classicButton}
                        onClick={() => { handleOpenSensorSummary(), getSensoresOnClick(item.sensors[i]?.id) }}>
                        {item.sensors.length > 0 ? 'Ver sensores' : 'Agregar sensor'}
                      </Button>
                      <Button size="large" variant="contained" className={styles.warningButton}>
                        Editar
                      </Button>
                      <Button size="large" variant="contained" className={styles.errorButton} onClick={handleClickOpenEliminar}>
                        Eliminar
                      </Button>
                    </Grid>
                  </Accordion>
                </>
                {!sensorWarningActivo ? (
                  <Dialog
                    open={eliminarActivo && !sensorWarningActivo}
                    keepMounted
                    onClose={handleCloseEliminar}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"¿Está seguro que desea eliminar la estación?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        Si la elimina se perdera toda información con respecto a la misma.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseEliminar}>No, mejor no.</Button>
                      <Button onClick={() => { handleCloseEliminar(), eliminarEstacion(item.id) }}>Si, eliminar.</Button>
                    </DialogActions>
                  </Dialog>
                ) : (
                  <Dialog
                    open={sensorWarningActivo}
                    keepMounted
                    onClose={handleCloseSensorModalWarning}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"Primero elimine el sensor de la estación seleccionada."}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        La estación tiene adjunta uno o varios sensores, asegurese de eliminarlos antes de eliminar la estación.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseSensorModalWarning}>Cancelar</Button>
                      <Button onClick={handleCloseEliminar}>Ver sensores</Button>
                    </DialogActions>
                  </Dialog>
                )}
                <Dialog
                  open={sensorModalActivo}
                  keepMounted
                  onClose={handleCloseEliminar}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle color={'white'} textAlign={'center'} style={{ backgroundColor: 'rgb(9, 39, 84)' }}>{"Resumen del sensor"}</DialogTitle>
                  <DialogContent style={{ backgroundColor: 'rgb(9, 39, 84)' }}>
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
                  </DialogContent>
                  <DialogActions style={{ backgroundColor: 'rgb(9, 39, 84)' }}>
                    <Button style={{ marginRight: '0' }} className={styles.warningButton} variant="contained" onClick={handleCloseSensorSummary}>Editar</Button>
                    <Button className={styles.errorButton}
                      variant="contained"
                      onClick={() => { handleCloseSensorSummary(), deleteSensorOnClick(sensorSeleccionado.id) }}
                    >
                      Eliminar
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ))}
          </Grid>
        )}
      </Grid >
    </>
  )
}

export default UserPanel;