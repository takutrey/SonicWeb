import React from 'react'; 
import '../MainPartners/MainPartners.css';
import NetoneLogo from '../../assets/images/netone.png';
import SKLogo from '../../assets/images/sterkinekor.png'; 
import HarareLogo from '../../assets/images/Coat_of_arms_of_Harare.svg.png'; 
import PizzaHutLogo from '../../assets/images/Pizza_Hut_logo.svg.webp';

const MainPartners = () => { 

    const Partners = [    
        NetoneLogo,
        SKLogo,
        HarareLogo, 
        PizzaHutLogo      
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