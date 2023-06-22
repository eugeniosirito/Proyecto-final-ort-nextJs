import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const DeleteStationModal = ({
  sensorWarningActivo,
  eliminarActivo,
  handleCloseEliminar,
  eliminarEstacion,
  handleCloseSensorModalWarning,
  handleOpenSensorSummary,
  idstation,
  setEstacionID
}: any) => {
  return (
    <>
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
            <Button onClick={() => { handleCloseEliminar(), eliminarEstacion(idstation) }}>Si, eliminar.</Button>
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
            <Button onClick={() => {
              handleOpenSensorSummary()
              setEstacionID(idstation)
            }}>Ver sensores</Button>
          </DialogActions>
        </Dialog>
      )
      }
    </>
  )
};

export default DeleteStationModal;