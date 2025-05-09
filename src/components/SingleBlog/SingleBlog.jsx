import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SingleBlog.css';
import axios from 'axios';
import { AllBlogs, getBlogsByCategory, getSingleBlog } from '../../lib/blogs';

const baseUrl = "http://localhost:5050";

const SingleBlog = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formatDateToWords = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  useEffect(() => {
    const fetchBlogPost = async() => {
      setIsLoading(true);
      try {
        const response = await getSingleBlog(id);
        console.log("Blog Post", response.data);
        setPost(response.data); 
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogPost();
  }, [id]);

  useEffect(() => {
    if (post) {
      const categoryId = post.blogCategoryId;
  
      const fetchRelatedPosts = async () => {
        try {
          const response = await getBlogsByCategory(categoryId);
          console.log("Related Categories", response.data);
          // Filter out the current post
          setRelatedPosts(response.data.filter(item => item.id !== post.id).slice(0, 3));
        } catch (error) {
          console.error("Error fetching related posts:", error);
        }
      };
  
      const fetchLatestPosts = async () => {
        try {
          const response = await AllBlogs();
          setLatestPosts(response.data.filter(item => item.id !== post.id).slice(0, 3));
        } catch (error) {
          console.error("Error fetching latest posts:", error);
  
          // Fallback
          try {
            const allPostsResponse = await axios.get(`${baseUrl}/blog`);
            const filteredPosts = allPostsResponse.data
              .filter(item => item.id !== post.id)
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 3);
            setLatestPosts(filteredPosts);
          } catch (fallbackError) {
            console.error("Error fetching fallback latest posts:", fallbackError);
          }
        }
      };
  
      fetchRelatedPosts();
      fetchLatestPosts();
    }
  }, [post]);
  

  if (isLoading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading post...</p>
    </div>
  );

  if (!post) return (
    <div className="error-container">
      <h2>Post Not Found</h2>
      <p>We couldn't find the blog post you're looking for.</p>
      <Link to="/blog" className="back-button">
        Back to SonicHub
      </Link>
    </div>
  );

  return (
    <div className="blog-post-container">
      {/* Back to SonicHub Button */}
      <div className="back-to-sonichub">
        <Link to="/blog" className="back-button">
          Back to SonicHub
        </Link>
      </div>

      <div className="blog-post-left">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span className="post-date">{formatDateToWords(post.updatedAt)}</span>
          <span className="post-author"> By Sonicsignal Tech </span>
          {post.blogCategoryId && <span className="post-category">{post.blogcategory.name}</span>}
        </div>
        <img 
          src={`${baseUrl}/${post.coverImage}`} 
          alt={post.title} 
          className="blog-post-image" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-blog-image.jpg"; // Fallback image
          }}
        />
        <div className="blog-post-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{post.tags && post.tags.map((tag, index) => (
           <span key={index} style={{ backgroundColor: "#c00", borderRadius: 5 }}>#{tag}</span>
        ))}</div>
        <div className="blog-post-content">{post.content}</div>
      </div>

      <div className="blog-post-right">
        {/* Latest News Section */}
        <div className="latest-news">
          <h3>Latest News</h3>
          {latestPosts.length > 0 ? (
            latestPosts.map((blog) => (
              <div className="news-card" key={blog.id}>
                <Link to={`/post/${blog.id}`} className="news-card-link">
                  <div className="news-card-content">
                    <img 
                      src={`${baseUrl}/${blog.coverImage}`} 
                      alt={blog.title} 
                      className="news-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-thumbnail.jpg"; // Fallback image
                      }}
                    />
                    <div className="news-text">
                      <h4>{blog.title}</h4>
                      <p className="news-date">{formatDateToWords(blog.updatedAt)}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No latest posts available</p>
          )}
        </div>

        {/* Related Posts Section */}
        <div className="related-posts">
          <h3>Related Posts</h3>
          {relatedPosts.length > 0 ? (
            relatedPosts.map((relatedPost) => (
              <div className="news-card" key={relatedPost.id}>
                <Link to={`/post/${relatedPost.id}`} className="news-card-link">
                  <div className="news-card-content">
                    <img 
                      src={`${baseUrl}/${relatedPost.coverImage}`} 
                      alt={relatedPost.title} 
                      className="news-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-thumbnail.jpg"; // Fallback image
                      }}
                    />
                    <div className="news-text">
                      <h4>{relatedPost.title}</h4>
                      <p className="news-date">{formatDateToWords(relatedPost.updatedAt)}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No related posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;