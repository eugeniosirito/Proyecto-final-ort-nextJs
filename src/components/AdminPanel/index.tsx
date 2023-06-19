import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material';
import styles from './styles.module.css';
import { getEstaciones } from '@/services';
import { ExpandMore } from '@mui/icons-material';
import { dateFormatted } from '@/utils/dateFormatted';

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
      <Typography paddingX={3} paddingY={2} color={'white'} variant='h3' textAlign={'center'}>Vista de administrador</Typography>
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
                        <Button size="large" variant="contained" className={styles.successButton}>
                          Aprobar
                        </Button>
                        <Button size="large" variant="contained" className={styles.errorButton}>
                          Rechazar
                        </Button>
                      </Grid>
                    </Accordion>
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