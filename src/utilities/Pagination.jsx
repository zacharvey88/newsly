export default () => {
  return (
    <nav className="blog-pagination" aria-label="Pagination">
      <a className="btn btn-outline-primary rounded-pill" href="#">Previous</a>
      <a className="btn btn-outline-secondary rounded-pill disabled" aria-disabled="true">Next</a>
    </nav>
  )
}