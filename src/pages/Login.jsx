import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
  const { loginUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [warningMsg, setWarningMsg] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.message) {
      setLoginMsg(location.state.message);
    }
  }, [location.state]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username) {
      setWarningMsg("Please enter a username");
      return;
    }

    try {
      const response = await axios.get(`https://newsly-piuq.onrender.com/api/users/${username}`);
      loginUser(response.data.user);
      setUsername("");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setWarningMsg("Username not found");
        setUsername("");
      }
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
            setWarningMsg("");
          }}
          placeholder="Enter your username"
        />
        <input
          type="submit"
          className="btn btn-sm btn-outline-secondary"
          value="Login"
        />
        {warningMsg && (
          <p className="warning">
            <i className="fa-solid fa-triangle-exclamation"></i> {warningMsg}
          </p>
        )}
      </form>
    </div>
  );
};
