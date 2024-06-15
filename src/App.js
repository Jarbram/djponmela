import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DJView from './components/DJView';
import SongRequestForm from './components/SongRequestForm';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; 

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/djv/:djId" element={<DJView />} />
          <Route path="/rs/:formId" element={<SongRequestForm />} />
      </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
