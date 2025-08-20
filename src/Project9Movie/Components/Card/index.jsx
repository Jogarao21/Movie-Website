import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Card = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="card-link"> {/* ✅ Link to specific movie */}
      <div className="card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
          className="card-image"
        />
        <div className="card-content">
          <h2 className="card-title">{movie.original_title}</h2>
          <p className="card-overview">{movie.overview.slice(0, 100)}...</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;

