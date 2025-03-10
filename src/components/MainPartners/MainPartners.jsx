import React from 'react'; 
import '../MainPartners/MainPartners.css';
import CISCO from '../../assets/images/Partners/CISCO.png';
import CSZ from '../../assets/images/Partners/CSZ.jpg'; 
import IBM from '../../assets/images/Partners/IBM.jpg'; 
import Ubiquiti from '../../assets/images/Partners/Ubiquiti.png';
import Molex from '../../assets/images/Partners/Molex.png';

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