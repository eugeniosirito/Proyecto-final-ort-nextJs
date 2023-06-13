import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Box, Button, Chip, CircularProgress, Divider, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField, Typography, Zoom } from '@mui/material';
import styles from './styles.module.css';
import { getEstaciones } from '@/services';
import { IngresoEstacionValues } from '@/utils/interfaces';
import { ExpandMore } from '@mui/icons-material';
import clsx from 'clsx';

const UserPanel = () => {

  const [estaciones, setEstaciones] = useState<IngresoEstacionValues[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const resumenFields = [
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
                            <Typography color={'rgba(255, 255, 255, 0.63)'} variant='h5'>{`Usuario: ${item.user.value}`}</Typography>
                          </Grid>
                        </Grid>
                        <Grid item paddingRight={1}>
                          <Chip
                            label={item.estado.value === 'PENDIENTE' ? 'Pendiente de aprobación' : item.estado.value === 'ACEPTADO' ? 'Aceptado' : 'Rechazado'}
                            sx={{ fontWeight: 'bold', fontSize: '14px' }}
                            className={clsx({
                              'color-chip-warning': item.estado.value === 'PENDIENTE',
                              'color-chip-success': item.estado.value === 'ACEPTADO',
                              'color-chip-error': item.estado.value === 'RECHAZADO',
                            })}
                          />
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid display={'flex'} justifyContent={'center'} container>
                        {resumenFields.map((item, i) => (
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
                      <Button size="large" variant="contained" className={styles.warningButton}>
                        Editar
                      </Button>
                      <Button size="large" variant="contained" className={styles.errorButton}>
                        Eliminar
                      </Button>
                    </Grid>
                  </Accordion>
                </>
              </>
            ))}
          </Grid>
        )}
      </Grid >
    </>
  )
}

export default UserPanel;