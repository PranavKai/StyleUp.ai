import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
      <div className="min-h-screen bg-gray-100 font-fashion">
        <Navbar />
        <header className="max-w-4xl mx-auto mb-10 p-6">
          <h1 className="text-4xl font-bold text-center text-gray-800">StyleUp</h1>
          <UnsplashImage urls={unsplashImageUrls} />
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<RecommendationForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
