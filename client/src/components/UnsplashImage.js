import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function UnsplashImage({ urls }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    if (!urls || urls.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === urls.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [urls]);

  if (!urls || urls.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-800 to-black">
        <p className="text-white text-xl">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${urls[currentImageIndex]})` }}
        />
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {urls.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
