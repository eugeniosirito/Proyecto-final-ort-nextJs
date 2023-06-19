import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import styles from '../styles.module.css';
import { toast } from 'react-toastify';
import { postSensor } from '@/services';

const CreateSensorModal = ({
  createSensorModalActivo,
  handleCloseModalCreateSensor,
  idstation
}: any) => {

  const [sensorData, setSensorData] = useState({
    station_id: '',
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

  useEffect(() => {
    setSensorData(prevSensorData => ({
      ...prevSensorData,
      station_id: idstation
    }));
  }, [idstation]);

  const crearSensor = () => {
    const returnCrearPromise = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const resultado = await postSensor(sensorData);
          resolve(resultado)
          handleCloseModalCreateSensor()
          console.log('sensor creado correctamente', resultado);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })
    }

    toast.promise(
      returnCrearPromise,
      {
        pending: 'Creado sensor',
        success: 'Sensor creado correctamente 👌',
        error: 'Ha occurido un error, vuelva a intentar mas tarde 🤯'
      }
    )
  };

  return (
    <>
      <Dialog
        open={createSensorModalActivo}
        keepMounted
        onClose={handleCloseModalCreateSensor}
      >
        <DialogTitle color={'white'} textAlign={'center'} style={{ backgroundColor: 'rgb(9, 39, 84)' }}>{"Creación del sensor"}</DialogTitle>
        <DialogContent style={{ backgroundColor: 'rgb(9, 39, 84)' }}>
          <Grid display={'flex'} justifyContent={'center'} container className={styles.inputsContainer}>
            <Typography textAlign={'center'} variant="h5" color={'white'}>Complete los campos para crear el sensor</Typography>
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
                  margin: '12px',
                }}
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
                  margin: '12px',
                }}
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
                  margin: '12px',
                }}
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
                  margin: '12px',
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ backgroundColor: 'rgb(9, 39, 84)' }}>
          <Button style={{ marginRight: '0' }} className={styles.classicButton} variant="contained" onClick={handleCloseModalCreateSensor}>
            Cancelar
          </Button>
          <Button className={styles.successButton}
            variant="contained"
            onClick={() => { crearSensor() }}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default CreateSensorModal;