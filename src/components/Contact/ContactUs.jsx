import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import '../Contact/ContactUs.css';

const Contact = () => {
  return (
    <div>
      <section className="hero-contact">
      <div className="hero-contact-content">
        <h1>Contact Us</h1>
        <p>Have any questions or inquiries? Feel free to reach out to us.</p>
        <a href="mailto:info@sonicsignals.co.zw" className="hero-contact-cta-button">Get in Touch</a>

        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </section>
      <section className="map-container">
        <h2>Our Location</h2>
        <p>Where to find Us</p>
        <div className="map-embed">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.371809527198!2d31.053119873848413!3d-17.821196976117836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a5002eacbc95%3A0x92aff4331586a658!2sSonicsignal%20Technologies!5e0!3m2!1sen!2szw!4v1740665843503!5m2!1sen!2szw"
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
          ></iframe>
        </div>
      </section>
    </div>
    
  );
}

export default Contact;
