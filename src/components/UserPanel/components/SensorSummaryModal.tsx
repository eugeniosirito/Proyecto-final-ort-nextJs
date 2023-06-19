import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import styles from '../styles.module.css';


const SensorSummaryModal = ({
  sensorModalActivo,
  handleCloseEliminar,
  resumenSensorFields,
  handleCloseSensorSummary,
  deleteSensorOnClick,
  sensorEdit
}: any) => {
  return (
    <>
      <Dialog
        open={sensorModalActivo}
        keepMounted
        onClose={handleCloseEliminar}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color={'white'} textAlign={'center'} style={{ backgroundColor: 'rgb(9, 39, 84)' }}>{"Resumen del sensor"}</DialogTitle>
        <DialogContent style={{ backgroundColor: 'rgb(9, 39, 84)' }}>
          <Grid display={'flex'} justifyContent={'center'} container>
            {resumenSensorFields.map((item: { label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; value: unknown; }, i: React.Key | null | undefined) => (
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
          <Button style={{ marginRight: '0' }} className={styles.warningButton} variant="contained" onClick={handleCloseSensorSummary}>
            Editar
          </Button>
          <Button className={styles.errorButton}
            variant="contained"
            onClick={() => { handleCloseSensorSummary(), deleteSensorOnClick(sensorEdit.sensors[0].id) }}
          >
            Eliminar
          </Button>
          <Button style={{ marginRight: '0' }} className={styles.classicButton} variant="contained" onClick={handleCloseSensorSummary}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default SensorSummaryModal;