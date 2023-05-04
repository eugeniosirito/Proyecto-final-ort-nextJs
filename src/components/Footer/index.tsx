import React from 'react';
import { AppBar, Toolbar, Typography, Box, Link } from '@mui/material';

const Footer = () => {
  return (
    <>
      <AppBar position="static" elevation={1} sx={{ borderTop: '1px solid white', backgroundColor: 'rgb(27, 38, 53)' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography sx={{ color: 'white' }}>
              © 2023 My Website
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Footer;