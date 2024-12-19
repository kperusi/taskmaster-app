import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setStoreTasks } from "../store/taskSlice";
import "../styles/singletaskstyle.css";

export default function SingleTask() {
  // const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [singleTask, setSingleTask] = useState({});
  const [formVisibility, setFormVisibility] = useState("hidden");
  const [displayVisibility, setDisplayVisibility] = useState("visible");
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [subtaskTilte, setsubtaskTilte] = useState();
  const [subtaskCompleted, setsubtaskCompleted] = useState();
  const [subtasks, setSubtasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const tasks = useSelector((state) => state.tasks.tasks);

  // const {tasks}=useOutletContext()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData")));
  }, []);

  console.log(user._id);

  const formatDate = function (date, format = "default") {
    const parsedDate = new Date(date?.split("T")[0]);
    // console.log(parsedDate.toDateString());
    switch (format) {
      case "ordinary":
        return parsedDate.toDateString();
      case "short":
        return parsedDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "2-digit",
        });
      case "long":
        return parsedDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      case "relative":
        const now = new Date();
        const diff_date = Math.ceil(((parsedDate - now) / 1000) * 60 * 60 * 24);
        if (diff_date === 0) return "Today";
        if (diff_date === -1) return "Yesterday";
        if (diff_date === 1) return "Tomorrow";
        if (diff_date > 0) return `In ${diff_date} days`;
        if (diff_date < 0) return `${Math.abs(diff_date)} days ago`;
        break;
      default:
        return parsedDate.toLocaleDateString();
    }
  };

  async function fetchSingleTask() {
    try {
      const token = localStorage.getItem("token"); // Get stored token
      console.log(">>", token);

      const response = await fetch(
        `https://taskmaster-apps.onrender.com/tasks/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(user._id),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tasks");
      }

      // Handle successful response
      if (data.success) {
        localStorage.setItem("singleTasks", JSON.stringify(data.task));
        setSingleTask(data.task);
        setSubtasks(data.task.subtasks);
        setTitle(data.task.title);
        setDescription(data.task.description);
        setDueDate(data.task.dueDate);
        setPriority(data.task.priority);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Handle error (show error message to user)
    }
  }

  async function fetchUserTasks() {
    try {
      const token = localStorage.getItem("token"); // Get stored token
      console.log(token);

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
        throw new Error(data.message || "Failed to fetch tasks");
      }

      // Handle successful response
      if (data.success) {
        localStorage.setItem("tasks", JSON.stringify(data.tasks));
        dispatch(setStoreTasks(data.tasks));
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Handle error (show error message to user)
    }
  }

  useEffect(() => {
    fetchSingleTask();
    setTitle(singleTask?.title);
    setDescription(singleTask?.description);
    setDueDate(singleTask?.dueDate);
    console.log("setting subtasks");
    // setSubtasks(singleTask?.subtasks);
  }, []);

  const handleFormVisibility = () => {
    if (formVisibility === "visible") {
      setFormVisibility("hidden");
    } else setFormVisibility("visible");

    if (displayVisibility === "visible") {
      setDisplayVisibility("hidden");
    } else setDisplayVisibility("visible");
  };

  console.log(singleTask.subtasks);
  console.log(subtasks);

  const handleSubtasksTitle = (index, e) => {
    console.log(index);
    console.log(subtasks[index]);
    setsubtaskTilte(e.target.value);
    subtasks[index].title = e.target.value;

    console.log(">>", subtasks[index].title);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubtaskComplete = (e, index) => {
    subtasks[index].completed = e.target.checked;
    console.log(e.target.checked);
    console.log(">>", subtasks);
  };

  async function handleEditSubmit(e) {
    e.preventDefault();

    // console.log(singleTask);

    let _title = title || singleTask.title;
    let _description = description || singleTask.description;
    let _dueDate = dueDate || singleTask.dueDate;
    let _priority = priority || singleTask.priority;
    let _subtasks = subtasks || singleTask.subtasks;

    console.log(_title, _description, _priority, _subtasks, _dueDate);

    try {
      const response = await fetch(
        `https://taskmaster-apps.onrender.com/tasks/${singleTask._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _title,
            _description,
            _dueDate,
            _priority,
            _subtasks,
          }),
        }
      );

      // localStorage.setItem("userData", JSON.stringify(data.user));

      if (!response.ok) {
        // Log the full error response
        const errorText = await response.text();
        console.error("Server error:", response.status, errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      if (response.ok) {
        const updatedTask = await response.json();
        // alert("Task updated successfully!");
        console.log("Updated task:", updatedTask);
        fetchSingleTask();
        fetchUserTasks()
      } else {
        console.log("Failed Updated task");
      }

      fetchSingleTask();
fetchUserTasks()
      // Store token
      // console.log("login successful");
      // localStorage.setItem("token", data.token);

      // this.showMessage(this.loginSuccess, 'Login successful! Redirecting...');
      setTimeout(() => {
        // router.navigateTo("/dashboard");
        handleFormVisibility();
      }, 1500);
    } catch (error) {
      // this.showMessage(this.loginError, error.message);
      console.log(error.message);
      // alert(`Update failed: ${error.message}`);
    }
  }

  async function handleSubtaskDelete(task, subtask) {
    try {
      const response = await fetch(
        `https://taskmaster-apps.onrender.com/tasks/${task._id}/subtasks/${subtask._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete subtask");
      }

      const data = await response.json();
      console.log(data.message);
      // fetchUserTasks();
      return data.task;
    } catch (error) {
      console.error("Delete subtask error:", error);
      throw error;
    }
    // displaySingleTask(singleTask);
  }

  async function handleSingleTaskDelete(task) {
    try {
      const response = await fetch(
        `https://taskmaster-apps.onrender.com/tasks/${task._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete subtask");
      }

      const data = await response.json();
      console.log(data.message);
      fetchUserTasks();
      navigate("/user/tasks");
      return data.task;
    } catch (error) {
      console.error("Delete task error:", error);
      throw error;
    }
  }

  console.log(dueDate?.split("T")[0])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="single-task-x">
      <div className="single-task-btn-x">
        <button
          onClick={() => navigate("/user/tasks")}
          className="single-task-close-btn"
        >
          x
        </button>

        <div className="edit-del-x">
          <span
            className="del-btn"
            onClick={() => {
              handleSingleTaskDelete(singleTask);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="35px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#ffffff"
            >
              <path d="m366-299.33 114-115.34 114.67 115.34 50-50.67-114-115.33 114-115.34-50-50.66L480-516 366-631.33l-50.67 50.66L430-465.33 315.33-350 366-299.33ZM267.33-120q-27 0-46.83-19.83-19.83-19.84-19.83-46.84V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-425.34 0v553.33V-740Z" />
            </svg>
          </span>

          <div
            className={`${displayVisibility}`}
            onClick={handleFormVisibility}
          >
            <span className="edit-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="35px"
                fill="#ffffff"
              >
                <path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z" />
              </svg>
            </span>
          </div>

          <div
            className={`${formVisibility}`}
            onClick={handleEditSubmit}
            aria-label="Edit task save button"
          >
            <span className={`save-btn `}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#ffffff"
              >
                <path d="M379.33-244 154-469.33 201.67-517l177.66 177.67 378.34-378.34L805.33-670l-426 426Z" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <section className={`single-task ${displayVisibility}`}>
        <div className="single-task-title-x">
          <h1>{singleTask?.title}</h1>
          <p>{singleTask?.description}</p>
        </div>

        <div className="row-1">
          <div className="col-1">
            <p style={{ color: "gray" }}>Due Date</p>

            <p style={{ display: "flex", gap: "5px" }}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#000000"
              >
                <path d="M482-120q-75 0-140.83-28.5-65.84-28.5-115-77.33Q177-274.67 148.5-340.5T120-481.33q0-75 28.5-140.17 28.5-65.17 77.67-113.67 49.16-48.5 115-76.66Q407-840 482-840q80.67 0 152.83 35 72.17 35 123.84 97v-102h66.66v218.67H606V-658h106.67q-43-52.67-102.67-84t-128-31.33q-122.33 0-208.83 84.16-86.5 84.17-86.5 205.84 0 123.66 85.83 210.16t209.5 86.5q118.33 0 201.83-81.33 83.5-81.33 88.17-199.33h67.33q-5 145.66-108.5 246.5Q627.33-120 482-120Zm118.67-195.33-153.34-152V-682H514v187.33l134 132-47.33 47.34Z" />
              </svg>{" "}
              {formatDate(singleTask.dueDate, "ordinary")}
            </p>
          </div>

          <div className="col-1">
            <p style={{ color: "gray" }}>Status</p>

            <p>{singleTask.status}</p>
          </div>
          <div className="col-1">
            <p style={{ color: "gray" }}>Priority</p>

            <p className={`${singleTask.priority}`}>{singleTask.priority}</p>
          </div>
        </div>

        <div className="subtasks-x">
          <h3
            style={{ textAlign: "left" }}
          >{`Subtasks (${singleTask.subtasks?.length})`}</h3>
          {singleTask.subtasks?.map((subtask) => (
            <div className="subtask" key={subtask._id}>
              <p className={`${subtask.completed}`}>{subtask.title}</p>
              <input type="checkbox" checked={subtask.completed} />
          
            </div>
           
          ))}
            
        </div>

        <div className="createdBy-x">
          <p>{singleTask.createdBy?.email}</p>
          <p>
            <span>Last Updated </span>{" "}
            {formatDate(singleTask?.updatedAt, "ordinary")}
            {}
          </p>
        </div>
      </section>
      {/* edit form*******************************************************************************88 */}

      <section className={`single-task ${formVisibility}`}>
        <form className="edit-form">
          <div className="single-task-title-x">
            <p>Title</p>
            <input
              className="edit-input-title"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <p>Description</p>
            <textarea
              className="desc-input"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="row-1 form-row-1">
            <div className="col-1">
              <p style={{ color: "gray" }}>Due Date</p>

              <input
                className="due-date-input"
                type="date"
                name="due-date"
                value={dueDate?.split("T")[0]}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="col-1">
              <p style={{ color: "gray" }}>Status</p>

              <p>{singleTask.status}</p>
            </div>

            <div className="col-1">
              <p style={{ color: "gray" }}>Priority</p>
              <select className="edit-select" onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="subtasks-x">
            <h3
              style={{ textAlign: "left" }}
            >{`Subtasks (${singleTask.subtasks?.length})`}</h3>
            {singleTask.subtasks?.map((subtask, i) => (
              <div className="edit-subtask" key={subtask._id}>
                <input
                  type="checkbox"
                  onChange={(e) => handleSubtaskComplete(e, i)}
                  checked={subtasks[i].completed}
                />
                <input
                  className="edit-subtask-title"
                  type="text"
                  name="edit-subtask"
                  value={subtasks[i].title}
                  onChange={(e) => handleSubtasksTitle(i, e)}
                  // onInput={(e)=>handleSubtasksTitle(i)}
                />
                <span
                  className="del-subtask"
                  onClick={() => handleSubtaskDelete(singleTask, subtask)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="33px"
                    viewBox="0 -960 960 960"
                    width="33px"
                    fill="#aaaaaa"
                  >
                    <path d="m332-285.33 148-148 148 148L674.67-332l-148-148 148-148L628-674.67l-148 148-148-148L285.33-628l148 148-148 148L332-285.33ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z" />
                  </svg>
                </span>
              </div>
            ))}
            <span className="edit-add-subtask">+</span>
          </div>

          <div className="createdBy-x">
            <p>{singleTask.createdBy?.email}</p>
            <p>
              <span>Last Updated </span>{" "}
              {formatDate(singleTask?.updatedAt, "ordinary")}
              {}
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
