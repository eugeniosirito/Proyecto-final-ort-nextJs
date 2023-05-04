import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import styles from './styles.module.css';
import { AppBar, Toolbar, IconButton, Typography, Button, Grid, Box } from '@mui/material'

const Header = () => {
  return (
    <>
      <AppBar position="static" elevation={1} sx={{ borderBottom: '1px solid white', backgroundColor: 'rgb(27, 38, 53)' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Aplicación
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header;