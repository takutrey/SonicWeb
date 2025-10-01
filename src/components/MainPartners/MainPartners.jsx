import React from 'react'; 
import '../MainPartners/MainPartners.css';
import CISCO from '/images/Partners/CISCO.png';
import CSZ from '/images/Partners/CSZ.jpg'; 
import IBM from '/images/Partners/IBM.jpg'; 
import Ubiquiti from '/images/Partners/Ubiquiti.png';
import Molex from '/images/Partners/Molex.png';

const MainPartners = () => { 

    const Partners = [    
        CSZ,
        CISCO,
        IBM, 
        Ubiquiti, 
        Molex    
    ];

  return (
    <div className="partners-carousel">
        <div className="partners-track">
            {Partners.concat(Partners).map((logo, index) => (
                <img key={index} src={logo} alt={`Partner ${index + 1}`} className='partner-logo' />
            ))}
        </div>
    </div>
  )
}

export default MainPartners;