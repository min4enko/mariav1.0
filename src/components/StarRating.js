import React, { useState } from 'react';

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  
  const handleClick = (value) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(value => (
        <span
          key={value}
          onClick={() => handleClick(value)}
          style={{ cursor: 'pointer', color: value <= rating ? '#FFD700' : '#ccc' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
