import React from 'react';
import { Link } from 'react-router-dom';



const Navigation = ({ authenticated }) => (
  <nav>
    <ul>
      <li><Link to="/">О мастере</Link></li>      
      <li><Link to="/services">Услуги</Link></li>
      <li><Link to="/gallery">Галерея</Link></li>
      <li><Link to="/reviews">Отзывы</Link></li>
      {authenticated && (
        <>
          <li><Link to="/admin">Админка</Link></li>
        </>
      )}
    </ul>
  </nav>
);

export default Navigation;
