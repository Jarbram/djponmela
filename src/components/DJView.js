import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getDJRecords, deleteDJRecord, saveSongRequest } from '../api/airtable';
import { Container, Grid, Card, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import LogoExtendido from '../assets/Logo DJ Ponla extendido (sin fondo).png';

const DJView = () => {
  const { djId } = useParams();
  const [songs, setSongs] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSongs, setLoadingSongs] = useState({});

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const records = await getDJRecords(djId);
        setSongs(records.sort((a, b) => new Date(b.fields['Created']) - new Date(a.fields['Created'])));
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, [djId]);

  const handleDelete = async (recordId) => {
    setLoadingSongs(prevState => ({ ...prevState, [recordId]: true }));

    try {
      const songToDelete = songs.find(song => song.id === recordId);
      const newTableId = djId.replace(/^f|m$/g, '');
      await saveSongRequest(newTableId, songToDelete.fields['Song Name'], songToDelete.fields['Artist'], songToDelete.fields['Created']);
      await deleteDJRecord(djId, recordId);
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

  const refreshSongs = async () => {
    setLoading(true);
    try {
      const records = await getDJRecords(djId);
      setSongs(records.sort((a, b) => new Date(b.fields['Created']) - new Date(a.fields['Created'])));
    } catch (error) {
      console.error('Error refreshing songs:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <Button variant="contained" sx={{ backgroundColor: '#54A772', margin: 1, borderRadius: 5 }} onClick={refreshSongs} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Actualizar Lista'}
          </Button>
          <Button variant="contained" color="primary" sx={{ border: '1px solid', margin: 1, borderRadius: 5 }} onClick={handleFilter}>
            {isFiltered ? 'Desactivar' : 'Filtrar por Artista'}
          </Button>
        </Box>
        <Grid container spacing={3}>
          {filteredSongs.map((song, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: '#fff', color: '#000', borderRadius: 5 }}>
                <CardContent>
                  <Typography variant="h6">
                    {song.fields['Song Name']}
                  </Typography>
                  <Typography variant="subtitle1" color="secondary">
                    {song.fields['Artist']}
                  </Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: 5 }}
                      color="error"
                      fullWidth
                      onClick={() => handleDelete(song.id)}
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
      </Container>
    </Box>
  );
};

export default DJView;
