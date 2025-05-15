import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center">
              <span className="text-white text-3xl font-extrabold tracking-tight">
                Style<span className="text-indigo-400">Up</span>
                <span className="text-xs align-top text-indigo-400 ml-1">.AI</span>
              </span>
            </Link>
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-indigo-300 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-indigo-300 transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-indigo-300 transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-4 py-3">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-indigo-300 transition-colors duration-200 font-medium text-center py-2"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-indigo-300 transition-colors duration-200 font-medium text-center py-2"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-indigo-300 transition-colors duration-200 font-medium text-center py-2"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
