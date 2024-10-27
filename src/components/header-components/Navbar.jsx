import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/newsly-logo.png";
import icon from "../../assets/newsly-icon.png";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/User";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { useModal } from "../../contexts/ModalContext"; 

export default () => {
  const { user, setUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { openModal } = useModal(); 

  const handleLogout = () => {
    setUser({});
    localStorage.removeItem("user");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/articles?search=${searchTerm}`);
    }
  };

  const handleCreateArticle = () => {
    openModal({}, "article", false);
  };

  return (
    <header className="border-bottom lh-1 py-3">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="col-4 pt-1 main-nav">
          <div className="main-nav-links">
            <Link className="link-secondary" to="/"><i className="fa-solid fa-house"></i> Home</Link>
            <button className="link-secondary" onClick={handleCreateArticle}>
              <i className="fa-solid fa-file-pen"></i> Submit an article
            </button>
          </div>
          <Dropdown className="main-nav-toggle">
            <DropdownToggle as={Link}>
              <i className="fa-solid fa-bars"></i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link to="/">Home</Link>
              </DropdownItem>
              <DropdownItem>
                <button onClick={handleCreateArticle}>Submit an article</button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="col-4 text-center">
          <Link to="/">
            <picture>
              <source srcSet={logo} media="(min-width: 768px)" />
              <img className="header-logo" alt="Newsly logo" src={icon} />
            </picture>
          </Link>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center nav-right">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-wrapper">
              <input
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="search-input"
              />
              <i className="fa-solid fa-magnifying-glass search-icon"></i> 
            </div>
          </form>
          {user.username ? (
            <Dropdown>
              <DropdownToggle as={Link}>
                <img className="nav-user-avatar rounded-circle" src={user.avatar_url} alt="User Avatar" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => navigate(`/dashboard`)}>Dashboard</DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Link className="btn btn-sm btn-outline-secondary login-btn" to={"/login"}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
