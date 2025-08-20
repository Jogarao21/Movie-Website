import React, { useState } from 'react'
import Data from './Project3 Pagination/data.json';

const App = () => {
  const recordsPerPage = 10;
  const TotalPages = Math.ceil(Data.length/recordsPerPage)
  const [currentPage, setCurrentPage] = useState(1)
  function getRecords(){
    const firstIndex = (currentPage-1)*recordsPerPage;
    const lastIndex = firstIndex + recordsPerPage;
    const currentRecords = Data.slice(firstIndex, lastIndex);
    return currentRecords;

  }
  function handlePrevPage(){
    setCurrentPage(currentPage-1)
  }
  function handleNextPage(){
    setCurrentPage(currentPage+1)
  }

  return (
    <div>
      {
        getRecords().map((item, index)=>{
          return(
            <div >
              <center><p>{item.name}</p></center>
            </div>
          )

        })
      }
      <center>
        <button onClick={handlePrevPage} disabled={currentPage===1}>Previous Page</button>
        {currentPage}/{TotalPages}
        <button onClick={handleNextPage} disabled={TotalPages===currentPage}>Next Page</button>
      </center>
    </div>
  )
}

export default App