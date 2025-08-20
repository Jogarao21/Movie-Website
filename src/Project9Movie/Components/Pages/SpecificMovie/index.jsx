import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CastCrew from '../../CastCrew'; // make sure path is correct
import './index.css';

const SpecificMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [trailerKey, setTrailerKey] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMBD_API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };

    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMBD_API_KEY}&language=en-US`
        );
        const data = await res.json();
        const trailer = data.results.find(
          (video) =>
            (video.type === 'Trailer' || video.type === 'Teaser') &&
            video.site === 'YouTube'
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (err) {
        console.error('Error fetching trailer:', err);
      }
    };

    fetchMovie();
    fetchTrailer();
  }, [id]);

  return (
    <div className="specific-movie-container">
      <img
        className="specific-movie-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.original_title}
      />
      <div className="specific-movie-details">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>⭐ {movie.vote_average}</p>

        {trailerKey ? (
          <div className="trailer-container">
            <h2>Watch Trailer</h2>
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>No trailer available</p>
        )}
      </div>

      {/* ✅ Cast and Crew Component */}
      <CastCrew movieId={id} />
    </div>
  );
};

export default SpecificMovie;
