import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function UnsplashImage({ urls }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full h-80 mt-4 overflow-hidden rounded-lg"> {/* h-64 is 16rem */}
      {urls && urls.length > 0 ? (
        <Slider {...settings}>
          {urls.map((url, index) => (
            <div key={index} className="w-full h-full flex items-center justify-center">
              <img src={url} alt={`Unsplash ${index}`} className="object-cover w-full h-full rounded-lg" />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
          No images provided
        </div>
      )}
    </div>
  );
}
