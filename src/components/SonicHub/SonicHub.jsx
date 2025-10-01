import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SonicHub.css";
import { AllBlogs } from "../../lib/blogs.jsx";
import Spinner from "../LoadingSpinner/Spinner.jsx";

const baseUrl = "http://localhost:5050";

function SonicHub() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const postsPerPage = 6;

  // Get current posts to display based on pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      document
        .getElementById("sonichub-blog-posts")
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await AllBlogs();

        if (response && response.data) {
          setBlogPosts(response.data);
        } else {
          setError("No blog posts available");
        }
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching blog posts", error);
        setError("Failed to load blog posts");
        setIsLoaded(true);
      }
    };
    fetchBlogPosts();
  }, []);

  const heroImageUrl =
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80";
  const noPostsImage = "https://www.svgrepo.com/show/315818/unavailable.svg";
  const blogImagePlaceholder =
    "https://neilpatel.com/wp-content/uploads/2017/02/blogging.jpg";

  const formatDateToWords = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  if (!isLoaded) {
    return (
      <div className="sonichub-blog-container">
        <Spinner message="Loading posts..." />
      </div>
    );
  }

  if (error || blogPosts.length === 0) {
    return (
      <div className="sonichub-blog-container">
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
              <span className="sonichub-hero-tag sonichub-fade-in-animation sonichub-delay-02">
                Latest News
              </span>
              <h1 className="sonichub-hero-title sonichub-fade-in-animation sonichub-delay-04">
                Explore Our Latest Insights
              </h1>
              <p className="sonichub-hero-description sonichub-fade-in-animation sonichub-delay-06">
                Discover a wide range of articles and insights on the most
                relevant topics of the moment.
              </p>
            </div>
          </div>
        </section>

        {/* No Posts Section */}
        <section className="sonichub-blog-posts-container">
          <div
            className="sonichub-no-posts"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "60vh",
              textAlign: "center",
              padding: "40px 20px",
            }}
          >
            <div
              className="sonichub-no-posts-image-container"
              style={{
                marginBottom: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={noPostsImage}
                alt="No posts available"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = { noPostsImage };
                }}
              />
            </div>
            <div
              className="sonichub-no-posts-content"
              style={{
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  color: "#333",
                  marginBottom: "1rem",
                  fontWeight: "700",
                }}
              >
                No Blog Posts Available
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#666",
                  marginBottom: "2rem",
                  lineHeight: "1.6",
                }}
              >
                We couldn't find any blog posts to display..
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="sonichub-blog-container">
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
            <span
              className={`sonichub-hero-tag ${
                isLoaded ? "sonichub-fade-in-animation sonichub-delay-02" : ""
              }`}
            >
              Latest News
            </span>
            <h1
              className={`sonichub-hero-title ${
                isLoaded ? "sonichub-fade-in-animation sonichub-delay-04" : ""
              }`}
            >
              Explore Our Latest Insights
            </h1>
            <p
              className={`sonichub-hero-description ${
                isLoaded ? "sonichub-fade-in-animation sonichub-delay-06" : ""
              }`}
            >
              Discover a wide range of articles and insights on the most
              relevant topics of the moment.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        id="sonichub-blog-posts"
        className="sonichub-blog-posts-container"
      >
        <h2
          className={`sonichub-posts-section-title ${
            isLoaded ? "sonichub-fade-in-animation sonichub-delay-02" : ""
          }`}
        >
          Featured Blog Posts
        </h2>
        <p
          className={`sonichub-posts-section-description ${
            isLoaded ? "sonichub-fade-in-animation sonichub-delay-04" : ""
          }`}
        >
          Our latest blog posts to keep you updated on the trends, tips, and
          strategies in the industry.
        </p>

        <div className="sonichub-blog-grid">
          {currentPosts.map((post, index) => (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              className={`sonichub-blog-card ${
                isLoaded ? "sonichub-scale-in-animation" : ""
              }`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="sonichub-blog-card-image-container">
                {post.coverImage ? (
                  <img
                    src={`${baseUrl}/${post.coverImage}`}
                    alt={`Blog Post ${post.id}`}
                    className="sonichub-blog-card-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = { blogImagePlaceholder };
                    }}
                  />
                ) : (
                  <img
                    src={blogImagePlaceholder}
                    alt={`Blog Post ${post.id}`}
                    className="sonichub-blog-card-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = { blogImagePlaceholder };
                    }}
                  />
                )}

                <span className="sonichub-blog-card-category">
                  {post.blogcategory.name}
                </span>
              </div>
              <div className="sonichub-blog-card-content">
                <h3 className="sonichub-blog-card-title">{post.title}</h3>
                <p className="sonichub-blog-card-excerpt">
                  {post.content.length > 100
                    ? `${post.content.substring(0, 100)}...`
                    : post.content}
                </p>
                <div className="sonichub-blog-card-meta">
                  <div className="sonichub-blog-card-meta-item">
                    <span className="sonichub-blog-card-meta-icon">📅</span>
                    {formatDateToWords(post.updatedAt)}
                  </div>
                  <div className="sonichub-blog-card-meta-item">
                    <span className="sonichub-blog-card-meta-icon">👤</span>
                    Sonicsignal Tech
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
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
                  className={`sonichub-pagination-number ${
                    currentPage === index + 1 ? "sonichub-active" : ""
                  }`}
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
        )}
      </section>
    </div>
  );
}

export default SonicHub;
