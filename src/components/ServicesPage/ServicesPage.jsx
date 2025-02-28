import React from 'react';
import { FaCode, FaPaintBrush, FaMobileAlt } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';
import '../ServicesPage/ServicesPage.css';

const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'We build responsive and scalable websites tailored to your business needs.',
    icon: <FaCode size={40} className="servicepage-icon" />,
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description: 'Our team creates stunning, user-friendly designs that provide a seamless experience.',
    icon: <FaPaintBrush size={40} className="servicepage-icon" />,
  },
  {
    id: 3,
    title: 'Mobile Development',
    description: 'We develop mobile apps for iOS and Android with a focus on performance and user experience.',
    icon: <FaMobileAlt size={40} className="servicepage-icon" />,
  },
];

const ServicesPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="servicepage-hero">
        <div className="servicepage-hero-content">
          <h1>Our Services</h1>
          <p>We provide top-notch digital solutions to help your business grow.</p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="servicepage-intro">
        <h2 className="servicepage-title">What We Offer</h2>
        <p className="servicepage-description">
          From web and mobile development to UI/UX design, our team is dedicated to delivering high-quality solutions tailored to your needs.
        </p>
      </section>

      {/* Services List */}
      <section className="servicepage-section">
        <div className="servicepage-container">
          {services.map((service) => (
            <div key={service.id} className="servicepage-card">
              <div className="servicepage-icon-wrapper">{service.icon}</div>
              <h3 className="servicepage-card-title">{service.title}</h3>
              <p className="servicepage-card-description">{service.description}</p>
              <button className="servicepage-button">
                Read More <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
