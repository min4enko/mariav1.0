import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import StarRating from './StarRating';

const Admin = () => {
  const [images, setImages] = useState(() => {
    const savedImages = localStorage.getItem('images');
    return savedImages ? JSON.parse(savedImages) : [];
  });

  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('reviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  const [services, setServices] = useState(() => {
    const savedServices = localStorage.getItem('services');
    return savedServices ? JSON.parse(savedServices) : [];
  });

  const [selectedSection, setSelectedSection] = useState('reviews');
  
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  const addImage = (data) => {
    const file = data.image[0];
    if (file && file instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, { id: uuidv4(), src: reader.result, alt: data.alt }]);
      };
      reader.readAsDataURL(file);
      reset();
    } else {
      console.error('File is not a Blob');
    }
  };

  const deleteImage = (id) => {
    setImages(images.filter(image => image.id !== id));
  };

  const addReview = (data) => {
    const file = data.image[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setReviews([...reviews, { id: uuidv4(), text: data.review, rating: data.rating, image: reader.result }]);
    };
    reader.readAsDataURL(file);
    reset();
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const addService = (data) => {
    setServices([...services, { id: uuidv4(), name: data.name, price: data.price }]);
    reset();
  };

  const deleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleRatingChange = (value) => {
    setValue('rating', value);
  };

  return (
    <div className="admin">
      <nav>
        <button onClick={() => setSelectedSection('reviews')}>Отзывы</button>
        <button onClick={() => setSelectedSection('gallery')}>Галерея</button>
        <button onClick={() => setSelectedSection('services')}>Услуги</button>
      </nav>

      {selectedSection === 'reviews' && (
        <section>
          <h2>Отзывы</h2>
          <form onSubmit={handleSubmit(addReview)}>
            <textarea {...register('review')} placeholder="Отзыв" required></textarea>
            <StarRating onRatingChange={handleRatingChange} />
            <input type="file" {...register('image')} />
            <button type="submit">Добавить</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Отзыв</th>
                <th>Оценка</th>
                <th>Фотография</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => (
                <tr key={review.id}>
                  <td>{review.text}</td>
                  <td>{review.rating}</td>
                  <td>{review.image && <img src={review.image} alt="review" width="100" />}</td>
                  <td><button onClick={() => deleteReview(review.id)}>Удалить</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {selectedSection === 'gallery' && (
        <section>
          <h2>Добавить фотографию</h2>
          <form onSubmit={handleSubmit(addImage)}>
            <input type="file" {...register('image')} required />
            <input {...register('alt')} placeholder="Описание" required />
            <button type="submit">Добавить</button>
          </form>
          <div className="images">
            {images.map(image => (
              <div key={image.id}>
                <img src={image.src} alt={image.alt} />
                <button onClick={() => deleteImage(image.id)}>Удалить</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedSection === 'services' && (
        <section>
          <h2>Услуги</h2>
          <form onSubmit={handleSubmit(addService)}>
            <input {...register('name')} placeholder="Название услуги" required />
            <input type="number" {...register('price')} placeholder="Цена" required />
            <button type="submit">Добавить</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Название услуги</th>
                <th>Цена</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>{service.price} руб.</td>
                  <td><button onClick={() => deleteService(service.id)}>Удалить</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default Admin;
