import React from 'react'
import styles from './styles.module.css';
import { Box, Button, Container, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Link from 'next/link';


const SideMenu = () => {

  const links = [
    {
      name: 'Dashboard',
      path: '/dashboard'
    },
    {
      name: 'Agreagar estación',
      path: '/addstation'
    }
  ]

  return (
    <>
      <Grid display={'flex'} flexDirection={'column'}>
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
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton className={styles.listBtnColor}>
                <ListItemIcon className={styles.listBtnColor}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider className={styles.dividerColor} />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton className={styles.listBtnColor}>
                <ListItemIcon className={styles.listBtnColor}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider className={styles.dividerColor} />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton className={styles.listBtnColor}>
                <ListItemIcon className={styles.listBtnColor}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  )
};

export default SideMenu;