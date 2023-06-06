import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Box, Button, Card, CardActionArea, CardContent, Chip, Divider, Fade, Grid, Modal, TextField, Tooltip, Typography, Zoom } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import styles from './styles.module.css';
import { getEstaciones } from '@/services';
import { IngresoEstacionValues } from '@/utils/interfaces';
import { ExpandMore } from '@mui/icons-material';

const HomeTab = () => {

  const [estaciones, setEstaciones] = useState<IngresoEstacionValues[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cardItems = [
    {
      title: 'Client',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to Client'
    },
    {
      title: 'Help',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to Help'
    },
    {
      title: 'Sites',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to Sites'
    },
    {
      title: 'Email',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to Email'
    },
    {
      title: 'DNS',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to DNS'
    },
    {
      title: 'Monitor',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to Monitor'
    },
    {
      title: 'Tools',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to Tools'
    },
    {
      title: 'System',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />,
      button: 'Go to System'
    },
  ];

  useEffect(() => {
    getEstaciones()
      .then(response => {
        setEstaciones(response);
        console.log('estaciones response', estaciones);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
  ]

  return (
    <>
      <Typography paddingX={3} paddingY={2} color={'white'} variant='h3' textAlign={'center'}>Vista de administrador</Typography>
      <Divider variant="middle" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.73)', paddingLeft: '12px', marginY: '12px' }} />
      {/*       <Typography paddingX={3} paddingY={2} color={'white'} variant='h4'>Available Modules</Typography>
      <Grid container display={'flex'} flexDirection={'row'} paddingX={3}>
        {cardItems.map((item, i) => (
          <Grid key={i} item lg={2} padding={0} paddingRight={2} paddingTop={2}>
            <Card className={styles.cardsContainer}>
              <CardContent>
                <Typography variant='h5' textAlign={'center'} color={'white'}>{item.title}</Typography>
                <Grid item display={'flex'} justifyContent={'center'} paddingTop={0}>
                  <Button sx={{ backgroundColor: 'blue' }}>{item.button}</Button>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Divider variant="middle" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.73)', paddingLeft: '12px', marginTop: '28px' }} /> */}
      <Grid container>
        <Grid item lg={12} paddingX={3} paddingTop={3}>
          {estaciones.map((item, i) => (
            <>
              {item.estado.value === false ? (
                <>
                  <Accordion style={{ backgroundColor: 'rgb(35, 48, 68)', marginBottom: '4px', padding: '12px' }}>
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
                          <Chip label="Pendiente de aprobación" sx={{ backgroundColor: '#D1C500' }} />
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
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  asd
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </Grid>
      </Grid >
    </>
  )
}

export default HomeTab;