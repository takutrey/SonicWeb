import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight
} from 'lucide-react';
import '../Services/Services.css'; 
import { FaSearch, FaTools, FaUserTie, FaWifi } from 'react-icons/fa';



const Services = () => {

  const navigate = useNavigate();

const handleMoreServices = () => {
  navigate("/services")
}
  const services = [
    {
      icon: <FaTools className="services-icon" />,
      title: "ICT Equipment and Accessories",
      description:"We offer comprehensive ICT equipment and accessories services to ensure your technology runs smoothly. From maintenance and repairs to installations and upgrades, our expert team is here to support your computers, networking devices, printers, and accessories.",
    },
   
    {
      icon: <FaWifi className="services-icon" />,
      title: "Internet Service Solutions",
      description: "We provide reliable and high-speed internet service solutions tailored to meet your business or personal needs. Whether you're looking for broadband, wireless, or fiber-optic services, our team ensures seamless connectivity with consistent speeds and excellent customer support.",
    },
    {
      icon: <FaUserTie className="services-icon" />,
      title: "Systems Auditing and Consultation",
      description: "We specialize in comprehensive systems auditing and consultation services to help you optimize your IT infrastructure. Our expert team conducts thorough assessments to identify risks, inefficiencies, and areas for improvement in your systems.",
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">Discover what we can do for you</p>
        </div>
      
      <div className="services-scroll-wrapper">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
        </div>
        <div className="more-services-button">
          <button onClick={handleMoreServices} className="service-button">
            More Services <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;