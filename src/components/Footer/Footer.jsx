import React, { useEffect } from 'react'
import '../Footer/Footer.css' 
import SonicLogo from "../../assets/images/sonicsignal-logo.png"
import { Link, useParams } from 'react-router-dom'
import { FaFacebook } from 'react-icons/fa6'
import { FaLinkedin, FaMailBulk, FaPhone, FaWhatsapp } from 'react-icons/fa';
import servicesData from '../../data/services.json';


const Footer = () => {

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-about">
          <img src={SonicLogo} alt="SonicSignal Technologies" className="footer-logo" />
          <p>Exceptional service powered by technology</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/shop">SonicShop</Link></li>
            <li><Link to="/blog">SonicHub</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Services</h3>
          <ul>
            {servicesData.slice(0, 6).map(service => (
              <li key={service.id}><Link to={`/service/${service.id}`}>{service.title}</Link></li>
            ))}
          </ul>
         
         
        </div>

        <div className="footer-social">
          <h3>Get in Touch</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/SONICSIGNALSTECH" target='_blank' rel='noopener noreferrer'><FaFacebook /></a>
            <a href="https://wa.me/+263713346159" target='_blank' rel='noopener noreferrer'><FaWhatsapp /></a>
            <a href="tel:+2638612855755" target='_blank' rel='noopener noreferrer'><FaPhone /></a>
            <a href="https://www.linkedin.com/company/sonicsignal-tech/?originalSubdomain=zw" target='_blank' rel='noopener noreferrer'><FaLinkedin /></a>
            <a href="mailto:info@sonicsignal.co.zw" target='_blank' rel='noopener noreferrer'><FaMailBulk /></a>
          </div>
        </div>

       

      </div>
      <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sonicsignal Technologies. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer