import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { FaWhatsapp, FaFacebookF, FaPhone, FaLinkedinIn, FaMailBulk } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import '../ServicesPage/ServicesPage.css';
import services from '../../data/services.json'; 
import Servicesimage from "../../assets/images/group-technicians-doing-brainstorming-reconfiguring-server-farm.jpg"

const getIcon = (iconName) => {
  const ServiceIcon = FaIcons[iconName] || LucideIcons[iconName];
  return ServiceIcon ? React.createElement(ServiceIcon) : <FaIcons.FaTools />;
}


const ServicesPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="servicepage-hero">
        <div className="servicepage-hero-content">
          <h1>Our Services</h1>
          <p>We provide top-notch digital solutions to help your business grow.</p>
          <div className="social-icons">
                      <a href="https://www.facebook.com/SONICSIGNALSTECH" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                        <FaFacebookF />
                      </a>
                      <a href="https://wa.me/+263713346159" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                        <FaWhatsapp />
                      </a>
                      <a href="tel:+2638612855755" target="_blank" rel="noopener noreferrer" className="social-icon voip">
                        <FaPhone />
                      </a>
                      <a href="https://www.linkedin.com/company/sonicsignal-tech/?originalSubdomain=zw" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                        <FaLinkedinIn />
                      </a>
                      <a href="mailto:info@sonicsignal.zo.zw" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                        <FaMailBulk />
                      </a>
                  </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="servicepage-intro">
        <h2 className="servicepage-title">What We Offer</h2>
        <p className="servicepage-description">
          Our team is dedicated to delivering high-quality solutions tailored to your needs.
        </p>
      </section>

      {/* Services List */}
      <section className="servicepage-section">
        <div className="servicepage-container">
          {services.map((service) => (
            <div key={service.id} className="servicepage-card">
              
              <div className="servicepage-icon-wrapper">{getIcon(service.icon)}</div>
            
                <Link to={service.id === 7 ? '/shop' : `/service/${service.id}`} className='services-page-link'>
                <h3 className="servicepage-card-title">{service.title}</h3>
              </Link>

           
              <p className="servicepage-card-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
