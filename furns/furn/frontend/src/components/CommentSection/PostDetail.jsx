// components/PostDetail.js
import { useParams } from 'react-router-dom';
import CommentSection from './CommentSection';
import './CommentSection.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

const PostDetail = ({ userId }) => {

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const { postId } = useParams();  
  const [ratingFeedback, setRatingFeedback] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:4000/api/posts/${postId}`)
      .then(response => {
        setPost(response.data);
        setAverageRating(response.data.averageRating); 
      })
      .catch(() => setError("Failed to fetch post details"));
  }, [postId]);


  const handleRating = (rating) => {
    axios.post(`http://localhost:4000/api/posts/${postId}/rate`, {
      userId,
      rating,
    })
      .then(response => {
        setAverageRating(response.data.newAverage);
        setUserRating(rating);
        setRatingFeedback('Thank you for your rating!');
        setTimeout(() => setRatingFeedback(null), 3000);
      })
      .catch(() => alert('Failed to submit your rating'));
  };

  
  console.log(postId);
  return (
    <div>
      <h2>Post Detail</h2>
      {/* Nội dung chi tiết bài viết */}
      
      <CommentSection postId={postId} userId={userId} />

      <div className="star-rating">
        <h3 className='h3rate'>Rate for website :</h3>

        <div>
          {ratingFeedback && <p className="feedback">{ratingFeedback}</p>}
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={star <= userRating ? 'star selected' : 'star'}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
          
        ))}
        {ratingFeedback && <p className="feedback">{ratingFeedback}</p>}


        <p>Average : 4.4<span className='st'>★</span></p>
        </div>
      </div>
    </div>
    
  );
};

export default PostDetail;
