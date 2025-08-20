import React, { useEffect, useState } from 'react';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css';
const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const imagesPerPage = 20;

  useEffect(() => {
    if (search.trim() === '') {
      setData([]);
      setTotalHits(0);
      return;
    }

    setLoading(true);
    fetch(`https://pixabay.com/api/?key=51421429-ffe1eafb99286f586ac3bb723&q=${search}&image_type=photo&per_page=${imagesPerPage}&page=${currentPage}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d.hits);
        setTotalHits(d.totalHits);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [search, currentPage]);

  const totalPages = Math.ceil(totalHits / imagesPerPage);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const downloadImage = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl, {
        mode: 'cors',
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'pixabay-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open image in new tab
      window.open(imageUrl, '_blank');
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        <ChevronLeft size={18} />
      </button>
    );

    // First page
    if (startPage > 1) {
      buttons.push(
        <button key={1} onClick={() => goToPage(1)} className="pagination-btn">
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
      buttons.push(
        <button key={totalPages} onClick={() => goToPage(totalPages)} className="pagination-btn">
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        <ChevronRight size={18} />
      </button>
    );

    return buttons;
  };

  return (
    <div className="app-container">
      <h2 className="app-title">Pixabay Image Search</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search images..."
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {search && (
        <div className="results-info">
          {totalHits > 0 ? (
            <p>Found {totalHits.toLocaleString()} images • Page {currentPage} of {totalPages}</p>
          ) : !loading && (
            <p>No images found for "{search}"</p>
          )}
        </div>
      )}

      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading images...</p>
        </div>
      )}

      <div className="image-grid">
        {data.map((item, index) => (
          <div className="image-card" key={item.id || index}>
            <div className="image-container">
              <img src={item.webformatURL} alt={item.tags} loading="lazy" />
              <div className="image-overlay">
                <button
                  className="download-btn"
                  onClick={() => downloadImage(item.largeImageURL, `pixabay-${item.id}.jpg`)}
                  title="Download image"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>
            <div className="image-info">
              <p className="image-tags">{item.tags}</p>
              <div className="image-stats">
                <span>👁 {item.views}</span>
                <span>💙 {item.likes}</span>
                <span>📥 {item.downloads}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && !loading && (
        <div className="pagination">
          {renderPaginationButtons()}
        </div>
      )}


    </div>
  );
};

export default App;