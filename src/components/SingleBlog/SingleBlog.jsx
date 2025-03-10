import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SingleBlog.css';

const SingleBlog = ({ blogs }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const formatDateToWords = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  useEffect(() => {
    const selectedPost = blogs.find((blog) => blog.id === parseInt(id));
    setPost(selectedPost);

    if (selectedPost) {
      const related = blogs.filter(
        (blog) => blog.category === selectedPost.category && blog.id !== parseInt(id)
      ).slice(0,3);
      setRelatedPosts(related);
    }
  }, [id, blogs]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="blog-post-container">
      {/* Back to SonicHub Button (Now on Top of the Container) */}
      <div className="back-to-sonichub">
        <Link to="/blog" className="back-button">
          Back to SonicHub
        </Link>
      </div>

      <div className="blog-post-left">
        <h1>{post.title}</h1>
        <img src={post.image} alt={post.title} className="blog-post-image" />
        <div className="blog-post-content">{post.content}</div>
      </div>

      <div className="blog-post-right">
        {/* Latest News Section */}
        <div className="latest-news">
  <h3>Latest News</h3>
  {blogs.slice(0, 3).map((blog) => (
    <div className="news-card" key={blog.id}>
      <Link to={`/post/${blog.id}`} className="news-card-link">
        <div className="news-card-content">
          <img src={blog.image} alt={blog.title} className="news-image" />
          <div className="news-text">
            <h4>{blog.title}</h4>
            <p className="news-date">{formatDateToWords(blog.date)}</p>
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>

        {/* Related Posts Section */}
        <div className="related-posts">
  <h3>Related Posts</h3>
  {relatedPosts.map((relatedPost) => (
    <div className="news-card" key={relatedPost.id}>
      <Link to={`/post/${relatedPost.id}`} className="news-card-link">
        <div className="news-card-content">
          <img src={relatedPost.image} alt={relatedPost.title} className="news-image" />
          <div className="news-text">
            <h4>{relatedPost.title}</h4>
            <p className="news-date">{formatDateToWords(relatedPost.date)}</p>
          </div>
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
