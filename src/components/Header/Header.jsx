import React from "react";
import { Link } from "react-router-dom";
import "../Header/Header.css"; 
import {FaSearch} from 'react-icons/fa';
import SonicLogo from '../../assets/images/sonicsignal-logo.png';

const Header = () => {
    return (
        <header className='header'>
          <div className='container'>
            <div className='logo'> 
              <Link to="/">
                <img src={SonicLogo} alt='SonicSignal Logo' className='logo-img' />
              </Link>
            </div>
    
            <nav className='nav'>
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/services">Services</Link>
              <Link to="/sonichub">SonicHub</Link>
              <Link to="/contact">Contact Us</Link>
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
