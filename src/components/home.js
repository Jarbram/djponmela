import React from 'react';
import { Container, Box, Typography, Button, Paper, Grid, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import DG from '../assets/djgiangi.jpg';
import DD from '../assets/djdiegopozo.jpeg';
import image1 from '../assets/IMG1.png';
import image2 from '../assets/IMG2.png';
import image3 from '../assets/IMG3.png';
import logo1 from '../assets/alba.png';
import logo2 from '../assets/L-Ancora.png';
import logo3 from '../assets/dembow.png';

const Home = () => {
  const testimonials = [
    { name: 'DJ Giangi', text: '"Muy buena aplicación, se proyecta a que será algo revolucionario en la industria del Dj. Recomendado."', image: DG },
    { name: 'DJ Diego Pozo', text: '“Una app indispensable para los DJ, facilita la conexión con el público y te ayuda a comprenderlos para mantener siempre la pista de baile on fire”. ', image: DD },
  ];

  const images = [image1, image2, image3];

  const brands = [
    { name: 'Brand 1', logo: logo1 },
    { name: 'Brand 2', logo: logo2 },
    { name: 'Brand 3', logo: logo3 },
  ];

  return (
    <Container maxWidth="lg">
      {/* Testimonials */}
      <Box sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h6" align="center" mb={2} sx={{ fontSize: '1rem', color:'#A6A5A6' }}>
          Escúchalo de nuestros clientes
        </Typography>
        <Typography variant="h5" align="center" gutterBottom mb={4}>
          ¡LLEVAMOS TU FIESTA A OTRO NIVEL!
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 2, backgroundColor: '#F8F7FB', color: '#383B3D', width: 'auto', height: '9rem' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mb: 2, width: 56, height: 56, top: '-40px' }} src={testimonial.image} />
                <Typography variant="body1" gutterBottom sx={{ marginTop: '-50px' }}>
                  {testimonial.text}
                </Typography>
              </Paper>
              <Typography mt={1} sx={{ textAlign: 'center', fontSize: '0.9rem' }}>
                {testimonial.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Image Slider */}
      <Box  sx={{ mt: 5, mb: 5 }}>
      <Carousel autoPlay={true}  animation="slide" indicators={false} navButtonsAlwaysVisible={false}>
          {images.map((image, index) => (
            <Box key={index} display="flex" justifyContent="center">
              <img src={image} alt={`slide-${index}`} style={{ maxWidth: '600px', height: '400px', borderRadius: '10px' }} />
            </Box>
          ))}
        </Carousel>
      </Box>

      {/* Brands Partners */}
      <Box sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h6" align="center" gutterBottom sx={{fontSize:'1rem', color:'#A6A5A6'}}>
          Hemos estado en:
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {brands.map((brand, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <img src={brand.logo} alt={brand.name} style={{ width: '100%', maxHeight: '90px', objectFit: 'contain' }} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ mt: 5, mb: 5, textAlign: 'center' }}>
        <Paper elevation={2} sx={{ p: 3,backgroundColor: '#F8F7FB', color: '#383B3D' }}>
          <Typography variant="h6" gutterBottom>
          ¿Estás interesado en probar nuestro servicio? ¡!
          </Typography>
          <Button component={Link} to="https://api.whatsapp.com/send?phone=51945429543&text=%C2%A1Hola%20Roberto!%20Quiero%20ver%20una%20demo%20de%20la%20app%20para%20DJs%20%F0%9F%8E%B6%F0%9F%94%A5" variant="contained" color="primary" size="large">
          ¡Contáctanos!
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
