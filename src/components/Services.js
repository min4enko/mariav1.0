import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState(() => {
    const savedServices = localStorage.getItem('services');
    return savedServices ? JSON.parse(savedServices) : [];
  });

  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  return (
    <div className="services">
      <h2>Услуги</h2>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            {service.name} - {service.price} руб.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
