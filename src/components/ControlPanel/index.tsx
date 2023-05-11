import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import TrafficOutlinedIcon from '@mui/icons-material/TrafficOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import styles from './styles.module.css';
import HomeTab from '../HomeTab';

const ControlPanelV2 = () => {


  const testCards = [
    {
      title: 'Home',
      icon: <HomeOutlinedIcon fontSize='large' color='primary' />
    },
    {
      title: 'Client',
      icon: <GroupOutlinedIcon fontSize='large' color='primary' />
    },
    {
      title: 'Help',
      icon: <HelpOutlineOutlinedIcon fontSize='large' color='primary' />
    },
    {
      title: 'Sites',
      icon: <LanguageOutlinedIcon fontSize='large' color='primary' />
    },
    {
      title: 'Email',
      icon: <MailOutlinedIcon fontSize='large' color='primary' />
    },
    {
      title: 'DNS',
      icon: <DnsOutlinedIcon fontSize='large' color='primary' />
    },
    {
      title: 'Monitor',
      icon: <TrafficOutlinedIcon fontSize='large' color='primary' />
    },
    {
      title: 'Tools',
      icon: <HandymanOutlinedIcon fontSize='large' color='primary' />
    },
    {
      title: 'System',
      icon: <SettingsOutlinedIcon fontSize='large' color='primary' />
    },
  ]

  return (
    <>
      <Grid container display={'flex'} flexDirection={'row'}>
        {testCards.map((card, index) => (
          <Grid key={index} item lg={1.333} md={1.333} sm={12} xs={12}>
            <Card className={styles.adminCardClickable} >
              <CardContent sx={{ paddingBottom: '8px !important' }}>
                <Typography variant='h6' color={'white'} textAlign={'center'}>{card.title}</Typography>
                <Grid marginTop={1} display={'flex'} alignContent={'center'} justifyContent={'center'}>
                  {card.icon}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <HomeTab />
    </>
  )
};

export default ControlPanelV2;