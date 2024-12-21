import React, { useState } from "react";
import "../styles/styles.css";
import img1 from "../styles/images/TaskMaster.png";
import { NavLink, useNavigate } from "react-router";
export default function Registration() {
  const [showLogin, setShowLogin] = useState();
  const [showRegister, setShowRegister] = useState();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [cpassword, setCPassword] = useState();
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [loading, setLoading] = useState(false);

// console.log(JSON.parse(localStorage.getItem("userData")) || null)


  async function createTaskHandler(id) {
    const today = new Date();

    // Create a new Date object for tomorrow by adding 1 day
    const tomorrow = new Date(today);

    let newTask = {
      title: "Take a tour of TASKMASTER",
      description: "Master the act of TASKMASTER",
      dueDate: tomorrow.setDate(today.getDate() + 1),
      status: "to-do",
      priority: "medium",
      subtasks: [
        {
          title: "Register and Login to start using TASKMASTER",
          complete: true,
        },
        { title: "Get to know how to create new task", complete: false },
        { title: "Get to know how to edit task", complete: false },
      ], // Or you could pass in subtasks from the form
      // Make sure you're getting the user ID correctly
      createdBy: id, // or however you store user ID
    };

    // Log the data being sent
    console.log("Sending task data:", newTask);

    try {
      const token = localStorage.getItem("token"); // or however you store your token

      const response = await fetch(
        "https://taskmaster-apps.onrender.com/addTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newTask),
        }
      );

      // Log the full error response
      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to add task");
      }

      console.log("Task added successfully:", data);
      // fetchUserTasks();
      // setShowAddTask("hidden");
      // navigate("/user/dashboard");

      // Handle success
    } catch (error) {
      console.error("Detailed error:", error);
      // Show error to user
    }
  }

  async function handleRegister(e) {
    setLoading(true);
    setMsg("");
    e.preventDefault();

    if (password !== cpassword) {
      setLoading(false);
      setMsgColor("red");
      setMsg("Passwords do not match");
      return;
    }

    let firstname = firstName;
    let lastname = lastName;

    const newUser = { firstname, lastname, email, password };
    console.log(newUser);

    try {
      const response = await fetch(
        `https://taskmaster-apps.onrender.com/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setMsgColor("red");
        setMsg(data.message);
        throw new Error(data.message || "Registration failed");
      }
      setLoading(false);
      console.log("registration successful");
      console.log(data.id);
      setMsgColor("green");
      setMsg("You are now registered successfully");
      createTaskHandler(data.id);

      // this.showMessage(this.registerSuccess, 'Registration successful! Please login.');
      setTimeout(() => {
        // showLoginHandler();
        navigate("/taskmaster/login");
      }, 1500);
    } catch (error) {
      // this.showMessage(this.registerError, error.message);
      console.log(error.message);
      setLoading(false);
      setMsgColor("red");
      setMsg("Registration failed");
    }
  }

  return (
    <main>
      <div className={`sign-up`} id="registerForm">
        <div className="sign-up-x">
          <div className="sign-up-hero-x">
            <h1>Taskmaster</h1>
            <p>
              Streamline your workflow, boost productivity, and collaborate
              seamlessly with our intuitive task management platform.
            </p>
          </div>
          <div className="sign-up-form">
            <button
              className="cancel-btn"
              id="form-cancel-btn"
              onClick={() => {
                navigate("/");
              }}
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
            <h1>
              <span>Sign up for</span> Free
            </h1>
            <form id="registerFormElement" className="form add-task-form">
              <div className="sign-up-name-x">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="first-name"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="sign-up-name-x">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="last-name"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="sign-up-name-x">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="password-x">
                <div className="sign-up-name-x">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="sign-up-name-x">
                  <label htmlFor="password2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmpassword"
                    id="password2"
                    className="confirm-password"
                    placeholder="Confirm password"
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                </div>
              </div>
              <p className={`${msgColor}`}>{msg}</p>

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
                onClick={handleRegister}
              >
                Sign up
              </button>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "2px" }}
                id="showRegisterLink"
                onClick={() => navigate("/taskmaster/login")}
              >
                Already have an account? <NavLink>Login</NavLink>
              </div>
            </form>

            <h1 className="or">- OR -</h1>
            {/* <!-- sign in with google button --> */}
            <button className="google-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Sign in with Google
            </button>
            {/* <!-- sign in with face book button --> */}
            <button className="google-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  fill="#FFF"
                  d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"
                />
              </svg>
              Sign in with Facebook
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
