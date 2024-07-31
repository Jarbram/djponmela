import React from 'react';
import { Paper, Box, Typography, Button, IconButton, CircularProgress } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const SelectedSongSection = ({ selectedSong, handleCancel, handleSubmit, loading }) => (
  <Paper elevation={1} sx={{ padding: 2, marginTop: -1, marginBottom: 2 }}>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography variant="subtitle1">Canción seleccionada</Typography>
        <Typography variant="body1">{selectedSong.title} por {selectedSong.artist.name}</Typography>
      </Box>
      <IconButton onClick={handleCancel} aria-label="cancel">
        <CloseIcon />
      </IconButton>
    </Box>
    <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ marginTop: 2, backgroundColor: '#54A772' }} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : 'Solicitar canción'}
    </Button>
  </Paper>
);

export default SelectedSongSection;
