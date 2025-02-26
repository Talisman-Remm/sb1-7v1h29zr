import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Initialize from './pages/Initialize';

function App() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/initialize" element={<Initialize />} />
        </Routes>
      </Router>
    </GoogleReCaptchaProvider>
  );
}

export default App;