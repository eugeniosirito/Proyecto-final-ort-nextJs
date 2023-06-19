import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, CircularProgress, Divider, Grid, TextField, Tooltip, Typography, Zoom } from '@mui/material';
import styles from './styles.module.css';
import { deleteEstacion, deleteSensor, getEstaciones, getSensor, patchEstacion } from '@/services';
import { ExpandMore } from '@mui/icons-material';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import DeleteStationModal from './components/DeleteStationModal';
import SensorSummaryModal from './components/SensorSummaryModal';
import CreateSensorModal from './components/CreateSensorModal';
import 'react-toastify/dist/ReactToastify.css'
import { dateFormatted } from '../../utils/dateFormatted'
import { deleteSensorOnClick, editarEstacion } from './utils';

const UserPanel = () => {
  const [eliminarActivo, setEliminarActivo] = useState(false);
  const [sensorWarningActivo, setSensorWarningActivo] = useState(false);
  const [sensorModalActivo, setSensorModalActivo] = useState(false);
  const [createSensorModalActivo, setCreateSensorModalActivo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [estacionID, setEstacionID] = useState('');
  const [isEditando, setIsEditando] = useState(false);
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
  const [estacionEdit, setEstacionEdit] = useState({
    description: {
      metadata: {},
      value: ''
    },
    location: {
      coordinates: [0, 0]
    },
    user: {
      value: 'JUANPEPE'
    },
  });
  const [sensorEdit, setSensorEdit] = useState({});

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
  }, [eliminarActivo, isEditando]);

  const eliminarEstacion = (idEstacion: string) => {
    const returnDeletePromise = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const resultado = await deleteEstacion(idEstacion);
          resolve(resultado)
          setIsLoading(false);
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

  const resumenSensorFields = [
    {
      label: 'ID',
      value: sensorEdit?.id
    },
    {
      label: 'Descripción',
      value: sensorEdit?.description?.value
    },
    {
      label: 'Fecha de creación',
      value: sensorEdit?.dateCreated
    },
    {
      label: 'Fecha de modificación',
      value: sensorEdit?.dateModified
    },
  ];

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
  const handleCloseModalCreateSensor = () => {
    setCreateSensorModalActivo(false);
  }

  const handleChange = (fieldName: any, value: any) => {
    setEstacionEdit(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const ingresoEstacionFields = [
    {
      label: 'Descripción',
      stateKey: 'description',
      value: estacionEdit.description.value,
      handleChange: (value: any) => handleChange('description', { value, metadata: {} }),
      tooltip: {
        value: 'Ingrese la descripción deseada',
      },
      type: 'text'
    },
    {
      label: 'Coordenadas',
      stateKey: 'location',
      value: estacionEdit.location.coordinates.join(', '),
      handleChange: (value: any) => handleChange('location', { coordinates: value.split(', '), metadata: {} }),
      tooltip: {
        value: 'Ingrese latitud y longitud de su estación separados por una coma. (Ej: -50.250, 25.110).',
      },
      type: 'text'
    },
  ];

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
            {estaciones.map((item, indice) => (
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
                      {!isEditando ? (
                        <Grid display={'flex'} justifyContent={'center'} container>
                          {renderTextField('Id estacion', item.id)}
                          {renderTextField('Descripción', item.description.value)}
                          {renderTextField('Usuario', item.user)}
                          {renderTextField('Locación', item.location)}
                          {renderTextField('Fecha de creación', dateFormatted(item.dateCreated))}
                          {renderTextField('Fecha de modificación', dateFormatted(item.dateModified))}
                          {renderTextField('Estado', item.stationState)}
                        </Grid>
                      ) : (
                        <>
                          <Grid container display={'flex'} justifyContent={'center'} className={'pageAnimation-containers'}>
                            <Typography textAlign={'center'} variant="h4" color={'white'}>Ingrese su estación</Typography>
                            <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} paddingTop={6} >
                              {ingresoEstacionFields.map((field, index) => (
                                <Tooltip key={index} title={field.tooltip.value} placement={'top'} arrow TransitionComponent={Zoom}>
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
                              <Button style={{ marginRight: '12px' }} size="large" onClick={() => { editarEstacion(item.id, estacionEdit), setIsEditando(false) }} variant="contained" className={styles.loadingButtonStatic}>
                                Editar
                              </Button>
                              <Button size="large" onClick={() => { setIsEditando(false) }} variant="contained" className={styles.loadingButtonStatic}>
                                Cancelar
                              </Button>
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </AccordionDetails>
                    {!isEditando ? (
                      <Grid paddingTop={3} display={'flex'} justifyContent={'flex-end'}>
                        <Button size="large" variant="contained" className={styles.classicButton}
                          onClick={() => {
                            if (item.sensors.length > 0) {
                              handleOpenSensorSummary();
                              setSensorEdit(item);
                              console.log('test', sensorEdit)
                            } else {
                              setCreateSensorModalActivo(true);
                              setEstacionID(item.id)
                              console.log(item.id)
                            }
                          }}>
                          {item.sensors.length > 0 ? 'Ver sensores' : 'Agregar sensor'}
                        </Button>
                        <Button size="large" variant="contained" className={styles.warningButton} onClick={() => setIsEditando(true)}>
                          Editar
                        </Button>
                        <Button size="large" variant="contained" className={styles.errorButton} onClick={() => {
                          setEliminarActivo(true),
                            setEstacionID(item.id)
                        }}>
                          Eliminar
                        </Button>
                      </Grid>
                    ) : ''}
                  </Accordion>
                </>
                <DeleteStationModal
                  sensorWarningActivo={sensorWarningActivo}
                  eliminarActivo={eliminarActivo}
                  handleCloseEliminar={handleCloseEliminar}
                  eliminarEstacion={eliminarEstacion}
                  handleCloseSensorModalWarning={handleCloseSensorModalWarning}
                  handleOpenSensorSummary={handleOpenSensorSummary}
                  idstation={estacionID}
                />
                <SensorSummaryModal
                  sensorModalActivo={sensorModalActivo}
                  handleCloseEliminar={handleCloseEliminar}
                  resumenSensorFields={resumenSensorFields}
                  handleCloseSensorSummary={handleCloseSensorSummary}
                  deleteSensorOnClick={deleteSensorOnClick}
                  sensorEdit={sensorEdit}
                />
                <CreateSensorModal
                  createSensorModalActivo={createSensorModalActivo}
                  handleCloseModalCreateSensor={handleCloseModalCreateSensor}
                  idstation={estacionID}
                />
              </>
            ))}
          </Grid>
        )}
      </Grid >

    </>
  )
}

export default UserPanel;