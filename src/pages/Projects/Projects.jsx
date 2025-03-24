import React, { useEffect, useState } from 'react';
import './Projects.css';
import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer';
import projectsData from '../../data/projects';

const Projects = () => {

    const [isLoading, setIsLoading] = useState(true); 
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 9;
    const [isLoaded, setIsLoaded] = useState(false);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject); 
    const totalPages = Math.ceil(projects.length /projectsPerPage);

    const paginate = (pageNumber) => {
        if(pageNumber > 0 && pageNumber <= totalPages){
            setCurrentPage(pageNumber);
            document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
        }
    }

    useEffect(() => {
        setIsLoaded(true);
        setProjects(projectsData);
        setTimeout(() => setIsLoading(false), 1000);
    }, []);


  return (
    <div>
        <div className="head">
            <Header />
        </div>
        <div className="projects-hero-section">
            <div className="projects-hero-content">
            <h1>Our Projects</h1>
            <p>Check out our latest projects</p>
            </div>
        </div>
        <div className="projects-container">
            <div className="projects-container-title">
            <h2>Completed Projects</h2>
            <p>Our wide project portfolio</p>
            </div>
            <div className="projects">
            {currentProjects.map(project =>(
                <div key={project.id} className="project-card">
        
                    <img src={project.images[0]} alt={project.name} className='project-image' />
                    <h3 className='project-name'>{project.name}</h3> 
                    <div className="project-overlay">
                        <div className="project-overlay-content">
                            <p className='project-description'>{project.description}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>

            <div className="projects-pagination-container">
                <button onClick={() => paginate(currentPage -1)} disabled={currentPage === 1} className="projects-pagination-button">
                &larr; Previous
                </button>
                <div className="projects-pagination-numbers">
                    {[...Array(totalPages)].map((_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)} className={`projects-pagination-number ${currentPage === index + 1 ? 'projects-active' : ''}`}>
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastProject >= projects.length} className="projects-pagination-button">
                Next &rarr;
                </button>
            </div>
        </div>
        <div className="foot">
            <Footer />
        </div>
    </div>
  )
}

export default Projects