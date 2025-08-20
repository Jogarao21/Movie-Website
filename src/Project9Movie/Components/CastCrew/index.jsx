import React, { useEffect, useState } from 'react';
import './index.css';

const CastCrew = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    const fetchCastAndCrew = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMBD_API_KEY}&language=en-US`
        );
        const data = await res.json();
        setCast(data.cast.slice(0, 10));
        setCrew(data.crew.slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch cast/crew:', err);
      }
    };

    fetchCastAndCrew();
  }, [movieId]);

  return (
    <div className="cast-crew-container">
      <h2>Cast</h2>
      <div className="cast-list">
        {cast.map((actor) => (
          <div key={actor.id} className="cast-card">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : 'https://via.placeholder.com/100x150?text=No+Image'
              }
              alt={actor.name}
            />
            <p><strong>{actor.name}</strong></p>
            <p className="character">as {actor.character}</p>
          </div>
        ))}
      </div>

      <h2>Crew</h2>
      <div className="crew-list">
        {crew.map((member) => (
          <div key={member.id} className="crew-card">
            <p><strong>{member.name}</strong></p>
            <p className="job">{member.job}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastCrew;
