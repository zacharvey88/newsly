import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/newsly-logo.png";
import icon from "../../assets/newsly-icon.png";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';

export default () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser({});
    localStorage.removeItem("user");
  }

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
              <img className="header-logo" alt="Newsly logo" src={icon} />
            </picture>
          </Link>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
          {user.username ? (
            <Dropdown>
              <DropdownToggle as={Link} >
                <img
                  className="nav-user-avatar rounded-circle"
                  src={user.avatar_url}
                  alt="User avatar"
                />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => navigate(`/users/${user.username}/dashboard`)}>Dashboard</DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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