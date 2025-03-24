import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, CheckSquare, Clock } from 'lucide-react';
import '../Counter/Counter.css';

const StatisticsCounter = () => {
  const [dateDifference, setDateDifference] = useState('');

  useEffect(() => {
    const calculateDateDifference = () => {
      const startDate = new Date(2014, 6, 21);
      const todayDate = new Date();

      const years = Math.abs(todayDate.getFullYear() - startDate.getFullYear());
      const months = Math.abs(todayDate.getMonth() - startDate.getMonth());
      const days = Math.abs(todayDate.getDate() - startDate.getDate());
      const hours = Math.abs(todayDate.getHours() - startDate.getHours());
      const minutes = Math.abs(todayDate.getMinutes() - startDate.getMinutes());
      const seconds = Math.abs(todayDate.getSeconds() - startDate.getSeconds());

      setDateDifference(`${years}Y, ${months}M, ${days}D, ${hours}Hrs, ${minutes}Mins, ${seconds}s`);
    };

    // Calculate date difference initially
    calculateDateDifference();

    // Update every second
    const interval = setInterval(() => {
      calculateDateDifference();
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: <Clock className="stats-icon" />,
      value: dateDifference, // Updated to display the calculated date difference
      label: 'Operating Period',
      details: 'We have been in business for over a decade.',
      link: '/operating-years',
    },
    {
      icon: <CheckSquare className="stats-icon" />,
      value: 80,
      label: 'Projects Completed',
      suffix: '+',
      details: 'We have successfully delivered 80+ projects.',
      link: '/projects',
    },
    {
      icon: <Users className="stats-icon" />,
      value: 25,
      label: 'Engineers Available',
      suffix: '',
      details: 'Our team consists of 25 skilled engineers.',
      link: '/team-members',
    },
  ];

  return (
    <div className="stats-container">
      <div className="stats-wrapper">
        {stats.map((stat, index) => (
          <Link to={stat.link} key={index} className="stat-card-link">
            <div className="stat-card">
              {/* Front Side */}
              <div className="stat-front">
                <div className="icon-wrapper">{stat.icon}</div>
                {stat.label === 'Operating Period' ? (
                  <div className="counter-value">
                    <p className="stat-operating-years-counter">
                    {stat.value}
                    </p></div>
                ) : (
                  <div className="counter-value">
                    {stat.value}
                    {stat.suffix}
                  </div>
                )}
                <div className="stat-label">{stat.label}</div>
              </div>

              {/* Back Side */}
              {stat.label === 'Operating Period' ? (
                <div className="stat-back">
                <p>{stat.details}</p>

              </div>) : (
                <div className="stat-back">
                <p>{stat.details}</p>
                <span className="click-text">
                  <button className="stat-back-button">Learn More</button>
                </span>
              </div>

              )
                }
         
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StatisticsCounter;
