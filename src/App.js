import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DJView from './view/DJView';
import SongRequestForm from './view/SongRequestForm';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; 
import Home from './view/home';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/djv/:djId" element={<DJView />} />
          <Route path="/rs/:formId" element={<SongRequestForm />} />
      </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
