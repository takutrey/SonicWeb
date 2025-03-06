import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './HeroAbout.css';

const HeroAbout = () => {
  const images = [
    'https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg?t=st=1741258876~exp=1741262476~hmac=d84bbf8a7128a08f52b35bcd2b07ff2c59fdd8a393efa0fef422d4ee186a61cc&w=1800',
    'https://img.freepik.com/free-vector/creative-team-working-office_23-2147837864.jpg?t=st=1740655935~exp=1740656535~hmac=7b88c9f9d5fbd97194f470cb10d87607c26a3cc6c34341bb6ed94590d58642e9&w=1060',
    'https://img.freepik.com/free-vector/team-working-office-desk-concept_23-2147776159.jpg?t=st=1740655969~exp=1740656569~hmac=9fbc67b4f2337e0b3201919b53616be9786634439d6c538a9cc35c779bb1bc34&w=1060'
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Preload images for smoother transitions
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoading(false);
      });
    };
    
    preloadImages();
  }, [images]);

  useEffect(() => {
    if (isLoading) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length, isLoading]);

  return (
    <section className="hero-about">
      {/* Background images with animation */}
      <motion.div 
        className="hero-background"
        key={currentImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      />
      
      <div className="hero-image-overlay"></div>
      
      {/* Content that stays stable (doesn't rerender/animate with each image change) */}
      <div className="hero-about-content">
        <h1>About Sonic</h1>
        <p>We are a passionate team dedicated to creating innovative solutions for our clients.</p>
      </div>
    </section>
  );
};

export default HeroAbout;