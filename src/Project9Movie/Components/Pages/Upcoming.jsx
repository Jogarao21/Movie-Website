// Upcoming.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Upcoming.css';

const Upcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await axios.get(
          'https://api.themoviedb.org/3/movie/upcoming',
          {
            params: {
              api_key: import.meta.env.VITE_TMBD_API_KEY,
              language: 'en-US',
              page: 1,
            },
          }
        );
        setUpcomingMovies(res.data.results);
      } catch (err) {
        console.error('Error fetching upcoming movies:', err);
      }
    };

    fetchUpcoming();
  }, []);

  return (
    <div className="upcoming-container">
      <h2>Upcoming Movies</h2>
      <div className="upcoming-grid">
        {upcomingMovies.map((movie) => (
          <div key={movie.id} className="upcoming-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
