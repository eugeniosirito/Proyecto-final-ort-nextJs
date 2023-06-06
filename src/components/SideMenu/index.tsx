import React from 'react'
import { Box, Button, Container, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Link from 'next/link';
import styles from './styles.module.css';


const SideMenu = () => {

  const links = [
    {
      name: 'Dashboard',
      path: '/dashboard'
    },
    {
      name: 'Agreagar estación',
      path: '/addstation'
    },
    {
      name: 'Panel de control',
      path: '/control-panel'
    }
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
              <Link href={item.path} className={styles.listBtnColor}>{item.name}</Link>
            </ListItem>
          ))}
        </List>
        <Divider className={styles.dividerColor} />

      </Grid>
    </>
  )
};

export default SideMenu;