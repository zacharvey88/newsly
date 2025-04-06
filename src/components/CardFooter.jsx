import React from 'react';

const CardFooter = ({ displayCount, totalCount, loadMore }) => {
  const showingCount = Math.min(displayCount, totalCount);
  
  return (
    <div className="card-footer d-flex justify-content-between align-items-center">
      <small className="text-muted">
        Showing {showingCount} of {totalCount}
      </small>
      {totalCount > 10 && showingCount < totalCount && (
        <button className="btn btn-primary btn-sm" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CardFooter;