import React from 'react';

const CardFooter = ({ displayCount, totalCount, loadMore }) => {
  return (
    <div className="card-footer text-left">
      {displayCount < totalCount ? (
        <button className="btn btn-primary btn-sm" onClick={loadMore}>
          Load More
        </button>
      ) : (
        <small className="text-muted">Showing {displayCount} of {totalCount}</small>
      )}
    </div>
  );
};

export default CardFooter;
