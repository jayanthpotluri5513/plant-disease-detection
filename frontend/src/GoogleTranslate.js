import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Check if the Google Translate script is already added
    if (window.google && window.google.translate) {
      window.googleTranslateElementInit(); // Initialize if already present
    } else {
      // Create and append the Google Translate script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      // Define the callback function for initializing the widget
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en', // Default language of your site
          includedLanguages: 'hi,en,te,bn,ml,ta,gu,mr,kn,pa,or,as,ne,si,ur,ma,sd,bho,bh', // All Indian languages
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false, // Prevent automatic display
        }, 'google_translate_element');
      };

      script.onerror = (e) => {
        console.error("Google Translate script failed to load", e);
      };
    }

    // Clean up the script when the component is unmounted
    return () => {
      const script = document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
