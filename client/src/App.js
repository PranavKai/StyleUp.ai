import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import RecommendationForm from './components/RecommendationForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UnsplashImage from './components/UnsplashImage';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  const unsplashImageUrls = [
    process.env.PUBLIC_URL + '/unsplash1.jpg',
    process.env.PUBLIC_URL + '/unsplash2.jpg',
    process.env.PUBLIC_URL + '/unsplash3.jpg',
    process.env.PUBLIC_URL + '/unsplash.jpg',
    process.env.PUBLIC_URL + '/unsplash5.jpg',
    process.env.PUBLIC_URL + '/unsplash6.jpg',
  ];

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <Navbar />

        <Routes>
          <Route exact path="/" element={
            <>
              <header className="relative">
                <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-b from-indigo-900 to-black">
                  <UnsplashImage urls={unsplashImageUrls} />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
                      <span className="block">Style<span className="text-indigo-400">Up</span>.AI</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-xl text-gray-100 sm:text-2xl md:mt-5 md:max-w-3xl">
                      AI-powered fashion recommendations for every occasion
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-10 w-full max-w-4xl"
                  >
                    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl">
                      <RecommendationForm />
                    </div>
                  </motion.div>
                </div>
              </header>
            </>
          } />
          <Route path="/about" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-grow container mx-auto py-16 px-4"
            >
              <About />
            </motion.div>
          } />
          <Route path="/contact" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-grow container mx-auto py-16 px-4"
            >
              <Contact />
            </motion.div>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
