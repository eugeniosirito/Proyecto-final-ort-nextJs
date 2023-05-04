import React, { useState } from "react";
import clsx from 'clsx';
import { Grid, Button, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from '@mui/material'
import Image from 'next/image'
import pngegg from '../../assets/pngegg.png'
import styles from './styles.module.css';

const ControlPanel = () => {

  const [age, setAge] = useState('');
  const [activar, setActivar] = useState('Activar');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <>
      <Image src={pngegg} height={400} alt={''} className={age === '' ? styles.estacionNoImg : styles.estacionImgContainer} style={{ marginTop: '38px' }} />
      <Grid marginTop={4} sm={12} xs={12} display={'flex'} flexDirection={'column'}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-standard-label">Selecciona un modelo</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'10'}>AR-288234-BFS</MenuItem>
            <MenuItem value={20}>AJ-4234234-BFS</MenuItem>
            <MenuItem value={30}>ZC-6523424-BFS</MenuItem>
            <MenuItem value={30}>DS-1234234-BFS</MenuItem>
            <MenuItem value={30}>RR-4299234-BFS</MenuItem>
            <MenuItem value={30}>TT-9234234-BFS</MenuItem>
          </Select>
        </FormControl>
        <Grid display={'flex'} justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }} marginTop={0}>
          <Grid item>
            <Button variant="contained" className={styles.btnRegistrar} >Modificar</Button>
          </Grid>
          <Grid item>
          </Grid>
          <Grid item>
            <Button variant="contained" className={styles.btnRegistrar} >Exportar CSV</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" className={styles.btnRegistrar} >Ver en el mapa</Button>
          </Grid>
        </Grid>
        <Grid marginTop={2} marginBottom={2}>
          <Button
            fullWidth
            variant="contained"
            className={clsx({
              [styles.btnActivar]: activar === 'Activar',
              [styles.btnDesactivar]: activar === 'Desactivar'
            })}
            color={activar === 'Activar' ? 'success' : 'error'}
            onClick={() => {
              if (activar === 'Activar') {
                setActivar('Desactivar')
              } else {
                setActivar('Activar')
              }
            }}
          >
            {activar}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default ControlPanel;