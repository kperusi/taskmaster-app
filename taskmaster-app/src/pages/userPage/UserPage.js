import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import './userpagestyle/userpagestyle.css'
import { useDispatch, useSelector } from "react-redux";
import { setShowMobiTaskBtn, setStoreTasks } from "../../store/taskSlice";

export default function UserPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [letter, setLetter] = useState("");
  const [showAddTask, setShowAddTask] = useState();
  const [subtasks, setSubtasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to-do");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [showSetting, setShowSettig] = useState("");
  const [currentSeletedItem, setCurrentSeletedItem] = useState("");
  const { params } = useParams();
  const mobiTaskBtn = useSelector((state) => state.tasks.showAddMobiTaskBtn);

  console.log(currentSeletedItem);
  const [selectedItem, setSelectedItem] = useState({
    dashboard: "dashboard-selected",
    task: "",
    calender: "",
  });
  const [svgColor, setSvgColor] = useState({
    dashboardColor: "white",
    taskColor: "blueviolet",
    calenderColor: "blueviolet",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")));

    if (window.location.pathname.endsWith("tasks")) {
      setSelectedItem({ dashboard: "", task: "task-selected", calender: "" });
      setSvgColor({
        dashboardColor: "blueviolet",
        taskColor: "white",
        calenderColor: "blueviolet",
      });
    }
    if (window.location.pathname.endsWith("calender")) {
      console.log("calender");
      setSelectedItem({
        dashboard: "",
        task: "",
        calender: "calender-selected",
      });
      setSvgColor({
        dashboardColor: "blueviolet",
        taskColor: "blueviolet",
        calenderColor: "white",
      });
    }

    if (window.location.pathname.endsWith("dashboard")) {
      console.log("calender");
      setSelectedItem({
        dashboard: "dashboard-selected",
        task: "",
        calender: "",
      });
      setSvgColor({
        dashboardColor: "white",
        taskColor: "blueviolet",
        calenderColor: "blueviolet",
      });
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setLetter("");
    } else setLetter(user.firstname?.toUpperCase()[0]);
  }, [user]);

  const showAddTaskFormHandler = (e) => {
    e.preventDefault();
    if (showAddTask === "show") {
      setShowAddTask("hidden");
    } else setShowAddTask("show");
  };

  async function fetchUserTasks() {
    try {
      const token = localStorage.getItem("token"); // Get stored token
      console.log(token);
      try {
        const response = await fetch(
          "https://taskmaster-apps.onrender.com/refresh-token",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token);
          console.log("Token refreshed successfully:", data.token);
        } else {
          console.error("Failed to refresh token:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }

      const response = await fetch(
        "https://taskmaster-apps.onrender.com/tasks",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        dispatch(setStoreTasks(JSON.parse(localStorage.getItem("tasks"))));
        if(data.error === 'Token is not valid'){
          localStorage.removeItem('token');
          navigate('/login');
        }
        throw new Error(data.message || "Failed to fetch tasks");
      }

      // Handle successful response
      if (data.success) {
        localStorage.setItem("tasks", JSON.stringify(data.tasks));
        dispatch(setStoreTasks(data.tasks));
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      dispatch(setStoreTasks(JSON.parse(localStorage.getItem("tasks"))));
      // Handle error (show error message to user)
    }
  }

  useEffect(() => {
    fetchUserTasks();
  }, []);

  // console.log(tasks);

  const createNewSubtask = function (e) {
    e.preventDefault();

    setSubtasks([...subtasks, { id: Date.now(), title: "", completed: false }]);
  };

  const setSubtaskTitle = (task, e) => {
    task.title = e.target.value;
  };

  const removeSubtask = function (task) {
    let newSubtasks = subtasks.filter(function (_task) {
      return _task.id !== task.id;
    });
    setSubtasks(newSubtasks);
  };

  async function createTaskHandler(e) {
    e.preventDefault();
    console.log(params);
    // Check if values are empty
    if (!title || !description) {
      console.error("Title and description are required");
      return;
    }

    let newTask = {
      title: title,
      description: description,
      dueDate: dueDate,
      status: status,
      priority: priority,
      subtasks: subtasks, // Or you could pass in subtasks from the form
      // Make sure you're getting the user ID correctly
      createdBy: user._id, // or however you store user ID
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
      fetchUserTasks();
      setShowAddTask("hidden");
      navigate("/user/dashboard");

      // Handle success
    } catch (error) {
      console.error("Detailed error:", error);
      // Show error to user
    }
  }

  const handleNavigate = (route) => {
    navigate(route);
  };
  const handleClick = (item, e) => {
    // dispatch(setShowSelection(item));
    dispatch(setShowMobiTaskBtn("show"));
    handleNavigate(item);
    setCurrentSeletedItem(item);
    if (item === "dashboard") {
      setSelectedItem({
        dashboard: "dashboard-selected",
        task: "",
        calender: "",
      });
      setSvgColor({
        dashboardColor: "white",
        taskColor: "blueviolet",
        calenderColor: "blueviolet",
      });
    }
    if (item === "tasks") {
      setSelectedItem({ dashboard: "", task: "task-selected", calender: "" });
      setSvgColor({
        dashboardColor: "blueviolet",
        taskColor: "white",
        calenderColor: "blueviolet",
      });
    }
    if (item === "calender") {
      setSelectedItem({
        dashboard: "",
        task: "",
        calender: "calender-selected",
      });
      setSvgColor({
        dashboardColor: "blueviolet",
        taskColor: "blueviolet",
        calenderColor: "white",
      });
    }
  };
  const handleShowSetting = () => {
    if (showSetting === "show") {
      setShowSettig("");
    } else {
      setShowSettig("show");
    }
  };

  async function logout() {
    try {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "https://taskmaster-apps.onrender.com/refresh-token",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token);
          console.log("Token refreshed successfully:", data.token);
        } else {
          console.error("Failed to refresh token:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }

      const response = await fetch(
        "https://taskmaster-apps.onrender.com/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Clear all auth-related data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        // Redirect to login page
        // window.location.href = "./home.html";
        setShowSettig("");
        navigate("/");
      } else {
        throw new Error(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);

      // Handle error (show error message to user)
    }
  }

  return (
    <main className="user-page-x">
      <section className="tool-bar">
        <div className="dashboard-logo-x">
          <h1 className="dashboard-logo">TASKMASTER</h1>
          <p>...Orgainizing your day</p>
        </div>

        <div className="user-image-x">
          <h1 className="first-letter">{letter}</h1>

          <h2 class="username">
            {user?.firstname} {user?.lastname}
          </h2>

          <button className="open-setting-btn" onClick={handleShowSetting}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7">
              <path
                fill="none"
                stroke="white"
                stroke-width="2"
                d="M1 1l4 4 4-4"
              />
            </svg>
          </button>
        </div>
        <button
          className={`mobi-add-task-btn ${mobiTaskBtn}`}
          onClick={showAddTaskFormHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#ffffff"
          >
            <path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" />
          </svg>{" "}
          New task
        </button>
        <div class={`setting ${showSetting}`}>
          <div className="setting-title">
            <h4>Settings </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#ffffff"
              onClick={handleShowSetting}
            >
              <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" />
            </svg>
          </div>

          <ul>
            <li>
              <button>Profile</button>
            </li>
            <li>
              <button>Account</button>
            </li>
            <li>
              <hr />
              <div className="logout-x">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28"
                  viewBox="0 -960 960 960"
                  width="28"
                >
                  <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z" />
                </svg>

                <button
                  style={{ color: "red" }}
                  className="logout"
                  onClick={logout}
                >
                  LogOut
                </button>
              </div>
            </li>
          </ul>
          <p style={{color:'black'}}>{user.email}</p>
        </div>
        <div class="search-add-btn-x">
          <div class="search-x">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            <input
              type="search"
              className="search-input"
              placeholder="Search"
            />
          </div>
          <button class="add-task-btn" onClick={showAddTaskFormHandler}>
            + Add New task
          </button>
        </div>

        {/* <!-- add task form *******************************************************************************************--> */}

        <section className={`taskmaster-form-x ${showAddTask}`}>
          <form
            className="add-task-form"
            action="post"
            onSubmit={createTaskHandler}
          >
            <h1>Add New Task</h1>
            <div>
              <label htmlFor="task-title" style={{ color: "black" }}>
                Title
              </label>
              <input
                type="text"
                className="task-title"
                id="task-title"
                name="task-title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="task-description" style={{ color: "black" }}>
                Description
              </label>
              {/* <!-- <input type="text" class="task-description" id="task-description" name="task-description" required > --> */}
              <textarea
                className="task-description"
                id="task-description"
                name="task-description"
                required
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <label htmlFor="subtask" style={{ color: "black" }}>
              Subtasks
            </label>
            {/* <!-- subtask input --> */}
            <div className="add-task-subtask" id="sub-task-x">
              {subtasks?.map((subtask, i) => (
                <div className="subtask-render-x">
                  <input
                    type="text"
                    name="task"
                    className="add-subtask-title-input"
                    placeholder={`Subtask${i}`}
                    onChange={(e) => setSubtaskTitle(subtask, e)}
                  />
                  <span onClick={() => removeSubtask(subtask)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#000000"
                    >
                      <path d="m332-285.33 148-148 148 148L674.67-332l-148-148 148-148L628-674.67l-148 148-148-148L285.33-628l148 148-148 148L332-285.33ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
            <button
              class="subtask-btn"
              id="add-subtask-btn"
              onClick={createNewSubtask}
            >
              + Add New Subtask
            </button>

            <div class="status-priority-x">
              <div class="task-input-status-x">
                <label for="status" style={{ color: "black" }}>
                  Status
                </label>
                <select
                  name="task-input-status"
                  class="task-input-status"
                  id="task-status-input"
                  disabled
                >
                  <option value="to-do">Todo</option>
                  <option value="in-progress">In-Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div class="task-input-status-x">
                <label for="status" style={{ color: "black" }}>
                  Priority
                </label>
                <select
                  name="task-input-status"
                  class="task-input-status"
                  id="task-priority-input"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low" selected>
                    Low
                  </option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <label style={{ color: "black" }}>Due Date</label>
            <input
              type="date"
              name="duedate"
              id="task-duedate"
              className="task-duedate"
              onChange={(e) => setDueDate(e.target.value)}
            />

            <button
              className="submit-btn"
              // onClick={(e)=>createTaskHandler(e)}
            >
              Create Task
            </button>
          </form>
        </section>
      </section>

      {/* <!-- side bar ********************************************** --> */}
      <section className="side-bar-content-x">
        <aside className="side-bar">
          <div className="side-bar-btn-x">
            <button
              className="side-bar-home-btn"
              onClick={() => {
                navigate("/");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill={`blueviolet`}
              >
                <path d="M480-512ZM160-160v-391.67l-80 61-39.67-53 439.67-337L920-544l-40 53.33-400-306-253.33 194v376h168V-160H160Zm446.33 80L446.67-240l46.66-47.67 113 113.67 227-226L880-353 606.33-80Z" />
              </svg>
              Home
            </button>

            <button
              className={`side-bar-dashboard-btn ${selectedItem.dashboard}`}
              onClick={() => handleClick("dashboard")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill={`${svgColor.dashboardColor}`}
              >
                <path d="M120-840h320v320H120v-320Zm80 80v160-160Zm320-80h320v320H520v-320Zm80 80v160-160ZM120-440h320v320H120v-320Zm80 80v160-160Zm440-80h80v120h120v80H720v120h-80v-120H520v-80h120v-120Zm-40-320v160h160v-160H600Zm-400 0v160h160v-160H200Zm0 400v160h160v-160H200Z" />
              </svg>
              Dashboard
            </button>
            <button
              className={`side-bar-task-btn ${selectedItem.task}`}
              id="task-btn"
              onClick={() => handleClick("tasks")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill={`${svgColor.taskColor}`}
              >
                <path d="m438-240 226-226-58-58-169 169-84-84-57 57 142 142ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
              </svg>
              Tasks
            </button>
            <button
              className={`side-bar-calender-btn ${selectedItem.calender}`}
              onClick={() => handleClick("calender")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill={`${svgColor.calenderColor}`}
              >
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm80 240v-80h400v80H280Zm0 160v-80h280v80H280Z" />
              </svg>
              Calender
            </button>
          </div>

          {/* <div class="theme-x">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z" />
            </svg>
          </div> */}
        </aside>

        <Outlet />
      </section>
    </main>
  );
}
