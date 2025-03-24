import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import services from '../../data/services.json';
import * as FaIcons from 'react-icons/fa';
import * as LucideIcons from 'lucide-react';
import './ServicesHeroSlider.css';

// Function to get the icon, with default fallback if neither icon exists
const getIcon = (icon) => {
    const Icon = FaIcons[icon] || LucideIcons[icon] || null;
    return Icon ? <Icon /> : <FaIcons.FaRegQuestionCircle />; // Fallback icon
}

const ServicesHeroSlider = () => {
    // Duplicate services to create a seamless loop effect
    const duplicatedServices = [...services, ...services];
    const [isPaused, setIsPaused] = useState(false);
    
    return (
        <div className="services-hero-slider">
           <motion.div 
            className="services-track"
            animate="scroll"
            variants={{
                scroll: { x: [0, -services.length * 100, 0], transition: { repeat: Infinity, duration: 20, ease: "linear" } },
                paused: { x: 0 } // Keeps the position when paused
            }}
            whileHover="paused"
        >
                {duplicatedServices.map((service, index) => (
                    <div key={`${service.id}-${index}`} className="service-item">
                        <Link to={`/service/${service.id}`} className="service-hero-link">
                            <div className="service-hero-icon">
                                {getIcon(service.icon)}
                            </div>
                            <div className="service-hero-title">{service.title}</div>
                        </Link>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default ServicesHeroSlider;