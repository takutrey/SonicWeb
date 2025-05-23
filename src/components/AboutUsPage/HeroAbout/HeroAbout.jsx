import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroAbout.css';
import imageOne from "../../../assets/images/technician-doing-system-analysis-using-tablet-doing-needed-adjustments.jpg"
import imageTwo from "../../../assets/images/group-technicians-doing-brainstorming-reconfiguring-server-farm.jpg"
import imageThree from "../../../assets/images/network-switch-with-cables.jpg"

const HeroAbout = () => {
  const images = [
    imageOne, imageTwo, imageThree
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Preload images for smoother transitions
  useEffect(() => {
    const preloadImages = async () => {
      const promises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
      try {
        await Promise.all(promises);
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      }
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
      {/* Background images with smooth animation - no grey screen */}
      <AnimatePresence>
        <motion.div
          key={currentImage}
          className="hero-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut"
          }}
          style={{ backgroundImage: `url(${images[currentImage]})` }}
        />
      </AnimatePresence>
      
      <div className="hero-image-overlay"></div>
      
      {/* Content that stays stable */}
      <div className="hero-about-content">
        <h1>About Sonic</h1>
        <p>We are a passionate team dedicated to creating innovative solutions for our clients.</p>
      </div>
    </section>
  );
};

export default HeroAbout;