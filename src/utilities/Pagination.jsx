import React from 'react';

export default function Pagination ({ currentOffset, limit, totalArticles, onOffsetChange }) {
  const isPreviousDisabled = currentOffset === 0; 
  const isNextDisabled = currentOffset + limit >= totalArticles;

  return (
    <nav className="blog-pagination" aria-label="Pagination">
      <button
        className="btn btn-outline-primary rounded-pill"
        onClick={() => onOffsetChange(currentOffset - limit)}
        disabled={isPreviousDisabled}
      >
        Previous
      </button>

      <button
        className="btn btn-outline-primary rounded-pill"        
        onClick={() => onOffsetChange(currentOffset + limit)}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </nav>
  );
};