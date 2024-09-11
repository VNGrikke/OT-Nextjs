"use client";  

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'; // Import icons

const Carousel: React.FC<{ images: string[], interval?: number }> = ({ images, interval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(autoSlide); 
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-[66vh] mx-auto">
      <div className="overflow-hidden relative h-full">
        <div
          className="flex transition-transform duration-500 h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded"
        onClick={handlePrev}
      >
        <FontAwesomeIcon icon={faChevronLeft} /> {/* Sử dụng icon đúng */}
      </button>

      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded"
        onClick={handleNext}
      >
        <FontAwesomeIcon icon={faChevronRight} /> {/* Sử dụng icon đúng */}
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
