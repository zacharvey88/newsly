import { Link } from "react-router-dom";

export default () => {
  return (
      <header className="border-bottom lh-1 py-3">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="col-4 pt-1">
          <a className="link-secondary" href="#">Submit an article</a>
        </div>
        <div className="col-4 text-center">
        <Link to="/">
          <picture>
            <source srcSet="./src/assets/newsly-logo.png" media="(min-width: 768px)" />
            <img className="header-logo" src="./src/assets/newsly-icon.png"/>
          </picture>
        </Link>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
          <a className="link-secondary" href="#" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
          </a>
          <a className="btn btn-sm btn-outline-secondary" href="#">Login</a>
        </div>
      </div>
    </header>
  )
};
