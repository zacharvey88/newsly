import { Link } from "react-router-dom";
import logo from "../../assets/newsly-logo.png";
import icon from "../../assets/newsly-icon.png";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";

export default () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <header className="border-bottom lh-1 py-3">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="col-4 pt-1 main-nav">
          <Link className="link-secondary" to="/">Home</Link>
          <Link className="link-secondary" to="/write-article">Submit an article</Link>
        </div>
        <div className="col-4 text-center">
          <Link to="/">
            <picture>
              <source srcSet={logo} media="(min-width: 768px)" />
              <img className="header-logo" src={icon} />
            </picture>
          </Link>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
          <a className="link-secondary" href="#" aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="mx-3"
              role="img"
              viewBox="0 0 24 24"
            >
              <title>Search</title>
              <circle cx="10.5" cy="10.5" r="7.5"></circle>
              <path d="M21 21l-5.2-5.2"></path>
            </svg>
          </a>
          {user.username ? (
            <img
              className="nav-user-avatar"
              src={user.avatar_url}
              alt="user avatar"
            />
          ) : (
            <Link className="btn btn-sm btn-outline-secondary" to={"/login"}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
