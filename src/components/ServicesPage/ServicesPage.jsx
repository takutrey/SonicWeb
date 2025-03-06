import React from 'react';
import { FaCode, FaPaintBrush, FaMobileAlt, FaWrench, FaPlug, FaSatellite, FaDesktop, FaCamera, FaCameraRetro, FaVideo, FaVolumeUp, FaUserTie, FaTools, FaWifi } from 'react-icons/fa';
import { ArrowRight, Webcam } from 'lucide-react';
import '../ServicesPage/ServicesPage.css';

const services = [
  {
    id: 1,
    title: 'Systems Auditing and Consultation',
    description: 'We specialize in comprehensive systems auditing and consultation services to help you optimize your IT infrastructure. Our expert team conducts thorough assessments to identify risks, inefficiencies, and areas for improvement in your systems.',
    icon: <FaUserTie size={40} className="servicepage-icon" />,
  },
  {
    id: 2,
    title: 'Audio and Visual Systems',
    description: 'We provide cutting-edge audio and visual systems to elevate your event, workspace, or entertainment space. Our solutions include high-fidelity sound systems, immersive display technologies, and seamless integration for both indoor and outdoor environments.',
    icon: <FaVolumeUp size={40} className="servicepage-icon" />,
  },
  {
    id: 3,
    title: 'Digital Conferencing Solutions',
    description: 'We offer advanced digital conferencing solutions to facilitate seamless communication and collaboration. Our services include high-quality video conferencing systems, interactive displays, virtual meeting platforms, and integration with various communication tools.',
    icon: <FaVideo size={40} className="servicepage-icon" />,
  }, 
  {
    id: 4,
    title: 'Boardroom Modernization',
    description: 'We specialize in boardroom modernization services, transforming your meeting spaces with the latest technology and innovative solutions from high-definition video conferencing systems and interactive displays to seamless integration with collaborative tools.',
    icon: <FaDesktop size={40} className="servicepage-icon" />,
  }, 
  {
    id: 5,
    title: 'CCTV and Intruder Alarm Systems',
    description: 'We provide state-of-the-art CCTV and intruder alarm systems designed to enhance the security of your premises. Our solutions include high-definition cameras, motion detection sensors, real-time monitoring, and remote access capabilities.',
    icon: <Webcam size={40} className="servicepage-icon" />,
  }, 
  {
    id: 6,
    title: 'Internet Service Solutions',
    description: "We provide reliable and high-speed internet service solutions tailored to meet your business or personal needs. Whether you're looking for broadband, wireless, or fiber-optic services, our team ensures seamless connectivity with consistent speeds and excellent customer support.",
    icon: <FaWifi size={40} className="servicepage-icon" />,
  }, 
  {
    id: 6,
    title: 'ICT Equipment and Accessories',
    description: 'We offer comprehensive ICT equipment and accessories services to ensure your technology runs smoothly. From maintenance and repairs to installations and upgrades, our expert team is here to support your computers, networking devices, printers, and accessories.',
    icon: <FaTools size={40} className="servicepage-icon" />,
  }

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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
