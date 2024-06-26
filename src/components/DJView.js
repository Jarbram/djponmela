import React, { useState, useEffect } from 'react';
import { getDJRecords, deleteDJRecord } from '../api/airtable';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const DJView = () => {
  const { djId } = useParams();
  const [songs, setSongs] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const records = await getDJRecords(djId);
        setSongs(records);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
    fetchSongs();
  }, [djId]);

  const handleDelete = async (recordId) => {
    try {
      await deleteDJRecord(djId, recordId);
      setSongs(songs.filter(song => song.id !== recordId));
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  const handleFilter = () => {
    const sortedSongs = [...songs].sort((a, b) => {
      if (isFiltered) {
        return b.fields['Created'].localeCompare(a.fields['Created'])
      }
      return a.fields['Artist'].localeCompare(b.fields['Artist']);
    });
    setSongs(sortedSongs);
    setIsFiltered(!isFiltered);
    console.log(songs)
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom>
          ¡DJ Ponla!
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          La gente quiere escuchar:
        </Typography>
        <Box textAlign="center" mb={4}>
          <Button variant="contained" sx={{backgroundColor:'#54A772'}}  onClick={() => window.location.reload()}>
            Actualizar Lista
          </Button>
          <Button variant="contained" color="primary" onClick={handleFilter}>
            {isFiltered ? 'Ordenar por Reciente' : 'Ordenar por Artista'}
          </Button>
        </Box>
        <Grid container spacing={3}>
          {songs.map((song, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: '#fff', color: '#000' }}>
                <CardContent>
                  <Typography variant="h6">
                    {song.fields['Song Name']}
                  </Typography>
                  <Typography variant="subtitle1" color="Secondary">
                    {song.fields['Artist']}
                  </Typography>
                  <Box mt={2}>
                    <Button variant="contained" color="error" fullWidth onClick={() => handleDelete(song.id)}>
                      Ya la puse
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
