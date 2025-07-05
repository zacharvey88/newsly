import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
  const { loginUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    if (!username || !password) {
      setWarningMsg("Please enter both username and password");
      return;
    }

    try {
      const response = await axios.post(`https://newsly-piuq.onrender.com/api/users/login`, {
        username,
        password
      });
      loginUser(response.data.user);
      setUsername("");
      setPassword("");
      setWarningMsg("");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setWarningMsg("Invalid username or password");
      } else {
        setWarningMsg("Login failed. Please try again.");
      }
      setUsername("");
      setPassword("");
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>

                {loginMsg && (
                  <div className="alert alert-info mb-4">
                    <i className="fa-solid fa-triangle-exclamation me-2"></i> {loginMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="typeUsernameX-2"
                      className={`form-control form-control-lg ${warningMsg ? "is-invalid" : ""}`}
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setWarningMsg("");
                      }}
                      placeholder="Username"
                      autoFocus
                    />
                    <label className="form-label" htmlFor="typeUsernameX-2">Username</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className={`form-control form-control-lg ${warningMsg ? "is-invalid" : ""}`}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setWarningMsg("");
                      }}
                      placeholder="Password"
                    />
                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                  </div>

                  {warningMsg && (
                    <div className="alert alert-danger mb-4">
                      <i className="fa-solid fa-triangle-exclamation me-2"></i> {warningMsg}
                    </div>
                  )}

                  <button 
                    className="btn btn-primary btn-lg btn-block w-100" 
                    type="submit"
                    style={{ backgroundColor: "#345284", borderColor: "#345284" }}
                  >
                    Login
                  </button>
                </form>

                <hr className="my-4" />

                <button 
                  className="btn btn-lg btn-block w-100 mb-2" 
                  style={{ backgroundColor: "#dd4b39", borderColor: "#dd4b39" }}
                  type="button"
                >
                  <i className="fab fa-google me-2"></i> Sign in with Google
                </button>
                <button 
                  className="btn btn-lg btn-block w-100" 
                  style={{ backgroundColor: "#3b5998", borderColor: "#3b5998" }}
                  type="button"
                >
                  <i className="fab fa-facebook-f me-2"></i> Sign in with Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};