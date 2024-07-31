import React from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';

const SongRequestModal = ({ open, handleClose, djInfo }) => (
  <Modal open={open} onClose={handleClose}>
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 300,
      bgcolor: 'background.paper',
      border: '1px solid #fff',
      boxShadow: 25,
      p: 4,
      borderRadius: 5,
    }}>
      <Typography variant="h6" component="h3" sx={{ fontSize: '1rem', textAlign:'center' }}>
      ¡Tu canción fue sugerida! 
      </Typography>
      <Typography variant="h6" component="h3" sx={{ fontSize: '1rem', textAlign:'center' }}>
      El DJ la tendrá en consideración
      </Typography>
      <Button fullWidth variant="contained" color="primary" onClick={handleClose} sx={{ marginTop: 2, backgroundColor: '#54A772' }}>
        Pedir otra
      </Button>
      <Typography variant="h6" component="h3" sx={{ fontSize: '1rem', textAlign:'center', marginTop: 2 }}>
      ¡Síguenos en Instagram! 
      </Typography>
      {djInfo.InstagramLink && djInfo.InstagramHandle && (
        <Button component={Link} to={djInfo.InstagramLink} fullWidth variant="outlined" sx={{ fontSize: '', marginTop: 2, color: '#ffffff', borderColor: '#ffffff' }}>
          <InstagramIcon /> {djInfo.InstagramHandle}
        </Button>
      )}
    </Box>
  </Modal>
);

export default SongRequestModal;
