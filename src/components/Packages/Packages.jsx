import React, {useState, useEffect}from 'react'; 
import './Packages.css';
import packages from '../../data/packages.json';

const Packages = ({selectedService}) => {
    const [packageData, setPackageData] = useState([]);

    useEffect(() => {
        setPackageData(packages)
    }, []);

    const filteredPackages = selectedService ? packageData.filter(pkg => pkg.serviceId === selectedService.id) : [];
   
  return (
  
    <div className='packages-container'>
        {filteredPackages.length > 0 ? ( 
             filteredPackages.map((servicepackage, index) => (
                <div className='package-card' key={servicepackage.id}>
                  <div className='package-info'>
                      <h3 className='package-title'>{servicepackage.name}</h3>
                      <p className='package-price'>{servicepackage.price}</p>
                      <p className='package-description'>{servicepackage.description}</p>
                  </div>
                </div>
              ))
            ) : (
                <p>No packages available for this service</p>
            )}
       
    </div>
  )
}

export default Packages