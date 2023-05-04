import React from 'react';
import styles from './styles.module.css';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
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

  return (
    <>
      <Grid container lg={12}>
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
        <Grid container lg={8} paddingLeft={2} paddingY={2} >
          <Grid item lg={12} md={12} className={styles.cardsBgc}>
          </Grid>
        </Grid>
      </Grid>
      <Grid container lg={12}>
        <Grid container lg={7} paddingLeft={2} paddingY={2} >
          <Grid item lg={12} md={12} className={styles.cardsBgc}>
            <VectorMapV2 />
          </Grid>
        </Grid>
        <Grid container lg={5} rowSpacing={{ lg: 1, sm: 2, xs: 2 }} columnSpacing={{ lg: 1, md: 2 }} paddingLeft={2} paddingY={2}>
          {testCards.map((card, index) => (
            <Grid key={index} item lg={6} md={6} sm={12} xs={12}>
              <Card className={styles.cardsBgc}>
                <CardContent>
                  <Typography color={'white'}>{card.title}</Typography>
                  <Typography color={'white'}>{card.content}</Typography>
                </CardContent>
                <CardActions>
                  <Button>{card.button}</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  )
};

export default DashCards;