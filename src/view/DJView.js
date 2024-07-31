import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getDJRecords, saveSongRequest } from '../api/airtable';
import { Container, Grid, Card, CardContent, Typography, Button, Box, CircularProgress, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LogoExtendido from '../assets/Logo DJ Ponla extendido (sin fondo).png';

const DJView = () => {
  const { djId } = useParams();
  const [songs, setSongs] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loadingSongs, setLoadingSongs] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const records = await getDJRecords(djId);
        setSongs(records.sort((a, b) => new Date(b.fields['Created']) - new Date(a.fields['Created'])));
      } catch (error) {
        console.error('Error fetching songs:', error);
        setError('Hubo un error al cargar las canciones. Por favor, inténtelo de nuevo.');
      }
    };

    fetchSongs();

    const interval = setInterval(fetchSongs, 6000); // Actualiza cada 6 segundos
    return () => clearInterval(interval);
  }, [djId]);

  const handleDelete = async (recordId, option = '') => {
    setLoadingSongs(prevState => ({ ...prevState, [recordId]: true }));

    try {
      const songToDelete = songs.find(song => song.id === recordId);
      const newTableId = djId.replace(/^f|m$/g, '');
      await saveSongRequest(newTableId, songToDelete.fields['Song Name'], songToDelete.fields['Artist'], songToDelete.fields['Created'], option);
      setSongs(prevSongs => prevSongs.filter(song => song.id !== recordId));
    } catch (error) {
      console.error('Error deleting song:', error);
    } finally {
      setLoadingSongs(prevState => ({ ...prevState, [recordId]: false }));
    }
  };

  const handleFilter = useCallback(() => {
    setIsFiltered(prev => !prev);
  }, []);

  const filteredSongs = useMemo(() => {
    if (isFiltered) {
      return [...songs].sort((a, b) => a.fields['Artist'].localeCompare(b.fields['Artist']));
    }
    return songs;
  }, [songs, isFiltered]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', py: 2 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <img src={LogoExtendido} alt='Logo DJPonla' style={{ width: '70%', height: 'auto', borderRadius: 10 }} />
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          La gente quiere escuchar:
        </Typography>
        <Box textAlign="center" mb={4}>
          <Button variant="contained" color="primary" sx={{ border: '1px solid', margin: 1, borderRadius: 5 }} onClick={handleFilter}>
            {isFiltered ? 'Desactivar' : 'Filtrar por Artista'}
          </Button>
        </Box>
        <Grid container spacing={3}>
          {filteredSongs.length === 0 && (
            <Box sx={{ width: '100%', textAlign: 'center', color: '#fff', marginTop: 4 }}>
              <Typography variant="h6" sx={{fontSize:"0.8rem"}}>A la espera de nuevas canciones...</Typography>
            </Box>
          )}
          {filteredSongs.map((song, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: '#fff', color: '#000', borderRadius: 5, position: 'relative' }}>
                <CardContent>
                  <Typography variant="h6">
                    {song.fields['Song Name']}
                  </Typography>
                  <Typography variant="subtitle1" color="secondary">
                    {song.fields['Artist']}
                  </Typography>
                  <IconButton
                    size="large"
                    sx={{ position: 'absolute', top: 10, right: 8, color: "#f44336" }}
                    onClick={() => handleDelete(song.id, 'No la quiero poner')}
                    disabled={loadingSongs[song.id]}
                  >
                    <CancelOutlinedIcon />
                  </IconButton>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: 5 }}
                      color="error"
                      fullWidth
                      onClick={() => handleDelete(song.id, 'Se puso')}
                      disabled={loadingSongs[song.id]}
                    >
                      {loadingSongs[song.id] ? <CircularProgress size={24} /> : 'Ya la puse'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {error && (
          <Box textAlign="center" mt={4}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default DJView;
