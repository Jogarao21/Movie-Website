import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../Card';
import Loader from '../Loader';
import './Popular.css';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: import.meta.env.VITE_TMBD_API_KEY || 'ec97b04c1cc2eb09b37b33469f188e2c',
  },
});

// Debug API key
console.log('API Key:', import.meta.env.VITE_TMBD_API_KEY);

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);

  // Fetch genres
  const fetchGenres = async () => {
    try {
      const response = await axiosInstance.get('genre/movie/list');
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  // Fetch popular movies
  const fetchPopularMovies = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching movies with API key:', import.meta.env.VITE_TMBD_API_KEY);
      
      const params = {
        page: currentPage,
        sort_by: sortBy,
      };

      // Add genre filter if selected
      if (selectedGenre) {
        params.with_genres = selectedGenre;
      }

      console.log('Request params:', params);
      const response = await axiosInstance.get('discover/movie', { params });
      console.log('API Response:', response.data);
      
      setMovies(response.data.results);
      setTotalPages(Math.min(response.data.total_pages, 500)); // TMDB limits to 500 pages
    } catch (error) {
      console.error('Detailed API Error:', error);
      console.error('Error Response:', error.response?.data);
      console.error('Error Status:', error.response?.status);
      
      let errorMessage = 'Failed to fetch movies. ';
      if (error.response?.status === 401) {
        errorMessage += 'Invalid API key. Please check your TMDB API key.';
      } else if (error.response?.status === 404) {
        errorMessage += 'API endpoint not found.';
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

  // Fetch featured movie (backdrop for hero section)
  const [featuredMovie, setFeaturedMovie] = useState(null);
  
  const fetchFeaturedMovie = async () => {
    try {
      const response = await axiosInstance.get('movie/popular', { params: { page: 1 } });
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
    fetchPopularMovies();
  }, [currentPage, sortBy, selectedGenre]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSortBy('popularity.desc');
    setSelectedGenre('');
    setCurrentPage(1);
  };

  if (loading && movies.length === 0) {
    return <Loader />;
  }

  return (
    <div className="popular-container">
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
              <h1 className="hero-title">Popular Movies</h1>
              <p className="hero-subtitle">
                Discover the most popular and trending movies from around the world
              </p>
              <div className="hero-stats">
                <span className="stat-item">
                  <strong>{movies.length}</strong> Movies Available
                </span>
                <span className="stat-item">
                  <strong>Page {currentPage}</strong> of {totalPages}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-container">
          {/* Sort Filter */}
          <div className="filter-group">
            <label htmlFor="sort-select" className="filter-label">Sort By:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="filter-select"
            >
              <option value="popularity.desc">Most Popular</option>
              <option value="popularity.asc">Least Popular</option>
              <option value="release_date.desc">Newest First</option>
              <option value="release_date.asc">Oldest First</option>
              <option value="vote_average.desc">Highest Rated</option>
              <option value="vote_average.asc">Lowest Rated</option>
              <option value="revenue.desc">Highest Grossing</option>
            </select>
          </div>

          {/* Genre Filter */}
          <div className="filter-group">
            <label htmlFor="genre-select" className="filter-label">Genre:</label>
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

          {/* Clear Filters */}
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchPopularMovies} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {/* Movies Grid */}
      {!error && (
        <>
          <div className="movies-section">
            <div className="section-header">
              <h2 className="section-title">
                {selectedGenre 
                  ? `${genres.find(g => g.id.toString() === selectedGenre)?.name || 'Filtered'} Movies`
                  : 'Popular Movies'
                }
              </h2>
              <p className="movies-count">{movies.length} movies on this page</p>
            </div>

            {movies.length > 0 ? (
              <div className="movies-grid">
                {movies.map((movie) => (
                  <Card key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="no-movies">
                <h3>No movies found</h3>
                <p>Try adjusting your filters or search criteria.</p>
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
              </div>
              
              <div className="pagination-controls">
                {/* First Page */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="pagination-btn first-page"
                >
                  First
                </button>

                {/* Previous Page */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn prev-page"
                >
                  ← Previous
                </button>

                {/* Page Numbers */}
                <div className="page-numbers">
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = index + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + index;
                    } else {
                      pageNumber = currentPage - 2 + index;
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

                {/* Next Page */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn next-page"
                >
                  Next →
                </button>

                {/* Last Page */}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn last-page"
                >
                  Last
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

export default Popular;