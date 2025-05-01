import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent } from '@mui/material'; // Use Grid instead of Grid2
import { RiPlantLine, RiMicroscopeLine, RiLeafLine, RiBarChartBoxLine } from 'react-icons/ri';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { Upload, Scan, FileText } from 'lucide-react'; // Icons from the first code
import field from './assets/crop.jpg';  // Import the image

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(15, 0, 10),
  textAlign: 'center',
  color: 'black',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f0f0f0',
  padding: theme.spacing(4),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const CardContentWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
}));

// Steps for the How It Works section
const steps = [
  {
    icon: Upload,
    title: "Upload Plant Image",
    description: "Take a clear photo of the affected plant part and upload it to our system for analysis.",
    color: "text-emerald-500",
  },
  {
    icon: Scan,
    title: "AI Analysis",
    description: "Our advanced AI system quickly analyzes the image to identify any diseases or issues.",
    color: "text-emerald-500",
  },
  {
    icon: FileText,
    title: "Get Results",
    description: "Receive detailed results and personalized treatment recommendations for your plant.",
    color: "text-emerald-500",
  },
];

const features = [
  { title: 'Advanced AI Detection', description: 'Utilize cutting-edge machine learning algorithms for accurate disease identification.', icon: RiMicroscopeLine },
  { title: 'Instant Results', description: 'Get real-time analysis and treatment recommendations for your plants.', icon: RiBarChartBoxLine },
];

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${field})`, // Correct usage of backgroundImage
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Container>
        <HeroSection>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Protect Your Plants with AI
          </Typography>
          <Typography variant="h5" paragraph>
            Instantly identify and treat plant diseases using advanced artificial intelligence.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            sx={{
              mt: 4,
              backgroundColor: 'white',
              color: '#56ab2f', // Custom text color
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
              borderColor: '#56ab2f', // Optional: Adding a green border to match text color
            }}
          >
            Get Started
          </Button>
        </HeroSection>

        <Grid container spacing={4} sx={{ mb: 8, justifyContent: 'center', alignItems: 'center' }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard>
                <CardContentWrapper>
                  <feature.icon size={50} style={{ color: '#56ab2f', marginBottom: '16px' }} />
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                </CardContentWrapper>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', color: 'white', pb: 4 }}>
          <Typography variant="h4" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '200px', // Set the height for a fixed circular size
                    width: '200px', // Set the width for a fixed circular size
                    borderRadius: '50%', // Make the card circular
                    margin: 'auto', // Center the card in the Grid item
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f0f0f0',
                    padding: 2,
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <step.icon size={50} style={{ color: '#56ab2f', marginBottom: '16px' }} />
                    <Typography gutterBottom variant="h6" component="div">
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
