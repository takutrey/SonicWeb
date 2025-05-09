import React, { useEffect, useState } from 'react';
import './Projects.css';
import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer';
import axios from "axios";

const baseUrl = "http://localhost:5050";

const Projects = () => {
    const [isLoading, setIsLoading] = useState(true); 
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const projectsPerPage = 9;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/all-projects`); 
                setProjects(response.data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Failed to load projects. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchProjects();
    }, []); 

    // Pagination logic
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject); 
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const paginate = (pageNumber) => {
        if(pageNumber > 0 && pageNumber <= totalPages){
            setCurrentPage(pageNumber);
            // Smooth scroll to projects section
            const projectsElement = document.getElementById('projects');
            if (projectsElement) {
                projectsElement.scrollIntoView({behavior: 'smooth'});
            }
        }
    }

    if (isLoading) {
        return <div className="loading">Loading projects...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div id="projects">
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
                
                {projects.length === 0 ? (
                    <div className="no-projects">No projects found</div>
                ) : (
                    <>
                        <div className="projects">
                            {currentProjects.map(project => (
                                <div key={project.id} className="project-card">
                                <div className="project-image-container">
                                  <div className={`project-status-badge ${project.project_status.toLowerCase()}`}>
                                    {project.project_status}
                                  </div>
                                  <img src={`${baseUrl}/${project.image}`} alt={project.title} className='project-image' />
                                  <div className="project-overlay">
                                    <div className="project-overlay-content">
                                      <p className='project-description'>{project.project_description}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="project-content">
                                  <h3 className='project-name'>{project.title}</h3>
                                </div>
                              </div>
                            ))}
                        </div>

                        <div className="projects-pagination-container">
                            <button 
                                onClick={() => paginate(1)} 
                                disabled={currentPage === 1} 
                                className="projects-pagination-button"
                            >
                                &laquo; First
                            </button>
                            <button 
                                onClick={() => paginate(currentPage - 1)} 
                                disabled={currentPage === 1} 
                                className="projects-pagination-button"
                            >
                                &larr; Previous
                            </button>
                            <div className="projects-pagination-numbers">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => paginate(index + 1)} 
                                        className={`projects-pagination-number ${currentPage === index + 1 ? 'projects-active' : ''}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                            <button 
                                onClick={() => paginate(currentPage + 1)} 
                                disabled={currentPage >= totalPages} 
                                className="projects-pagination-button"
                            >
                                Next &rarr;
                            </button>
                            <button 
                                onClick={() => paginate(totalPages)} 
                                disabled={currentPage >= totalPages} 
                                className="projects-pagination-button"
                            >
                                Last &raquo;
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="foot">
                <Footer />
            </div>
        </div>
    );
}

export default Projects;