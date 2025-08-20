import React, { useContext, useState } from 'react';
import { AuthContext, AuthModal } from './Authentication';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Card from './Components/Card';
import './Home.css';

const Home = ({ movies, handlePrev, handleNext, currentPage, totalPages, search }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="home-container">
      {isAuthenticated ? (
        <>
          {/* Show carousel only when not searching and on home page */}
          {!search && (
            <div className="carousel-container">
              <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={5000}
                showStatus={false}
                swipeable={true}
                emulateTouch={true}
              >
                {movies.slice(0, 10).map((movie) => ( // Limit to first 10 for carousel
                  <div key={movie.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.original_title}
                      onError={(e) => {
                        // Fallback to poster if backdrop fails
                        e.target.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                      }}
                    />
                    <div className="legend">
                      <h1>{movie.original_title}</h1>
                      <p>{movie.overview}</p>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          )}

          {/* Section Header */}
          <div className="section-header">
            <h2 className="section-title">
              {search ? `Search Results for "${search}"` : 'Popular Movies'}
            </h2>
            <p className="section-subtitle">
              {search ? `Found ${movies.length} movies` : 'Discover the most popular movies'}
            </p>
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            <button
              className="pagination-btn"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <span className="page-info">
              {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>

          {/* Movies Grid */}
          {movies.length > 0 ? (
            <div className="movies-grid">
              {movies.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-message">No movies found. Try a different search term.</p>
            </div>
          )}
        </>
      ) : (
        /* Login Required Screen */
        <div className="login-required">
          <div className="login-card">
            <div className="movie-icon">🎬</div>
            <h1 className="welcome-title">MovieMania</h1>
            <p className="welcome-subtitle">
              Discover your next favorite movie! Join our community to explore thousands of films.
            </p>
            <div className="auth-buttons">
              <button
                onClick={() => handleAuthClick('login')}
                className="login-btn"
              >
                Login
              </button>
              <button
                onClick={() => handleAuthClick('signup')}
                className="signup-btn"
              >
                Sign Up
              </button>
            </div>
            <p className="login-hint">Please login to access the movie database</p>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default Home;