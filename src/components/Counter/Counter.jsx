import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, CheckSquare, Clock } from 'lucide-react';
import '../Counter/Counter.css';

const Counter = ({ value, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = value / (duration * 60); // 60fps
      const timer = setInterval(() => {
        start += increment;
        if (start > value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="counter-value"
    >
      {count}{suffix}
    </motion.div>
  );
};

const StatisticsCounter = () => {
  const stats = [
    {
        icon: <Clock className="stats-icon" />,
        value: 10,
        label: "Operating Years",
        suffix: "+"
      },
    {
      icon: <Users className="stats-icon" />,
      value: 60,
      label: "Happy Clients",
      suffix: "+"
    },
    {
      icon: <CheckSquare className="stats-icon" />,
      value: 80,
      label: "Projects Completed",
      suffix: "+"
    },
    {
      icon: <Users className="stats-icon" />,
      value: 25,
      label: "Engineers Available",
      suffix: ""
    }
  ];

  return (
    <div className="stats-container">
      <div className="stats-wrapper">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.2
            }}
          >
            <motion.div
              className="icon-wrapper"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {stat.icon}
            </motion.div>
            <Counter 
              value={stat.value} 
              suffix={stat.suffix}
              duration={2}
            />
            <motion.div
              className="stat-label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.2 }}
            >
              {stat.label}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsCounter;