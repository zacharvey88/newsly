import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
  const [hidden, setHidden] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [warningMsg, setWarningMsg] = useState(false);
  const [loginMsg, setLoginMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (location.state && location.state.message) {
      setLoginMsg(location.state.message); 
    }
  }, [location.state]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) {
      setWarningMsg("Please enter a username");
      return;
    } else {
      axios
        .get(`https://nc-news-ngma.onrender.com/api/users/${username}`)
        .then((response) => {
          setUser(response.data.user);
          setHidden(true);
          setUsername("");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setWarningMsg("Username not found");
            setHidden(false);
            setUsername("");
          }
        });
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        {loginMsg && (
          <p className="login-msg">
            <i className="fa-solid fa-triangle-exclamation"></i> {loginMsg}
          </p>
        )}
        <input
          autoFocus
          id="login-username"
          name="username"
          className={warningMsg ? "warning-border" : null}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setWarningMsg(false);
          }}
          placeholder="Enter your username"
        ></input>
        <input
          type="submit"
          className={"btn btn-sm btn-outline-secondary"}
          value="Login"
        ></input>
        <div className="login-error-msgs">
          {warningMsg && (
            <p className="warning">
              <i className="fa-solid fa-triangle-exclamation"></i> {warningMsg}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
