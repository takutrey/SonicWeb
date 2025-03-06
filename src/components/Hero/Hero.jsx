import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../Hero/Hero.css"; // Importing the corresponding CSS file

const textOptions = [
  "ICT Equipment and Accessories",
  "Internet Service Solutions",
  "CCTV and Intruder Alarm Systems",
  "Boardroom Modernization",
  "Digital Conferencing Solutions",
  "Audio and Visual Systems", 
  "Systems Auditing and Consultation"
];

const TypingEffect = ({ textArray, speed = 100, delay = 1000 }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = textArray[textIndex];

    if (isDeleting) {
      // Deleting characters
      if (charIndex > 0) {
        setTimeout(() => setCharIndex((prev) => prev - 1), speed / 2);
      } else {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }
    } else {
      // Typing characters
      if (charIndex < currentText.length) {
        setTimeout(() => setCharIndex((prev) => prev + 1), speed);
      } else {
        setTimeout(() => setIsDeleting(true), delay);
      }
    }

    setDisplayText(currentText.substring(0, charIndex));
  }, [charIndex, isDeleting, textIndex, textArray, speed, delay]);

  return (
    <motion.span
      key={displayText} // Forces animation restart on text change
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="typing-text"
    >
      {displayText}
      <span className="cursor">|</span>
    </motion.span>
  );
};

const Hero = () => {
  return (
    <div className="hero-container">
      {/* Animated Background */}
      <motion.div
        className="hero-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      
      {/* Animated Firework-like Signal Lines */}
      <motion.div className="hero-lines">
        <svg className="hero-lines-svg" viewBox="0 0 1000 500">
          {[...Array(10)].map((_, index) => {
            const startX = Math.random() * 1000;
            const startY = Math.random() * 500;
            const controlX = Math.random() * 1000;
            const controlY = Math.random() * 500;
            const endX = Math.random() * 1000;
            const endY = Math.random() * 500;

            return (
              <motion.path
                key={index}
                d={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
                stroke={`rgba(204, 0, 0, ${0.5 + Math.random() * 0.5})`}
                strokeWidth={2 + Math.random() * 2}
                fill="transparent"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: Math.random() * 1.5,
                }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Hero Content */}
      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Sonicsignal Technologies
        </motion.h1>
        <motion.h2 
        className="hero-desc"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        >Dynamic and innovative technology solution provider that prides itself on the ability to deliver tailored solutions to meet the business aspirations and challenges.
        </motion.h2>
        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TypingEffect textArray={textOptions} speed={100} delay={1000} />
        </motion.p>

        <motion.div
          className="hero-button-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button className="hero-button">Get Started</button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
