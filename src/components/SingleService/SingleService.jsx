import React, { useEffect, useState } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import servicesData from '../../data/services.json';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import { ArrowLeft } from 'lucide-react';
import Packages from '../Packages/Packages.jsx';
import * as ReactIcons from 'react-icons/fa'; 
import * as LucideIcons from 'lucide-react';
import './SingleService.css';

const getIcon = (iconName) => {
  if (!iconName) return <ReactIcons.FaTools />;
  const ServiceIcon = ReactIcons[iconName] || LucideIcons[iconName];
  return ServiceIcon ? React.createElement(ServiceIcon) : <ReactIcons.FaTools />;
};

const SingleService = () => {
  const { id } = useParams(); 
  const service = servicesData.find((service) => service.id.toString() === id);

  if (!service || !service.images || service.images.length === 0) {
    return <div className="service-not-found">Service not found or no images available.</div>;
  }

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % service.images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [service.images.length]);

  const nextSlide = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % service.images.length);
  };

  const prevSlide = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + service.images.length) % service.images.length);
  };

  const shuffleServices = (services) => {
    let shuffled = [...services];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const otherServices = servicesData.filter((s) => s.id.toString() !== id);
  const shuffledServices = shuffleServices(otherServices).slice(0, 4);

  return (
    <div>
      <section className="single-service-header">
        <Header />
      </section>    

      <section className="single-service-container">
        <Link to="/services" className="back-link">
          <ArrowLeft size={16} /> Back to Services
        </Link>

        <div className="single-service-title">
          {service.title}
        </div> 

        <div className="single-service-content">
          <div className="single-service-images-container">
            <button 
              className='carousel-button carousel-prev' 
              onClick={prevSlide} 
              aria-label="Previous image"
            >
              ❮
            </button>
            <img 
              className='single-service-image' 
              src={service.images[currentImage]} 
              alt={service.title} 
            />
            <button 
              className='carousel-button carousel-next' 
              onClick={nextSlide} 
              aria-label="Next image"
            >
              ❯
            </button>
          </div>

          <div className="single-service-info">
            {service.content}
          </div>
        </div>
      </section>

      <section className="single-service-pricing">
        <div className="single-service-pricing-title">
          <h2 className='single-service-package-title'>Packages</h2>
          <p className='single-service-package-description'>
            Select a package that suits your needs
          </p>
          <Packages selectedService={service} />
        </div>
      </section>

      <section className="more-services">
        <div className="more-services-title">
          <h2>More Services</h2>
          <p className='more-services-description'>Check out other services we offer</p>
        </div>
        <div className="single-service-more-services">
          {shuffledServices.map((moreService) => (
            <div key={moreService.id} className="single-service-more-services-card">
              <div className="single-service-more-services-icon">
                {getIcon(moreService.icon)}
              </div>
              <Link to={`/service/${moreService.id}`} className='single-service-more-services-link'>
                <h3 className="single-service-more-services-title">
                  {moreService.title}
                </h3>
              </Link>
              <p className="single-service-more-services-description">
                {moreService.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="single-service-footer">
        <Footer />
      </section>
    </div>
  );
};

export default SingleService;
