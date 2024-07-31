import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const DJInfoSection = ({ djInfo, loadingDJInfo }) => (
  <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
    {loadingDJInfo ? (
      <CircularProgress />
    ) : (
      <>
        {djInfo.Logo && djInfo.Logo.length > 0 && (
          <img src={djInfo.Logo[0].url} alt={djInfo.Name} style={{ width: '40%', height: '40%', borderRadius: 10 }} />
        )}
        {djInfo.Foto && djInfo.Foto.length > 0 ? (
          <img src={djInfo.Foto[0].url} alt={djInfo.Name} style={{ width: '90%', height: '90%', borderRadius: 10 }} />
        ) : (
          <Typography variant="h6" color="error">No se pudo cargar la imagen del DJ</Typography>
        )}
        <Typography variant="h5" component="h1" sx={{ marginTop: 2 }}>
          {djInfo.Name ? `Tocando ${djInfo.Name}` : 'DJ tocando en Alba Rooftop'}
        </Typography>
      </>
    )}
  </Box>
);

export default DJInfoSection;
