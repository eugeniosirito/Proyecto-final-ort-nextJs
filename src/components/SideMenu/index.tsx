import React, { useState } from 'react'
import { Divider, Grid, List, ListItem, ListItemIcon } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Link from 'next/link';
import styles from './styles.module.css';


const SideMenu = ({ setStartProgress }: any) => {

  const links = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Agreagar estación',
      path: '/addstation'
    },
    {
      name: 'Dashboard',
      path: '/dashboard'
    },
    {
      name: 'Panel de Administrador',
      path: '/control-panel-admin'
    },
  ]

  return (
    <>
      <Grid display={'flex'} flexDirection={'column'} className={styles.sideMenuContainer}>
        <List>
          {links.map((item, i) => (
            <ListItem key={i}>
              <ListItemIcon className={styles.listBtnColor}>
                <InboxIcon />
              </ListItemIcon>
              <Link onClick={() => {
                setStartProgress(true)
              }} href={item.path} className={styles.listBtnColor} style={{ color: 'rgb(167, 211, 147)' }}>{item.name}</Link>
            </ListItem>
          ))}
        </List>
        <Divider className={styles.dividerColor} />

      </Grid>
    </>
  )
};

export default SideMenu;