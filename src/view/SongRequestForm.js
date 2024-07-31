import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField, Button, List, ListItem, ListItemText, Paper, Container, Typography, CircularProgress
} from '@mui/material';
import { searchSongs } from '../api/deezer';
import { createSongRequest, getDJInfo } from '../api/airtable';
import { useParams } from 'react-router-dom';
import DJInfoSection from '../components/DJInfoSection';
import SelectedSongSection from '../components/SelectedSongSection';
import FooterLogo from '../components/FooterLogo';
import SongRequestModal from '../components/SongRequestModal';

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

  const handleSearch = useCallback(async () => {
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
  }, [query]);

  const handleSelect = useCallback((song) => {
    setSelectedSong(song);
    setResults([]);
    setQuery('');
  }, []);

  const handleSubmit = useCallback(async () => {
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
  }, [formId, selectedSong]);

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
        <DJInfoSection djInfo={djInfo} loadingDJInfo={loadingDJInfo} />
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2, textAlign: 'center', fontSize:'1.1rem' }}>
          ¿Qué canción quieres escuchar?
        </Typography>
        {!selectedSong && (
          <>
            <TextField
              fullWidth
              label="Nombre de la canción"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                marginBottom: '2rem',
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ marginTop: -1, marginBottom: 2, backgroundColor: '#54A772' }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Buscar'}
            </Button>
          </>
        )}
        <List>
          {results.map((song, index) => (
            <ListItem  key={index} onClick={() => handleSelect(song)}>
              <ListItemText primary={song.title} secondary={song.artist.name} />
            </ListItem>
          ))}
        </List>
        {selectedSong && (
          <SelectedSongSection
            selectedSong={selectedSong}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}
        <FooterLogo />
      </Paper>
      <SongRequestModal open={open} handleClose={handleClose} djInfo={djInfo} />
    </Container>
  );
};

export default SongRequestForm;
