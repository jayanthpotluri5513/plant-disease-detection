import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme } from '@mui/material';
import { RiLeafLine, RiWaterFlashLine, RiSunLine, RiScissorsCutLine, RiArrowDownSLine } from 'react-icons/ri';
import plants from './assets/plants.jpg';
// Main Faq Component
const Faq = () => {
  const theme = useTheme(); // Use theme inside the component
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(to bottom right, #a8e6cf, #d0e6f4)', // Optional gradient background
      backgroundImage: `url(${plants})`, // Add your image URL here
      backgroundSize: 'cover', // Ensure the image covers the entire area
      backgroundPosition: 'center', // Center the background image
      backgroundAttachment: 'fixed', // Make the background fixed while scrolling
    }}>
      <Container maxWidth="xl" sx={{ flexGrow: 1, paddingY: 4 }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 4,
          ['@media (min-width: 1200px)']: { gridTemplateColumns: '1fr 1fr' }
        }}>
          <RotatingFactSection />
          <PlantHealthTips />
        </Box>
        <FaqAccordion theme={theme} />
      </Container>
    </Box>
  );
}

// Rotating Fact Section - Holds the Rotating Cards
const RotatingFactSection = () => {
  const facts = [
    "Plants can communicate with each other through their roots.",
    "Some plants can detect vibrations and respond to sound.",
    "There are over 391,000 known species of plants on Earth.",
    "Trees are the longest-living organisms on Earth.",
    "Bamboo can grow up to 35 inches in a single day.",
  ];

  // State to hold the current fact index for each card
  const [currentFactIndex, setCurrentFactIndex] = useState([0, 1, 2]);

  useEffect(() => {
    // Set interval to change facts every 3 seconds (3000ms)
    const interval = setInterval(() => {
      setCurrentFactIndex(prevIndex => prevIndex.map(index => (index + 1) % facts.length)); // Cycle through facts
    }, 3000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [facts.length]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {/* Display three rotating cards with different facts */}
      <RotatingFactCard fact={facts[currentFactIndex[0]]} />
      <RotatingFactCard fact={facts[currentFactIndex[1]]} />
      <RotatingFactCard fact={facts[currentFactIndex[2]]} />
    </Box>
  );
}

// Rotating Fact Card Component
const RotatingFactCard = ({ fact }) => {
  return (
    <Box sx={{
      width: 250,
      height: 250,
      perspective: '1000px', // To create the 3D effect
      margin: 2
    }}>
      <Box sx={{
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s',
        '&:hover': {
          transform: 'rotateY(180deg)', // Rotate the card on hover
        }
      }}>
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          borderRadius: 2
        }}>
          <Typography sx={{ padding: 2, textAlign: 'center', color: '#333' }}>
            {fact}
          </Typography>
        </Box>
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'rotateY(180deg)',
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }}>
          {/* Optionally, add more content here for the backside of the card */}
        </Box>
      </Box>
    </Box>
  );
}

// Plant Health Tips Section
const PlantHealthTips = () => {
  const tips = [
    { title: 'Proper Watering', content: 'Water deeply and less frequently to encourage deep root growth.', icon: RiWaterFlashLine, color: '#2196f3' },
    { title: 'Adequate Sunlight', content: 'Ensure plants receive at least 6 hours of direct sunlight daily, unless they are shade-loving species.', icon: RiSunLine, color: '#ffeb3b' },
    { title: 'Regular Pruning', content: 'Remove dead or diseased parts to promote healthy growth and prevent the spread of diseases.', icon: RiScissorsCutLine, color: '#4caf50' },
    { title: 'Soil Health', content: 'Use well-draining, nutrient-rich soil and consider adding compost to improve soil structure and fertility.', icon: RiLeafLine, color: '#795548' },
  ];

  return (
    <Box sx={{ backgroundColor: 'white', opacity: 0.9, backdropFilter: 'blur(10px)', borderRadius: 2, boxShadow: 3, padding: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4caf50', marginBottom: 2 }}>Plant Health Tips</Typography>
      {tips.map((tip, index) => (
        <Box key={index} sx={{ marginBottom: 2, padding: 2, borderRadius: 1, backgroundColor: `${tip.color}80`, '&:hover': { backgroundColor: `${tip.color}99` }, transition: 'background-color 0.3s' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <tip.icon style={{ fontSize: 24, color: tip.color, marginRight: 8 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>{tip.title}</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#000' }}>{tip.content}</Typography>
        </Box>
      ))}
    </Box>
  );
}

// FAQ Accordion
const FaqAccordion = ({ theme }) => {
    const faqItems = [
        { question: "What is plant disease detection?", answer: "Plant disease detection is the process of identifying and diagnosing various diseases that affect plants." },
        { question: "How does AI help in plant disease detection?", answer: "AI can analyze images of plant leaves and stems to detect signs of diseases." },
        { question: "What are common signs of plant diseases?", answer: "Common signs of plant diseases include discoloration, wilting, and spots on leaves." },
        { question: "How can I prevent plant diseases?", answer: "Prevent plant diseases by practicing crop rotation, using disease-resistant varieties, and maintaining garden cleanliness." }
    ];
    

  return (
    <Box sx={{ marginTop: 4, backgroundColor: 'white', opacity: 0.9, backdropFilter: 'blur(10px)', borderRadius: 2, boxShadow: 3, padding: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.success.main, marginBottom: 2 }}>Frequently Asked Questions</Typography>
      {faqItems.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<RiArrowDownSLine />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography sx={{ fontWeight: 'bold' }}>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default Faq;
