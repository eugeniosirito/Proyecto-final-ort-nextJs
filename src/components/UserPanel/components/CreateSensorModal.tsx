import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import styles from '../styles.module.css';
import { toast } from 'react-toastify';
import { postSensor } from '@/services';

const CreateSensorModal = ({
  createSensorModalActivo,
  handleCloseModalCreateSensor,
  stationId
}: any) => {

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

  const crearEstacion = () => {
    const returnCrearPromise = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const resultado = await postSensor(sensorData);
          resolve(resultado)
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
        pending: 'Borrando estación',
        success: 'Borrada correctamente 👌',
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
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color={'white'} textAlign={'center'} style={{ backgroundColor: 'rgb(9, 39, 84)' }}>{"Crear sensor"}</DialogTitle>
        <DialogContent style={{ backgroundColor: 'rgb(9, 39, 84)' }}>
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
          </Grid>
        </DialogContent>
        <DialogActions style={{ backgroundColor: 'rgb(9, 39, 84)' }}>
          <Button style={{ marginRight: '0' }} className={styles.classicButton} variant="contained" onClick={handleCloseModalCreateSensor}>
            Cancelar
          </Button>
          <Button className={styles.successButton}
            variant="contained"
            onClick={crearEstacion}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default CreateSensorModal;