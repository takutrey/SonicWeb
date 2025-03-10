import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SingleBlog.css';

const SingleBlog = ({ blogs }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // Find the clicked post by ID
    const selectedPost = blogs.find((blog) => blog.id === id);
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
      <h1>{post.title}</h1>
      <img src={post.image} alt={post.title} className="blog-post-image" />
      <div className="blog-post-content">{post.content}</div>

      <h3>Related Posts</h3>
      <div className="related-posts">
        {relatedPosts.map((relatedPost) => (
          <div className="related-post" key={relatedPost.id}>
            <Link to={`/post/${relatedPost.id}`}>
              <img src={relatedPost.image} alt={relatedPost.title} className="related-post-image" />
              <h4>{relatedPost.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleBlog;
