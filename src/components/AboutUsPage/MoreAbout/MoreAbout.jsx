import React from 'react';
import '../MoreAbout/MoreAbout.css';

const AboutUs = () => {
  return (
    <section className="about-section">
      <div className="about-container">
      <div className="about-title">
            <h2 className='about-title-head'>Our History</h2>
            <p className='about-title-description'>Delve into knowing how Sonicsignal Technologies came to be</p>
          </div>
        <div className="about-content fade-in">
          <div className="about-image-wrapper">
            <img
              src="https://img.freepik.com/free-photo/laptop-which-there-is-world-people-drawn_1232-288.jpg?t=st=1739450087~exp=1739453687~hmac=cbecb1f6c5c767512e38829c601c9e50522f3d1ac3adfeeb9d04d2bb7b18bbab&w=996"
              alt="About Our Company"
              className="about-image"
            />
          </div>
         
          
          <div className="about-text">            
            <p className="about-description">
              We are a passionate team dedicated to creating innovative solutions 
              that make a difference. With years of experience and a commitment 
              to excellence, we strive to deliver exceptional value to our clients 
              and partners.
            </p>
            
            <p className="about-description">
              Our mission is to transform ideas into reality while maintaining 
              the highest standards of quality and customer satisfaction.
            </p> 

            <p className="about-description">
            Let us listen to your requirements and we guarantee a solution that will exceed your expectation in the performance, commercial positioning and flexibility.
            </p>
          </div>
        </div>
      </div>
    </section>
    

    
  );
};

export default AboutUs;