import React from 'react';
import { Box, Container, Typography, Link, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { RiFacebookCircleLine, RiTwitterLine, RiInstagramLine, RiPlantLine } from 'react-icons/ri';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#388e3c',
  color: 'white',
  padding: theme.spacing(1, 0),
  marginTop: 'auto',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'white',
  '&:hover': {
    color: theme.palette.secondary.light,
    textDecoration: 'none',
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: theme.palette.secondary.light,
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <FooterContainer component="footer">
      <Container maxWidth="lg">
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          <Box>
            <FooterSection>
              <FooterTitle variant="h6" gutterBottom>
                About Us
              </FooterTitle>
              <Typography variant="body2">
                We are dedicated to improving plant health through advanced disease detection and classification technologies.
              </Typography>
              <Box display="flex" alignItems="center" mt={2}>
                <RiPlantLine size={24} style={{ marginRight: '8px' }} />
                <Typography variant="h6">PlantGuard AI</Typography>
              </Box>
            </FooterSection>
          </Box>

          <Box>
            <FooterSection>
              <FooterTitle variant="h6" gutterBottom>
                Quick Links
              </FooterTitle>
              <Box>
                <FooterLink
                  href="#"
                  variant="body2"
                  underline="hover"
                  onClick={() => handleNavigate('/')}
                >
                  Home
                </FooterLink>
              </Box>
              <Box mt={1}>
                <FooterLink
                  href="#"
                  variant="body2"
                  underline="hover"
                  onClick={() => handleNavigate('/home')}
                >
                  How It Works
                </FooterLink>
              </Box>
              <Box mt={1}>
                <FooterLink
                  href="#"
                  variant="body2"
                  underline="hover"
                  onClick={() => handleNavigate('/faq')}
                >
                  FAQ
                </FooterLink>
              </Box>
              <Box mt={1}>
                <FooterLink
                  href="https://www.amazon.com/s?k=plant+supplements"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  underline="hover"
                >
                  Explore Plant Supplements
                </FooterLink>
              </Box>
            </FooterSection>
          </Box>

          <Box>
            <FooterSection>
              <FooterTitle variant="h6" gutterBottom>
                Connect With Us
              </FooterTitle>
              <Box>
                <SocialButton aria-label="Facebook">
                  <RiFacebookCircleLine size={24} />
                </SocialButton>
                <SocialButton aria-label="Twitter">
                  <RiTwitterLine size={24} />
                </SocialButton>
                <SocialButton aria-label="Instagram">
                  <RiInstagramLine size={24} />
                </SocialButton>
              </Box>
            </FooterSection>
          </Box>
        </Box>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        <Box mt={2}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} PlantGuard AI. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
}
export { Footer };