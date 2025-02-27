import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import "../Header/Header.css"; 
import {FaSearch, FaBars, FaTimes} from 'react-icons/fa';
import SonicLogo from '../../assets/images/sonicsignal-logo.png';
console.log("Header loaded")

const Header = () => { 

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const isActive = (path) =>{ 
    return location.pathname === path ? "active" : "";
  }

    return (
        <header className='header'>
          <div className='container'>
            <div className='logo'> 
              <Link to="/">
                <img src={SonicLogo} alt='SonicSignal Logo' className='logo-img' />
              </Link>
            </div>

            <button className="toggle-menu" onClick={toggleMenu}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
    
            <nav className={`nav ${isOpen ? "open" : "" }`}>
              <Link to="/"  className={isActive("/")}onClick={toggleMenu}>Home</Link>
              <Link to="/about"  className={isActive("/about")}onClick={toggleMenu}>About Us</Link>
              <Link to="/services"  className={isActive("/services")}onClick={toggleMenu}>Services</Link>
              <Link to="/shop"  className={isActive("/shop")}onClick={toggleMenu}>SonicShop</Link>
              <Link to="/contact"  className={isActive("/contact")}onClick={toggleMenu}>Contact Us</Link>
            </nav>
    
            <div className='search-bar'> 
              <input type='text' placeholder='Search...' />
              <button className='search-icon-btn'>
                <FaSearch />
              </button>
            </div>
          </div>
        </header>
      )
}

export default Header;
