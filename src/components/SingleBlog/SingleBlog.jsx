import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SingleBlog.css';

const SingleBlog = ({ blogs }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // Find the clicked post by ID
    const selectedPost = blogs.find((blog) => blog.id === parseInt(id));
    setPost(selectedPost);

    // Find related posts by category
    const related = blogs.filter(
      (blog) => blog.category === selectedPost.category && blog.id !== id
    );
    setRelatedPosts(related);
  }, [id, blogs]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="blog-post-container">
      <div className="blog-post-left">
        <h1>{post.title}</h1>
        <img src={post.image} alt={post.title} className="blog-post-image" />
        <div className="blog-post-content">{post.content}</div>
      </div>

      <div className="blog-post-right">
        <div className="back-to-sonichub">
          <Link to="/sonichub">
            <button className="back-button">Back to SonicHub</button>
          </Link>
        </div>

        <div className="latest-news">
          <h3>Latest News</h3>
          {blogs.slice(0, 3).map((blog) => (
            <div className="news-card" key={blog.id}>
              <Link to={`/post/${blog.id}`} className="news-card-link">
                <div className="news-card-content">
                  <img src={blog.image} alt={blog.title} className="news-image" />
                  <h4>{blog.title}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="related-posts">
          <h3>Related Posts</h3>
          {relatedPosts.map((relatedPost) => (
            <div className="news-card" key={relatedPost.id}>
              <Link to={`/post/${relatedPost.id}`} className="news-card-link">
                <div className="news-card-content">
                  <img src={relatedPost.image} alt={relatedPost.title} className="news-image" />
                  <h4>{relatedPost.title}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
