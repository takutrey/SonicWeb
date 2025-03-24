import React from 'react';
import './Team.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FaLinkedinIn, FaFacebookF, FaWhatsapp, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const teamMembers = [
    {
        name: 'John Doe',
        role: 'CEO',
        image: 'https://img.freepik.com/free-vector/young-man-glasses-hoodie_1308-174658.jpg?t=st=1742393271~exp=1742396871~hmac=e419e09b56777f2670d5a74f6976b3e1674d75f04c8a74c6f5025dacd7554104&w=740',
        social: {
            linkedin: 'https://www.linkedin.com/in/johndoe',
            twitter: 'https://twitter.com/johndoe',
            facebook: 'https://www.facebook.com/johndoe',
            whatsapp: 'https://wa.me/1234567890',
        },
    },
    {
        name: 'Jane Smith',
        role: 'CTO',
        image: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-857.jpg?t=st=1742393226~exp=1742396826~hmac=55dbafb7b869cf1d298c720b2bdcf7d569be08d229144c30bab030a4e99c1b56&w=900',
        social: {
            linkedin: 'https://www.linkedin.com/in/janesmith',
            twitter: 'https://twitter.com/janesmith',
            facebook: 'https://www.facebook.com/johndoe',
            whatsapp: 'https://wa.me/1234567890',
        },
    },
    // Add more team members here
];

const Team = () => {
    return (
        <div>
            <div className="head">
                <Header />
            </div>
            <div className="team-hero-section">
                <div className="team-hero-content">
                    <h1>Our Team</h1>
                    <p>Meet the people that make it happen</p>
                </div>
            </div>
            <div className="team-container">
                <div className="team-container-title">
                    <h2>Meet Our Engineers</h2>
                    <p>Meet the people behind our success</p>
                </div>
            
                <div className="team-members">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-member">
                            <img 
                                src={member.image} 
                                alt={member.name} 
                                className="team-member-image" 
                                onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // fallback image
                            />
                            <h2>{member.name}</h2>
                            <p>{member.role}</p>
                            <div className="team-member-social">
                                {member.social.linkedin && (
                                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                        <FaLinkedinIn />
                                    </a>
                                )}
                                {member.social.twitter && (
                                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                                        <FaXTwitter style={{color: 'black'}}/>
                                    </a>
                                )}
                                {member.social.facebook && (
                                    <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                                        <FaFacebookF style={{color: '#3b5998'}}/>
                                    </a>
                                )}
                                {member.social.whatsapp && (
                                    <a href={member.social.whatsapp} target="_blank" rel="noopener noreferrer">
                                        <FaWhatsapp style={{color: '#25D366'}}/>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
};

export default Team;
