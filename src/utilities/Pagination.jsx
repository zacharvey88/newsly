export default ({ currentPage, totalArticles, onPageChange }) => {
  const totalPages = Math.ceil(totalArticles / 10);

  return (
    <nav className="blog-pagination" aria-label="Pagination">
      <button
        className="btn btn-outline-primary rounded-pill"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <button
        className="btn btn-outline-secondary rounded-pill"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
};
