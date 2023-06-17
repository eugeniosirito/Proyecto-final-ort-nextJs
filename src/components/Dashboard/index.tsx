import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import DoughnutChart from '../Charts/DoughnutChart';
import LineChart from '../Charts/LineChart';
import styles from './styles.module.css';
import VectorMapV2 from '../VectorMapV2';
import { getEstaciones } from '@/services';
import { IngresoEstacionValues } from '@/utils/interfaces';

const DashCards = () => {

  const [selectedValue, setSelectedValue] = useState('');
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

  /* llama al get estaciones apenas se renderiza la pantalla */
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

  const testCards = [
    {
      title: 'Visitors',
      content: '24.532',
      button: 'TestCards',
      percentage: '-14%',
      positive: false
    },
    {
      title: 'Activity',
      content: '63.200',
      button: 'TestCards',
      percentage: '9%',
      positive: true
    },
    {
      title: 'Real-Time',
      content: '1.320',
      button: 'TestCards',
      percentage: '27%',
      positive: true
    },
    {
      title: 'Bounce',
      content: '12.364',
      button: 'TestCards',
      percentage: '-32%',
      positive: false
    },
  ];

  const handleChange = (event: { target: { value: any; }; }) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <Grid container display={'flex'} flexDirection={'column'} lg={12}>
        <Typography textAlign={'center'} paddingLeft={2} paddingY={2} paddingBottom={0} color={'white'} variant='h5'>Selecciona tu estación</Typography>
        <Grid item lg={12} paddingLeft={2} paddingY={2}>
          <Select fullWidth className={styles.boxShadowCss} sx={{ backgroundColor: 'rgb(12, 52, 110)', color: 'white' }}
            label="id"
            value={selectedValue}
            onChange={handleChange}
          >
            {estaciones.map((item, i) => (
              <MenuItem value={item.id} key={i}>{item.id}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid container display={'flex'} flexDirection={'row'} lg={12}>
          <Grid container lg={4} rowSpacing={{ lg: 1, sm: 2, xs: 2 }} columnSpacing={{ lg: 1, md: 2 }} paddingLeft={2} paddingY={2}>
            {testCards.map((card, index) => (
              <Grid key={index} item lg={6} md={6} sm={12} xs={12} className={styles.boxShadowCss}>
                <Card sx={{ backgroundColor: 'rgb(12, 52, 110)' }}>
                  <CardContent sx={{ paddingBottom: '8px !important' }}>
                    <Typography variant='h6' color={'white'}>{card.title}</Typography>
                    <Typography marginTop={1} variant='h4' color={'white'}>{card.content}</Typography>
                    <Grid marginTop={1}>
                      <span className={card.positive ? styles.percentagePositive : styles.percentageNegative}>{card.percentage}</span>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid container lg={8} paddingLeft={2} paddingY={2}>
            <Grid item lg={12} md={12} className={styles.cardsBgc}>
              <LineChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container lg={12}>
        <Grid container lg={7} paddingLeft={2} paddingY={2} paddingRight={3}>
          <Grid item lg={12} md={12} style={{ height: '300px' }} className={styles.boxShadowCss}>
            <VectorMapV2 />
          </Grid>
        </Grid>
        <Grid container lg={5} rowSpacing={{ lg: 1, sm: 2, xs: 2 }} columnSpacing={{ lg: 1, md: 2 }} paddingLeft={2} paddingY={2}
          style={{ marginTop: '16px', height: '300px', backgroundColor: "rgb(12, 52, 110)" }} className={styles.boxShadowCss}>
          <DoughnutChart />
        </Grid>
      </Grid>
    </>
  )
};

export default DashCards;