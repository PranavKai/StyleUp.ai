import React from 'react';

export default function UnsplashImage({ url }) {
  return (
    <div className="w-full h-64 mt-4 overflow-hidden rounded-lg">
      {url ? (
        <img
          src={url}
          alt="Unsplash"
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
          No image URL provided
        </div>
      )}
    </div>
  );
}