import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SonicHub.css';
import blogData from '../../data/blog.json';

function SonicHub() {
  const [blogPosts, setBlogPosts] = useState(blogData);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [isLoaded, setIsLoaded] = useState(false);


  // Get current posts to display based on pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      document.getElementById('sonichub-blog-posts').scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const heroImageUrl = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80';

  if (blogPosts.length === 0) {
    return <div>No blog posts available.</div>;
  }

  const formatDateToWords = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div className="sonichub-container">
      {/* Hero Section */}
      <section className="sonichub-hero-section">
        <div className="sonichub-hero-background">
          <div
            className="sonichub-hero-image"
            style={{ backgroundImage: `url(${heroImageUrl})` }}
          ></div>
        </div>
        <div className="sonichub-hero-overlay"></div>
        <div className="sonichub-hero-content">
          <div className="sonichub-hero-text">
            <span className={`sonichub-hero-tag ${isLoaded ? 'sonichub-fade-in-animation sonichub-delay-02' : ''}`}>
              Latest News
            </span>
            <h1 className={`sonichub-hero-title ${isLoaded ? 'sonichub-fade-in-animation sonichub-delay-04' : ''}`}>
              Explore Our Latest Insights
            </h1>
            <p className={`sonichub-hero-description ${isLoaded ? 'sonichub-fade-in-animation sonichub-delay-06' : ''}`}>
              Discover a wide range of articles and insights on the most relevant topics of the moment.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="sonichub-blog-posts" className="sonichub-blog-posts-container">
        <h2 className={`sonichub-posts-section-title ${isLoaded ? 'sonichub-fade-in-animation sonichub-delay-02' : ''}`}>
          Featured Blog Posts
        </h2>
        <p className={`sonichub-posts-section-description ${isLoaded ? 'sonichub-fade-in-animation sonichub-delay-04' : ''}`}>
          Our latest blog posts to keep you updated on the trends, tips, and strategies in the industry.
        </p>

        <div className="sonichub-blog-grid">
          {currentPosts.map((post, index) => (
            <Link
              to={`/post/${post.id}`}  // Use Link for navigation instead of <a> tag
              key={post.id}
              className={`sonichub-blog-card ${isLoaded ? 'sonichub-scale-in-animation' : ''}`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="sonichub-blog-card-image-container">
                <img
                  src={post.image}
                  alt={`Blog Post ${post.id}`}
                  className="sonichub-blog-card-image"
                />
                <span className="sonichub-blog-card-category">{post.category}</span>
              </div>
              <div className="sonichub-blog-card-content">
                <h3 className="sonichub-blog-card-title">{post.title}</h3>
                <p className="sonichub-blog-card-excerpt">{post.excerpt}</p>
                <div className="sonichub-blog-card-meta">
                  <div className="sonichub-blog-card-meta-item">
                  <span className="sonichub-blog-card-meta-icon">📅</span> {formatDateToWords(post.date)}
                  </div>
                 
                  <div className="sonichub-blog-card-meta-item">
                    <span className="sonichub-blog-card-meta-icon">👤</span> {post.author}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Enhanced Pagination */}
        <div className="sonichub-pagination-container">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="sonichub-pagination-button"
          >
            &larr; Previous
          </button>

          <div className="sonichub-pagination-numbers">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`sonichub-pagination-number ${currentPage === index + 1 ? 'sonichub-active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastPost >= blogPosts.length}
            className="sonichub-pagination-button"
          >
            Next &rarr;
          </button>
        </div>
      </section>
    </div>
  );
}

export default SonicHub;
