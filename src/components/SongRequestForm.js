import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Paper, Container, Modal, Box, Typography, CircularProgress, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { searchSongs } from '../api/deezer';
import { createSongRequest, getDJInfo } from '../api/airtable';
import { Link, useParams } from 'react-router-dom';

const SongRequestForm = () => {
  const { formId } = useParams();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [djInfo, setDjInfo] = useState({});
  const [loadingDJInfo, setLoadingDJInfo] = useState(true);

  useEffect(() => {
    const fetchDJInfo = async () => {
      try {
        const info = await getDJInfo(formId);
        setDjInfo(info);
      } catch (error) {
        console.error('Error fetching DJ info:', error);
      } finally {
        setLoadingDJInfo(false);
      }
    };
    fetchDJInfo();
  }, [formId]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('El campo de búsqueda no puede estar vacío');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const songs = await searchSongs(query);
      setResults(songs);
    } catch (error) {
      console.error('Error searching songs:', error);
      setError('Hubo un error al buscar canciones. Por favor, inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (song) => {
    setSelectedSong(song);
    setResults([]);
    setQuery('');
  };

  const handleSubmit = async () => {
    if (!selectedSong) return;
    setLoading(true);
    try {
      await createSongRequest(formId, selectedSong.title, selectedSong.artist.name);
      setOpen(true);  
    } catch (error) {
      console.error('Error adding song request:', error);
      setError('Hubo un error al solicitar la canción. Por favor, inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedSong(null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSong(null);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h4" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          ¡Noche de chicas!
        </Typography>
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          {loadingDJInfo ? (
            <CircularProgress />
          ) : (
            djInfo.Foto && djInfo.Foto.length > 0 ? (
              <img src={djInfo.Foto[0].url} alt={djInfo.Name} style={{ width: '100%', borderRadius: 10 }} />
            ) : (
              <Typography variant="h6" color="error">No se pudo cargar la imagen del DJ</Typography>
            )
          )}
          <Typography variant="h5" component="h1" sx={{ marginTop: 2 }}>
            {djInfo.Name ? `${djInfo.Name} tocando en Alba Rooftop` : 'DJ tocando en Alba Rooftop'}
          </Typography>
        </Box>
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          ¿Qué canción quieres cantar?
        </Typography>
        {!selectedSong && (
          <>
            <TextField
              fullWidth
              label="Nombre de la canción"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                marginBottom:'2rem',
                "& .MuiOutlinedInput-root": {
                  color: "#ffffff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#C2C2C2",

                  },
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#C2C2C2",
                    },
                  },
                },
                "& .MuiInputLabel-outlined": {
                  color: "#C2C2C2",
                  "&.Mui-focused": {
                    color: "#868686",
                  },
                },
              }}
              error={!!error}
              helperText={error}
            />
            <Button fullWidth variant="contained" color="primary" onClick={handleSearch} sx={{ marginBottom: 2, backgroundColor: '#54A772' }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Buscar'}
            </Button>
          </>
        )}
        <List>
          {results.map((song, index) => (
            <ListItem button key={index} onClick={() => handleSelect(song)}>
              <ListItemText primary={song.title} secondary={song.artist.name} />
            </ListItem>
          ))}
        </List>
        {selectedSong && (
          <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle1">Canción seleccionada</Typography>
                <Typography variant="body1">{selectedSong.title} por {selectedSong.artist.name}</Typography>
              </Box>
              <IconButton onClick={handleCancel} aria-label="cancel">
                <CloseIcon />
              </IconButton>
            </Box>
            <Button fullWidth variant="contained"  onClick={handleSubmit} sx={{ marginTop: 2, backgroundColor: '#54A772' }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Solicitar canción'}
            </Button>
          </Paper>
        )}
      </Paper>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" component="h3" sx={{fontSize:'1rem'}}>
            Tu canción fue solicitada
          </Typography>
          <Button fullWidth variant="contained" color="primary" onClick={handleClose} sx={{ marginTop: 2,backgroundColor: '#54A772' }}>
            Pedir otra
          </Button>
          <Button component={Link} to="https://www.instagram.com/djdiegopozo/" fullWidth variant="outlined"  sx={{ fontSize: '', marginTop: 2, color:'#ffffff',borderColor:'#ffffff' }}>
            Sígueme en Instagram
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default SongRequestForm;
