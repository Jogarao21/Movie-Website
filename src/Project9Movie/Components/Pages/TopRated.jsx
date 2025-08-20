import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../Card';
import Loader from '../Loader';
import './TopRated.css';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: import.meta.env.VITE_TMBD_API_KEY || 'ec97b04c1cc2eb09b37b33469f188e2c',
  },
});

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [minRating, setMinRating] = useState('');
  const [genres, setGenres] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  // Generate years array (from current year back to 1950)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1949 }, 
    (_, i) => currentYear - i
  );

  // Fetch genres
  const fetchGenres = async () => {
    try {
      const response = await axiosInstance.get('genre/movie/list');
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  // Fetch top rated movies
  const fetchTopRatedMovies = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        page: currentPage,
        sort_by: 'vote_average.desc',
        'vote_count.gte': 100, // Only movies with at least 100 votes to ensure reliability
      };

      // Add filters if selected
      if (selectedGenre) {
        params.with_genres = selectedGenre;
      }

      if (selectedYear) {
        params.year = selectedYear;
      }

      if (minRating) {
        params['vote_average.gte'] = minRating;
      }

      const response = await axiosInstance.get('discover/movie', { params });
      
      setMovies(response.data.results);
      setTotalPages(Math.min(response.data.total_pages, 500));
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      
      let errorMessage = 'Failed to fetch top rated movies. ';
      if (error.response?.status === 401) {
        errorMessage += 'Invalid API key. Please check your TMDB API key.';
      } else if (error.response?.data?.status_message) {
        errorMessage += error.response.data.status_message;
      } else {
        errorMessage += 'Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch featured top rated movie for hero section
  const fetchFeaturedMovie = async () => {
    try {
      const response = await axiosInstance.get('movie/top_rated', { 
        params: { page: 1 } 
      });
      
      // Get a random movie from top 5 highest rated
      const randomIndex = Math.floor(Math.random() * Math.min(response.data.results.length, 5));
      setFeaturedMovie(response.data.results[randomIndex]);
    } catch (error) {
      console.error('Error fetching featured movie:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchFeaturedMovie();
  }, []);

  useEffect(() => {
    fetchTopRatedMovies();
  }, [currentPage, selectedGenre, selectedYear, minRating]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handleRatingChange = (rating) => {
    setMinRating(rating);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setMinRating('');
    setCurrentPage(1);
  };

  const getAverageRating = () => {
    if (movies.length === 0) return 0;
    const total = movies.reduce((sum, movie) => sum + movie.vote_average, 0);
    return (total / movies.length).toFixed(1);
  };

  if (loading && movies.length === 0) {
    return <Loader />;
  }

  return (
    <div className="toprated-container">
      {/* Hero Section */}
      {featuredMovie && (
        <div 
          className="hero-section"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
          }}
        >
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="rating-star">★</span>
                <span>Top Rated Movies</span>
              </div>
              <h1 className="hero-title">Highest Rated Films</h1>
              <p className="hero-subtitle">
                Discover critically acclaimed movies with the highest ratings from audiences worldwide
              </p>
              <div className="hero-stats">
                <div className="stat-card">
                  <span className="stat-number">{movies.length}</span>
                  <span className="stat-label">Movies</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">★ {getAverageRating()}</span>
                  <span className="stat-label">Avg Rating</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">{currentPage}/{totalPages}</span>
                  <span className="stat-label">Pages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-container">
          <div className="filters-header">
            <h3>Filter Top Rated Movies</h3>
            <p>Find the perfect highly-rated movie for you</p>
          </div>
          
          <div className="filters-grid">
            {/* Genre Filter */}
            <div className="filter-group">
              <label htmlFor="genre-select" className="filter-label">
                <span className="filter-icon">🎭</span>
                Genre
              </label>
              <select
                id="genre-select"
                value={selectedGenre}
                onChange={(e) => handleGenreChange(e.target.value)}
                className="filter-select"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="filter-group">
              <label htmlFor="year-select" className="filter-label">
                <span className="filter-icon">📅</span>
                Release Year
              </label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className="filter-select"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="filter-group">
              <label htmlFor="rating-select" className="filter-label">
                <span className="filter-icon">⭐</span>
                Min Rating
              </label>
              <select
                id="rating-select"
                value={minRating}
                onChange={(e) => handleRatingChange(e.target.value)}
                className="filter-select"
              >
                <option value="">Any Rating</option>
                <option value="9.0">9.0+ Masterpieces</option>
                <option value="8.5">8.5+ Excellent</option>
                <option value="8.0">8.0+ Great</option>
                <option value="7.5">7.5+ Very Good</option>
                <option value="7.0">7.0+ Good</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="filter-group">
              <button onClick={clearAllFilters} className="clear-filters-btn">
                <span>🗑️</span>
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="error-section">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button onClick={fetchTopRatedMovies} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Movies Section */}
      {!error && (
        <>
          <div className="movies-section">
            <div className="section-header">
              <h2 className="section-title">
                {selectedGenre || selectedYear || minRating ? 'Filtered Results' : 'Top Rated Movies'}
              </h2>
              
              <div className="section-info">
                <p className="movies-count">
                  Showing {movies.length} movies on page {currentPage}
                </p>
                
                {(selectedGenre || selectedYear || minRating) && (
                  <div className="active-filters">
                    <span className="filter-label-small">Active Filters:</span>
                    {selectedGenre && (
                      <span className="filter-tag">
                        {genres.find(g => g.id.toString() === selectedGenre)?.name}
                      </span>
                    )}
                    {selectedYear && (
                      <span className="filter-tag">{selectedYear}</span>
                    )}
                    {minRating && (
                      <span className="filter-tag">Rating {minRating}+</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {movies.length > 0 ? (
              <div className="movies-grid">
                {movies.map((movie, index) => (
                  <div key={movie.id} className="movie-card-wrapper">
                    <div className="ranking-badge">#{(currentPage - 1) * 20 + index + 1}</div>
                    <Card movie={movie} />
                    <div className="movie-rating-overlay">
                      <span className="rating-score">★ {movie.vote_average.toFixed(1)}</span>
                      <span className="vote-count">{movie.vote_count} votes</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-movies">
                <div className="no-movies-icon">🎬</div>
                <h3>No movies found</h3>
                <p>Try adjusting your filters to see more results.</p>
                <button onClick={clearAllFilters} className="clear-filters-btn">
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {movies.length > 0 && (
            <div className="pagination-section">
              <div className="pagination-info">
                <span>
                  Showing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                </span>
                <span className="total-movies">
                  ({(currentPage - 1) * 20 + 1}-{Math.min(currentPage * 20, totalPages * 20)} of top rated movies)
                </span>
              </div>
              
              <div className="pagination-controls">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="pagination-btn first-page"
                >
                  ⏮ First
                </button>

                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn prev-page"
                >
                  ← Previous
                </button>

                <div className="page-numbers">
                  {[...Array(Math.min(7, totalPages))].map((_, index) => {
                    let pageNumber;
                    if (totalPages <= 7) {
                      pageNumber = index + 1;
                    } else if (currentPage <= 4) {
                      pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 3) {
                      pageNumber = totalPages - 6 + index;
                    } else {
                      pageNumber = currentPage - 3 + index;
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn next-page"
                >
                  Next →
                </button>

                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn last-page"
                >
                  Last ⏭
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Loading Overlay */}
      {loading && movies.length > 0 && (
        <div className="loading-overlay">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default TopRated;