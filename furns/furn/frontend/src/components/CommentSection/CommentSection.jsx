import { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css';

// eslint-disable-next-line react/prop-types
const CommentSection = ({ postId, userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true); // Add a loading state when fetching comments
    axios.get(`http://localhost:4000/api/comments`, { params: { postId, userId } })
      .then(response => {
        setComments(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching comments", error);
        setError("Failed to load comments");
        setLoading(false);
      });
  }, [postId, userId]); // Dependencies should include postId and userId

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    setLoading(true);

    axios.post('http://localhost:4000/api/comments', {
      userId,
      comment: newComment,
      postId, // Add postId in the request body
    })
      .then(response => {
        setComments([response.data, ...comments]);
        setNewComment('');
        setLoading(false);
      })
      .catch(error => {
        console.error("Error adding comment", error);
        setError("Failed to post comment");
        setLoading(false);
      });
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : Array.isArray(comments) && comments.length > 0 ? (
        <div className="comment-list"> {/* Make this container scrollable */}
          {comments.map((c) => (
            <div key={c._id} className="comment">
              <p><strong>{c.userId.name}</strong>: {c.comment}</p> {/* Ensure userId has name property */}
              <span>{new Date(c.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments yet.</p>
      )}
      <div className="comment-input-wrapper">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
