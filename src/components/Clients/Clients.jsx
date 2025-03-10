import React from 'react'; 
import './Clients.css';
import Harare from '../../assets/images/Clients/Harare.svg.png';
import netone from '../../assets/images/Clients/netone.png'; 
import Pizza from '../../assets/images/Clients/Pizza.svg.webp'; 
import SKLogo from '../../assets/images/Clients/sterkinekor.png';

const Clients = () => { 

    const Partners = [    
        Harare,
        netone,
        Pizza, 
        SKLogo 
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

export default Clients;