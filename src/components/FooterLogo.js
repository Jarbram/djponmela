import React from 'react';
import { Box, Typography } from '@mui/material';
import LogoExtendido from '../assets/Logo DJ Ponla extendido (sin fondo).png';

const FooterLogo = () => (
  <Box sx={{ textAlign: 'center', marginBottom: 0 }}>
    <Typography variant="subtitle1" sx={{ fontSize: '0.8rem', marginBottom: -2, marginTop: 4 }}>Creado por:</Typography>
    <img src={LogoExtendido} alt='Logo DJPonla' style={{ width: '50%', height: '50%', borderRadius: 10 }} />
  </Box>
);

export default FooterLogo;
