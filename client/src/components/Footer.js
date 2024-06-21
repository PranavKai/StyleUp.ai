import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 mt-10">
      <div className="container mx-auto text-center text-white">
        <p>&copy; 2024 StyleUp-AI. All rights reserved.</p>
        <p>Developed by Pranav Deshpande</p>
        <div className="space-x-4 mt-2">
          <a href="https://github.com/PranavKai" className="text-white hover:text-gray-200">GitHub</a>
          <a href="https://www.linkedin.com/in/yourusername" className="text-white hover:text-gray-200">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
