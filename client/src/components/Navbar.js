import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">StyleUp-AI</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-200">About</Link>
          <Link to="/contact" className="text-white hover:text-gray-200">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
