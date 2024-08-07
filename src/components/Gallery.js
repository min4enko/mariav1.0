import React, { useState, useEffect } from 'react';


const Gallery = () => {
  const [images, setImages] = useState(() => {
    const savedImages = localStorage.getItem('images');
    return savedImages ? JSON.parse(savedImages) : [];
  });

  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(images));
  }, [images]);

  return (
    <div className="gallery">
      <h2>Галерея</h2>
      <div className="images">
        {images.map(image => (
          <div key={image.id}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
