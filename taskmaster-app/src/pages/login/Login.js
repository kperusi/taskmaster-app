import React, { useState } from "react";
import "../login/loginstyle/loginstyle.css";
import img1 from "../../styles/images/TaskMaster.png";
import { NavLink, useNavigate } from "react-router";

export default function Login() {
  const [showLogin, setShowLogin] = useState();
  const [msg, setMsg] = useState();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [user, setUser] = useState({});
  const [msgColor, setMsgColor] = useState("");

  async function loginHandler(e) {
    e.preventDefault();
setLoading(true)
setMsg('')
    console.log(email, password);

    try {
      const response = await fetch(
        `https://taskmaster-apps.onrender.com/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log("data", data.user);
      console.log(data.token);

      localStorage.setItem("userData", JSON.stringify(data.user));

      if (!response.ok) {
        setLoading(false);
        setMsgColor("red");
        setMsg(data.error);
        throw new Error(data.message || "Login failed");
      }

      // Store token
      setLoading(false);
      console.log("login successful");
      localStorage.setItem("token", data.token);

      console.log("login successful! Redirecting...");
      setMsgColor("green");
      setMsg("Login successful!");
      setTimeout(() => {
        navigate("/user");
      }, 1500);
    } catch (error) {
      // this.showMessage(this.loginError, error.message);
      console.log(error.message);
      setLoading(false);
      setMsgColor("red");
      setMsg(error.message);
    }
  }

  return (
    <main className="login-main">
      <div className={`login`} id="loginForm">
        <div className="login-x">
          <div className="login-hero-x">
            <h1>Taskmaster</h1>
            <p>Welcome Back!</p>
          </div>

          <div className="login-form">
            <button
              className="cancel-btn"
              id="form-cancel-btn"
              onClick={() => navigate("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="grey"
              >
                <path d="m332-285.33 148-148 148 148L674.67-332l-148-148 148-148L628-674.67l-148 148-148-148L285.33-628l148 148-148 148L332-285.33ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z" />
              </svg>
            </button>

            <h1>Login</h1>

            <form id="loginFormElement" className="login-task-form">
              <div className="sign-up-name-x">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="loginEmail"
                  className="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="sign-up-name-x">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="password"
                  id="loginPassword"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="error-x">
                <p className={`error ${msgColor}`}>{msg}</p>
              </div>
              <section className="login-section-rw-2">
                {loading && (
                  <div className="login-loading">
                    <span></span>
                  </div>
                )}
              </section>

              <button
                type="submit"
                className="form-sign-up-btn"
                onClick={loginHandler}
              >
                Login
              </button>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "2px",paddingBottom:'20px' }}
                onClick={() => navigate("/taskmaster/register")}
              >
                Don't have an account? <NavLink>Register</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
