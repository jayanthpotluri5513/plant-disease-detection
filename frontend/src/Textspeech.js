import React, { useState, useEffect } from 'react';

const TextToSpeech = () => {
  const [voice, setVoice] = useState(null); // Initialize with null to indicate no voice selected
  const [utterance, setUtterance] = useState(null); // Keep track of the current utterance

  // Get available voices when the component mounts
  useEffect(() => {
    const speechSynthesis = window.speechSynthesis;

    // Check if voices are loaded or not
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        // Set the first available voice as the default
        setVoice(availableVoices[0]);
      } else {
        setTimeout(loadVoices, 100); // Try again if voices aren't available
      }
    };

    loadVoices();

    // Optionally listen for when voices change (e.g., if the language changes)
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Function to handle text-to-speech conversion
  const handleTextToSpeech = () => {
    const speechSynthesis = window.speechSynthesis;

    // Get the content to be spoken
    const pageContent = document.body.innerText;

    // Ensure content exists
    if (pageContent.trim() === "") {
      alert("No content available to read aloud.");
      return;
    }

    // Create a new speech synthesis utterance
    const newUtterance = new SpeechSynthesisUtterance(pageContent);

    // Set the selected voice
    newUtterance.voice = voice;

    // Optional: set other properties (rate, pitch)
    newUtterance.rate = 1;
    newUtterance.pitch = 1;

    // Set the utterance so we can stop it later
    setUtterance(newUtterance);

    // Speak the content
    speechSynthesis.speak(newUtterance);
  };

  // Function to stop the speech
  const stopSpeech = () => {
    const speechSynthesis = window.speechSynthesis;
    speechSynthesis.cancel(); // Stop the speech immediately
    setUtterance(null); // Reset the utterance state
  };

  return (
    <div style={styles.container}>
      <button onClick={handleTextToSpeech} style={styles.button}>
        Read Aloud
      </button>
      <button onClick={stopSpeech} style={styles.stopButton}>
        Stop Speech
      </button>
    </div>
  );
};

// Styling for the button
const styles = {
  container: {
    position: 'fixed',
    bottom: '150px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '12px 25px',
    backgroundColor: '#388e3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  stopButton: {
    padding: '12px 25px',
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, transform 0.3s',
  },
};

export default TextToSpeech;
