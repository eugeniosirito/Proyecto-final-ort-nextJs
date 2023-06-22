import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, TextField, Typography } from '@mui/material';
import styles from './styles.module.css';
import { getEstacion, getEstaciones, patchEstacion } from '@/services';
import { ExpandMore } from '@mui/icons-material';
import { dateFormatted } from '@/utils/dateFormatted';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const AdminPanel = () => {

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
    stationState: '',
    dateCreated: '',
    dateModified: ''
  }]);

  const [estacionPatch, setEstacionPatch] = useState([{
    description: {
      value: '',
      metadata: {}
    },
    location: {
      coordinates: []
    },
    stationState: {
      value: "ENABLED"
    }
  }]);

  const [isLoading, setIsLoading] = useState(true);
  const [openModalAprobar, setOpenModalAprobar] = useState(false);
  const [openModalRechazar, setOpenModalRechazar] = useState(false);
  const [estacionId, setEstacionId] = useState('');

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
  }, [openModalAprobar, openModalRechazar]);

  const patchStation = (idEstacion: string, body: any) => {
    const returnPatchEstacion = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const resultado = patchEstacion(idEstacion, body);
          resolve(resultado)
          setIsLoading(false);
          console.log('estacion modificada', resultado);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })
    }

    toast.promise(
      returnPatchEstacion,
      {
        pending: 'Aceptando',
        success: 'Se cambió el estado correctamente👌',
        error: 'Ha occurido un error, vuelva a intentar mas tarde 🤯'
      }
    )
  };

  const getEstacionSeleccionada = (id: string) => {
    getEstacion(id)
      .then(response => {
        setEstacionPatch(response)
        console.log("STATION PATCH TEST", response)
      })
      .catch(error => {
        console.log(error);
      })
  };

  const renderTextField = (label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined, value: unknown) => (
    <TextField
      label={label}
      value={value}
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
  );

  return (
    <>
      <Grid container display={'flex'} justifyContent={'center'}>
        {isLoading ? (
          <Grid style={{ transform: 'translate(0%, 250%)' }}>
            <CircularProgress size={'80px'} />
          </Grid>
        ) : (
          <Grid item lg={12} paddingX={3} paddingTop={3} className='pageAnimation-containers'>
            {estaciones.map((item, i) => (
              <>
                {item.stationState === 'IN_APPROVAL' ? (
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
                            <Chip label="Pendiente de aprobación" sx={{ backgroundColor: '#BBB000', fontWeight: 'bold', fontSize: '14px' }} />
                          </Grid>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid display={'flex'} justifyContent={'center'} container>
                          {renderTextField('Id estacion', item.id)}
                          {renderTextField('Descripción', item.description.value)}
                          {renderTextField('Usuario', item.user)}
                          {renderTextField('Locación', item.location)}
                          {renderTextField('Fecha de creación', dateFormatted(item.dateCreated))}
                          {renderTextField('Fecha de modificación', dateFormatted(item.dateModified))}
                          {renderTextField('Estado', item.stationState)}
                        </Grid>
                      </AccordionDetails>
                      <Grid paddingTop={3} display={'flex'} justifyContent={'flex-end'}>
                        <Button size="large" variant="contained" className={styles.successButton}
                          onClick={() => {
                            setOpenModalAprobar(true);
                            setEstacionId(item.id)
                          }}>
                          Aprobar
                        </Button>
                        <Button size="large" variant="contained" className={styles.errorButton}
                          onClick={() => {
                            setOpenModalRechazar(true);
                            setEstacionId(item.id)
                          }}>
                          Rechazar
                        </Button>
                      </Grid>
                    </Accordion>
                    <Dialog
                      open={openModalAprobar}
                      keepMounted
                      onClose={() => setOpenModalAprobar(false)}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"¿Está seguro que desea aprobar esta estación?"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          La estación pasara al estado aprobada.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setOpenModalAprobar(false)}>No, mejor no.</Button>
                        <Button onClick={() => {
                          patchStation(estacionId,
                            {
                              description: {
                                metadata: {},
                                value: item.description.value
                              },
                              location: {
                                coordinates: item.location
                              },
                              stationState: {
                                value: "ENABLED"
                              }
                            }
                          )
                          setOpenModalAprobar(false)
                        }}>Si, aprobar.</Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog
                      open={openModalRechazar}
                      keepMounted
                      onClose={() => setOpenModalRechazar(false)}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"¿Está seguro que desea rechazar esta estación?"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          La estación pasara al estado rechazada.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setOpenModalRechazar(false)}>No, mejor no.</Button>
                        <Button onClick={() => {
                          patchStation(estacionId,
                            {
                              description: {
                                metadata: {},
                                value: item.description.value
                              },
                              location: {
                                coordinates: item.location
                              },
                              stationState: {
                                value: "REJECTED"
                              }
                            }
                          )
                          setOpenModalRechazar(false)
                        }}>Si, rechazar.</Button>
                      </DialogActions>
                    </Dialog>
                  </>
                ) : null}
              </>
            ))}
          </Grid>
        )}
      </Grid >
    </>
  )
}

export default AdminPanel;