import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RiPlantLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '8vh',
  background: 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)',
  display: 'flex',
  flexDirection: 'column',
}));

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleNavigateHome = () => {
    navigate('/'); // Navigate to the homepage
  };

  const handleNavigateStart = () => {
    navigate('/home'); // Navigate to the Start page
  };

  const handleNavigateFAQ = () => {
    navigate('/faq'); // Navigate to the FAQ page
  };

  return (
    <GradientBackground>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <RiPlantLine
            size={32}
            style={{ marginRight: '10px', cursor: 'pointer' }}
            onClick={handleNavigateHome} // Trigger navigation on click
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={handleNavigateHome} // Trigger navigation on click
          >
            PlantGuard AI
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button color="inherit" onClick={handleNavigateHome}>
              Home
            </Button>
            <Button color="inherit" onClick={handleNavigateStart}>
              Start
            </Button>
            <Button color="inherit" onClick={handleNavigateFAQ}>
              FAQ
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </GradientBackground>
  );
};

export { Header };
