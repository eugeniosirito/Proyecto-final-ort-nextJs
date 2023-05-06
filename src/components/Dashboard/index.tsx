import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import DoughnutChart from '../Charts/DoughnutChart';
import LineChart from '../Charts/LineChart';
import styles from './styles.module.css';
import VectorMapV2 from '../VectorMapV2';

const DashCards = () => {

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
  ]

  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Grid container display={'flex'} flexDirection={'column'} lg={12}>
        <Typography textAlign={'center'} paddingLeft={2} paddingY={2} paddingBottom={0} color={'white'} variant='h5'>Selecciona tu estación</Typography>
        <Grid lg={12} paddingLeft={2} paddingY={2}>
          <Select fullWidth sx={{ backgroundColor: 'rgb(35, 48, 68)', color: 'white' }}
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="Todas">Todas</MenuItem>
            <MenuItem value={10}>AR-288234-BFS</MenuItem>
            <MenuItem value={20}>AJ-4234234-BFS</MenuItem>
            <MenuItem value={30}>ZC-6523424-BFS</MenuItem>
            <MenuItem value={30}>DS-1234234-BFS</MenuItem>
            <MenuItem value={30}>RR-4299234-BFS</MenuItem>
            <MenuItem value={30}>TT-9234234-BFS</MenuItem>
          </Select>
        </Grid>
        <Grid container display={'flex'} flexDirection={'row'} lg={12}>
          <Grid container lg={4} rowSpacing={{ lg: 1, sm: 2, xs: 2 }} columnSpacing={{ lg: 1, md: 2 }} paddingLeft={2} paddingY={2}>
            {testCards.map((card, index) => (
              <Grid key={index} item lg={6} md={6} sm={12} xs={12}>
                <Card sx={{ backgroundColor: 'rgb(35, 48, 68)' }}>
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
          <Grid container lg={8} paddingLeft={2} paddingY={2} className={styles.cacaca}>
            <Grid item lg={12} md={12} className={styles.cardsBgc}>
              <LineChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container lg={12}>
        <Grid container lg={7} paddingLeft={2} paddingY={2}>
          <Grid item lg={12} md={12} style={{ height: '300px' }}>
            <VectorMapV2 />
          </Grid>
        </Grid>
        <Grid container lg={5} rowSpacing={{ lg: 1, sm: 2, xs: 2 }} columnSpacing={{ lg: 1, md: 2 }} paddingLeft={2} paddingY={2}>
          <DoughnutChart />
        </Grid>
      </Grid>
    </>
  )
};

export default DashCards;