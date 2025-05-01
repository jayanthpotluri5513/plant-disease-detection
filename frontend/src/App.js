import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './Header';  // Import Header
import { Footer } from './footer';  // Import Footer
import LandingPage from './LandingPage';  // Import LandingPage
import { ImageUpload } from "./home";
import Faq from './Faq';  // Import Faq component
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleTranslate from './GoogleTranslate';
import ChatBot from './Chatbot';
import TextToSpeech from './Textspeech';
function App() {
  return (
    <Router>
      <Header />
      <GoogleTranslate />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<ImageUpload />} />
        <Route path="/faq" element={<Faq />} /> {/* Add route for Faq */}
      </Routes>
      <Footer />
      <ChatBot />
      <TextToSpeech />
    </Router>
  );
}

export default App;
