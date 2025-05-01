import React, { useState } from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { styled } from '@mui/material/styles';

const FactPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  maxWidth: '200%', // Set the desired width // Center horizontally
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const IconButton = styled('button')(({ theme }) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: theme.palette.primary.main,
  fontSize: '24px',
  padding: theme.spacing(1),
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

const facts = [
  "Did you know? Over 10,000 plant diseases are caused by fungi.",
  "Healthy plants can better resist disease and recover from damage.",
  "Some plant diseases can spread through air, water, soil, or insects.",
  "Early detection of plant diseases can save up to 30-40% of crop yield.",
  "Crop rotation is a natural way to prevent many soil-borne diseases.",
];

export default function PlantDiseaseFacts() {
  const [currentFact, setCurrentFact] = useState(0);
  const theme = useTheme();

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % facts.length);
  };

  const prevFact = () => {
    setCurrentFact((prev) => (prev - 1 + facts.length) % facts.length);
  };

  return (
    <FactPaper elevation={3}>
      <Box display="flex" alignItems="center">
        <IconButton onClick={prevFact}>
          <RiArrowLeftSLine />
        </IconButton>
        <Box flexGrow={1} textAlign="center">
          <Typography variant="h6" color="primary" gutterBottom>
            Plant Disease Fact #{currentFact + 1}
          </Typography>
          <Typography variant="body1">
            {facts[currentFact]}
          </Typography>
        </Box>
        <IconButton onClick={nextFact}>
          <RiArrowRightSLine />
        </IconButton>
      </Box>
    </FactPaper>
  );
}
