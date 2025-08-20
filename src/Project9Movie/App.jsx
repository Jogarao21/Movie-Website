import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./Project9Movie/Components/Navbar";
import Card from './Project9Movie/Components/Card';
import Loader from './Project9Movie/Components/Loader';
import SpecificMovie from './Project9Movie/Components/Pages/SpecificMovie';
import Upcoming from './Project9Movie/Components/Pages/Upcoming';
import Popular from './Project9Movie/Components/Pages/Popular';
import TopRated from './Project9Movie/Components/Pages/TopRated';
import Home from './Project9Movie/Home';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: import.meta.env.VITE_TMBD_API_KEY,
  },
});

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async () => {
    try {
      let response;

      if (search === '') {
        response = await axiosInstance.get('movie/popular', {
          params: { page: currentPage },
        });
      } else {
        response = await axiosInstance.get('search/movie', {
          params: {
            query: search,
            page: currentPage,
          },
        });
      }

      // Remove duplicates and filter out movies without backdrop images
      const uniqueMovies = response.data.results
        .filter((movie, index, arr) => 
          movie.backdrop_path && // Only include movies with backdrop images
          arr.findIndex(m => m.id === movie.id) === index // Remove duplicates by ID
        );

      setMovies(uniqueMovies);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, currentPage]);

  return (
    <BrowserRouter>
      <Navbar setSearch={setSearch} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              movies={movies}
              currentPage={currentPage}
              totalPages={totalPages}
              handleNext={() => setCurrentPage((p) => p + 1)}
              handlePrev={() => setCurrentPage((p) => p - 1)}
              search={search}
            />
          }
        />
        <Route path='/Card' element={<Card/>}/>
        <Route path="/movie/:id" element={<SpecificMovie />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<TopRated />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;