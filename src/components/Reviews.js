import React, { useState, useEffect } from 'react';


const Reviews = () => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('reviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + parseInt(review.rating, 10), 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="reviews">
      <h2>Отзывы</h2>
      <p>Средняя оценка: {averageRating}</p>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.text}</p>
            <p>Оценка: {review.rating}</p>
            {review.image && <img src={review.image} alt="review" width="100" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
