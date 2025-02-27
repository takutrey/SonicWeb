import React from 'react'
import '../Footer/Footer.css' 
import SonicLogo from "../../assets/images/sonicsignal-logo.png"
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6'

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
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Services</h3>
          <ul>
            <li><Link to="/">Infrastructure Cabling</Link></li>
            <li><Link to="/about">Software Development</Link></li>
            <li><Link to="/services">Wireless Solutions</Link></li>
            <li><Link to="/shop">Tech Consultancy</Link></li>
            <li><Link to="/sonichub">Maintenance Contracts</Link></li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="" target='_blank' rel='noopener noreferrer'><FaFacebook /></a>
            <a href="" target='_blank' rel='noopener noreferrer'><FaTwitter /></a>
            <a href="" target='_blank' rel='noopener noreferrer'><FaInstagram /></a>
          </div>
        </div>

       

      </div>
      <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SonicSignal Technologies. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer