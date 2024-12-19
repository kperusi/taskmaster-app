import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../styles/taskstyle.css";

import { useSelector } from "react-redux";

export default function Task() {
  const navigate = useNavigate();
  // const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [todoTask, setTodoTask] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [overdueTask, setOverdueTask] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);
  const [taskInProgress, setTaskInProgress] = useState([]);
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState();
  const [upcomingTasks, setUpComingTask] = useState([]);
  const [todoCompletedSubtasks, setTodoCompletedSubtasks] = useState([]);

  const tasks =
    useSelector((state) => state.tasks.tasks) ||
    JSON.parse(localStorage.getItem("tasks"));
  console.log(tasks);

  const formatDate = function (date, format = "default") {
    const parsedDate = new Date(date.split("T")[0]);
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

  // useEffect(() => {
  //   console.log('task component is mounted')
  //   const fetchedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  //   const fetchedUser = JSON.parse(localStorage.getItem("userData")) || null;
  //   setTasks(JSON.parse(localStorage.getItem("tasks"))||fetchedTasks);
  //   setUser(fetchedUser);
  //   console.log(tasks);
  //   const today = new Date();
  //   const filterTasksByStatus = (status) =>
  //     fetchedTasks?.filter((task) => task.status === status);
  //   const filterTasksByDueDate = (comparator) =>
  //     fetchedTasks?.filter((task) => {
  //       const parsedDate = new Date(task.dueDate.split("T")[0]);
  //       return comparator(parsedDate, today);
  //     });
  //   setTaskInProgress(filterTasksByStatus("in-progress"));
  //   setTodoTask(filterTasksByStatus("to-do"));
  //   setCompletedTasks(filterTasksByStatus("completed"));
  //   setOverdueTask(filterTasksByDueDate((date, today) => date < today));
  //   setUpComingTask(filterTasksByDueDate((date, today) => date >= today));

  // }, []);

  useEffect(() => {
    console.log("mount");
    // const fetchedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const fetchedUser = JSON.parse(localStorage.getItem("userData")) || null;
    // setTasks(storeTasks);
    setUser(fetchedUser);
    const today = new Date();
    const filterTasksByStatus = (status) =>
      tasks?.filter((task) => task.status === status);
    const filterTasksByDueDate = (comparator) =>
      tasks?.filter((task) => {
        const parsedDate = new Date(task.dueDate.split("T")[0]);
        return comparator(parsedDate, today);
      });
    setTaskInProgress(filterTasksByStatus("in-progress"));
    setTodoTask(filterTasksByStatus("to-do"));
    setCompletedTasks(filterTasksByStatus("completed"));
    setOverdueTask(filterTasksByDueDate((date, today) => date < today));
  }, [tasks]);

  useEffect(() => {
    const filterTodoCompletedSubtasks = taskInProgress.map((task) =>
      task?.subtasks?.filter((subtask) => subtask.completed)
    );
    setTodoCompletedSubtasks(filterTodoCompletedSubtasks);
  }, []);

  console.log(todoCompletedSubtasks.length);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const calculateProgress = (task) => {
    return Math.floor(
      (task.subtasks.filter((s) => s.completed === true).length /
        task.subtasks.length) *
        100
    );
  };
  // console.log(tasks);
  return (
    <main className="task-main-container">
      <section>
        <div className="circle-title-x">
          <span className="todo-circle circle"></span>
          <h1>{`TODO (${todoTask.length})`}</h1>
        </div>

        {todoTask.map((task) => (
          <div
            key={task._id}
            className="todo-container"
            onClick={() => handleNavigate(`${task._id}`)}
          >
            <p className={`${task.priority}`}>{task.priority}</p>
            <h3>{task.title}</h3>
            <p style={{ color: "grey" }}>{task.description}</p>
            {/* <div className="row-1"></div> */}
            <div
              style={{
                marginTop: "25px",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <p>{`0 of ${task.subtasks.length} subtasks Done`}</p>
              <hr />
              <div style={{ display: "flex", gap: "5px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="17px"
                  viewBox="0 -960 960 960"
                  width="17px"
                  fill="grey"
                >
                  <path d="M482-120q-75 0-140.83-28.5-65.84-28.5-115-77.33Q177-274.67 148.5-340.5T120-481.33q0-75 28.5-140.17 28.5-65.17 77.67-113.67 49.16-48.5 115-76.66Q407-840 482-840q80.67 0 152.83 35 72.17 35 123.84 97v-102h66.66v218.67H606V-658h106.67q-43-52.67-102.67-84t-128-31.33q-122.33 0-208.83 84.16-86.5 84.17-86.5 205.84 0 123.66 85.83 210.16t209.5 86.5q118.33 0 201.83-81.33 83.5-81.33 88.17-199.33h67.33q-5 145.66-108.5 246.5Q627.33-120 482-120Zm118.67-195.33-153.34-152V-682H514v187.33l134 132-47.33 47.34Z" />
                </svg>
                <p>{formatDate(task.dueDate, "ordinary")}</p>
              </div>
            </div>


            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  border: "solid blueviolet 1px",
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    height: "6px",
                    width: `${calculateProgress(task)}%`,
                    backgroundColor: "blueviolet",
                    display: "block",
                  }}
                ></span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Progress</p>
                <p>{`${calculateProgress(task)}%`}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section>
        <div className="circle-title-x">
          <span className="in-progress-circle circle"></span>
          <h1>{`DOING (${taskInProgress.length})`}</h1>
        </div>
        {taskInProgress.map((task) => (
          <div
            key={task._id}
            className="in-progress-container todo-container"
            onClick={() => handleNavigate(`${task._id}`)}
          >
            <p className={`${task.priority}`}>{task.priority}</p>
            <h3>{task.title}</h3>
            <p style={{ color: "grey" }}>{task.description}</p>
            {/* <div className="row-1"></div> */}
            <div
              style={{
                marginTop: "25px",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <p>{`${
                task.subtasks.filter((s) => s.completed === true).length
              } of ${task.subtasks.length} Subtasks Done`}</p>

              <hr />

              <div
                style={{ display: "flex", gap: "4px", alignItems: "center" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="17px"
                  viewBox="0 -960 960 960"
                  width="17px"
                  fill="grey"
                >
                  <path d="M482-120q-75 0-140.83-28.5-65.84-28.5-115-77.33Q177-274.67 148.5-340.5T120-481.33q0-75 28.5-140.17 28.5-65.17 77.67-113.67 49.16-48.5 115-76.66Q407-840 482-840q80.67 0 152.83 35 72.17 35 123.84 97v-102h66.66v218.67H606V-658h106.67q-43-52.67-102.67-84t-128-31.33q-122.33 0-208.83 84.16-86.5 84.17-86.5 205.84 0 123.66 85.83 210.16t209.5 86.5q118.33 0 201.83-81.33 83.5-81.33 88.17-199.33h67.33q-5 145.66-108.5 246.5Q627.33-120 482-120Zm118.67-195.33-153.34-152V-682H514v187.33l134 132-47.33 47.34Z" />
                </svg>
                <p>{formatDate(task.dueDate, "ordinary")}</p>
              </div>
            </div>

            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  border: "solid blueviolet 1px",
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    height: "6px",
                    width: `${calculateProgress(task)}%`,
                    backgroundColor: "blueviolet",
                    display: "block",
                  }}
                ></span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Progress</p>
                <p>{`${calculateProgress(task)}%`}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className="completed-container">
        <div className="circle-title-x">
          <span className="completed-circle circle"></span>
          <h1>{`DONE (${completedTasks.length})`}</h1>
        </div>
        {completedTasks.map((task) => (
          <div key={task._id}>
            <p className={`${task.priority}`}>{task.priority}</p>
            <h3>{task.title}</h3>
            <p style={{ color: "grey" }}>{task.description}</p>
            <div className="row-1">
              <p className={`${task.priority}`}>{task.priority}</p>
              <div style={{ display: "flex", gap: "5px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#000000"
                >
                  <path d="M482-120q-75 0-140.83-28.5-65.84-28.5-115-77.33Q177-274.67 148.5-340.5T120-481.33q0-75 28.5-140.17 28.5-65.17 77.67-113.67 49.16-48.5 115-76.66Q407-840 482-840q80.67 0 152.83 35 72.17 35 123.84 97v-102h66.66v218.67H606V-658h106.67q-43-52.67-102.67-84t-128-31.33q-122.33 0-208.83 84.16-86.5 84.17-86.5 205.84 0 123.66 85.83 210.16t209.5 86.5q118.33 0 201.83-81.33 83.5-81.33 88.17-199.33h67.33q-5 145.66-108.5 246.5Q627.33-120 482-120Zm118.67-195.33-153.34-152V-682H514v187.33l134 132-47.33 47.34Z" />
                </svg>
                <p>{formatDate(task.dueDate, "ordinary")}</p>
              </div>
            </div>

            <div style={{ marginTop: "15px" }}>
              <p>{`${
                task.subtasks.filter((s) => s.completed === true).length
              } of ${task.subtasks.length} subtasks Completed`}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
