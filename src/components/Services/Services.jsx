import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plug,
  Wrench,
  Globe, 
  ArrowRight
} from 'lucide-react';
import '../Services/Services.css'; 



const Services = () => {

  const navigate = useNavigate();

const handleMoreServices = () => {
  navigate("/services")
}
  const services = [
    {
      icon: <Plug className="text-blue-600" />,
      title: "Infrastructure Cabling",
      description:"Our solutions cover all aspects of IT and telecommunication infrastructure cabling projects across local and wide area networks – from full, multi-site installations to moving existing floor points within your office.",
    },
   
    {
      icon: <Globe className="text-purple-600" />,
      title: "Wireless Solutions",
      description: "We advise on defining wireless strategy, choosing the appropriate technologies & architecture for an efficient ROI, procurement, network design & deployment processes for enterprises, ISPs, councils, MHOs & more!",
    },
    {
      icon: <Wrench className="text-orange-600" />,
      title: "Maintanance Contracts",
      description: "Our maintenance contracts offer a cost effective, monthly payment solution for your IT requirements, regular checks on your servers, workstations, networks and printers to ensure they are running smoothly & efficiently.",
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">Discover what we can do for you</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <button className="service-button">
                Read More
                <ArrowRight />
              </button>
            </div>
          ))}
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