import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  // const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [todoTask, setTodoTask] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [overdueTask, setOverdueTask] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [taskInProgress, setTaskInProgress] = useState([]);
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState();

  const taskProgressData = [
    { name: "Mon", completed: 5},
    { name: "Tue", completed: 7},
    { name: "Wed", completed: 4},
    { name: "Thu", completed: 8},
    { name: "Fri", completed: 6},
  ];

  
  const tasks =
    useSelector((state) => state.tasks.tasks) ||
    JSON.parse(localStorage.getItem("tasks"));

  console.log(JSON.parse(localStorage.getItem("tasks")));

  const currentHour = function () {
    let date = new Date();
    let hours = date.getHours();
    if (hours < 12) {
      setCurrentTimeOfDay("Good Morning");
    } else if (hours < 18) {
      setCurrentTimeOfDay("Good Afternoon");
    } else {
      setCurrentTimeOfDay("Good Evening");
    }
  };

  useEffect(() => {
    currentHour();
  }, []);

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

  useEffect(() => {
    console.log("mount");
    // const fetchedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const fetchedUser = JSON.parse(localStorage.getItem("userData")) || null;
    // setTasks(storeTasks);
    setUser(fetchedUser);
    const today = new Date();
    const filterTasksByStatus = (status) =>
      tasks?.filter((task) => task?.status === status);
    const filterTasksByDueDate = (comparator) =>
      tasks?.filter((task) => {
        const parsedDate = new Date(task.dueDate.split("T")[0]);
        return comparator(parsedDate, today);
      });
    setTaskInProgress(filterTasksByStatus("in-progress"));
    setTodoTask(filterTasksByStatus("to-do"));
    setCompletedTasks(filterTasksByStatus("completed"));
    setOverdueTask(filterTasksByDueDate((date, today) => date < today));
    setTodayTasks(filterTasksByDueDate((date, today) => date===today));
  }, [tasks]);

  console.log(todayTasks);
  // console.log(recentTasks);

  return (
    <main className="dashboard-main">
      <div>
        <div>
          <div className="dashboard-top-x ">
            <div className="name-salutation-x">
              <h1 className="dashboard-name">
                {" "}
                Hi! {user.firstname} {user.lastname}
              </h1>
              <h3 className="dashboard-salutation">{currentTimeOfDay}</h3>
            </div>
          </div>
          <div className="card-x">
            <div className="dashboard-total-task-x card">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#000000"
              >
                <path d="M230.67-160q-29.67 0-50.17-20.5T160-230.67q0-29.66 20.5-50.16 20.5-20.5 50.17-20.5 29.66 0 50.16 20.5 20.5 20.5 20.5 50.16 0 29.67-20.5 50.17T230.67-160ZM480-160q-29.67 0-50.17-20.5t-20.5-50.17q0-29.66 20.5-50.16 20.5-20.5 50.17-20.5t50.17 20.5q20.5 20.5 20.5 50.16 0 29.67-20.5 50.17T480-160Zm249.33 0q-29.66 0-50.16-20.5-20.5-20.5-20.5-50.17 0-29.66 20.5-50.16 20.5-20.5 50.16-20.5 29.67 0 50.17 20.5t20.5 50.16q0 29.67-20.5 50.17T729.33-160ZM230.67-409.33q-29.67 0-50.17-20.5T160-480q0-29.67 20.5-50.17t50.17-20.5q29.66 0 50.16 20.5 20.5 20.5 20.5 50.17t-20.5 50.17q-20.5 20.5-50.16 20.5Zm249.33 0q-29.67 0-50.17-20.5T409.33-480q0-29.67 20.5-50.17t50.17-20.5q29.67 0 50.17 20.5t20.5 50.17q0 29.67-20.5 50.17T480-409.33Zm249.33 0q-29.66 0-50.16-20.5-20.5-20.5-20.5-50.17t20.5-50.17q20.5-20.5 50.16-20.5 29.67 0 50.17 20.5T800-480q0 29.67-20.5 50.17t-50.17 20.5ZM230.67-658.67q-29.67 0-50.17-20.5T160-729.33q0-29.67 20.5-50.17t50.17-20.5q29.66 0 50.16 20.5 20.5 20.5 20.5 50.17 0 29.66-20.5 50.16-20.5 20.5-50.16 20.5Zm249.33 0q-29.67 0-50.17-20.5t-20.5-50.16q0-29.67 20.5-50.17T480-800q29.67 0 50.17 20.5t20.5 50.17q0 29.66-20.5 50.16-20.5 20.5-50.17 20.5Zm249.33 0q-29.66 0-50.16-20.5-20.5-20.5-20.5-50.16 0-29.67 20.5-50.17t50.16-20.5q29.67 0 50.17 20.5t20.5 50.17q0 29.66-20.5 50.16-20.5 20.5-50.17 20.5Z" />
              </svg>
              <p>Total Task</p>
              <h1 className="dashboard-total-task" id="dashboard-task-count">
                {tasks?.length}
              </h1>
            </div>

            <div className="dashboard-completed-task-x card">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#000000"
              >
                <path d="M120-120v-77.33L186.67-264v144H120Zm163.33 0v-237.33L350-424v304h-66.67Zm163.34 0v-304l66.66 67.67V-120h-66.66ZM610-120v-236.33L676.67-423v303H610Zm163.33 0v-397.33L840-584v464h-66.67ZM120-346.33v-94.34l280-278.66 160 160L840-840v94.33L560-465 400-625 120-346.33Z" />
              </svg>
              <p>Completed Task</p>
              <h1
                className="dashboard-completed-task"
                id="dashboard-completed-task"
              >
                {completedTasks?.length}
              </h1>
            </div>

            <div className="dashboard-progress-task-x card">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#000000"
              >
                <path d="M130.67-220 80-270.67l300-300L540-410l293.33-330L880-694 540-310 380-469.33 130.67-220Z" />
              </svg>
              <p>Task In Progress</p>
              <h1
                className="dashboard-progress-task"
                id="dashboard-progress-task"
              >
                {taskInProgress?.length}
              </h1>
            </div>

            <div className="dashboard-overdue-task-x card">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#000000"
              >
                <path d="M320-200q-117 0-198.5-81.5T40-480q0-117 81.5-198.5T320-760q33 0 63.83 7.33 30.84 7.34 58.17 21-14.33 11.34-26.67 24.17-12.33 12.83-24 26.83-16.66-6-34.5-9.33-17.83-3.33-36.83-3.33-88.33 0-150.83 62.16Q106.67-569 106.67-480q0 88.33 62.5 150.83 62.5 62.5 150.83 62.5 19 0 36.83-3.33 17.84-3.33 34.5-9.33 11.67 14 24 26.83 12.34 12.83 26.67 24.17-27.33 13.66-58.17 21Q353-200 320-200Zm320 0q-33 0-63.83-7.33-30.84-7.34-58.17-21 14.33-11.34 26.67-24.17 12.33-12.83 24-26.83 17 6 34.66 9.33 17.67 3.33 36.67 3.33 89 0 151.17-62.5 62.16-62.5 62.16-150.83 0-89-62.16-151.17Q729-693.33 640-693.33q-19 0-36.67 3.33-17.66 3.33-34.66 9.33-11.67-14-24-26.83-12.34-12.83-26.67-24.17 27.33-13.66 58.17-21Q607-760 640-760q117 0 198.5 81.5T920-480q0 117-81.5 198.5T640-200Zm-160-50q-57-39-88.5-100T360-480q0-69 31.5-130T480-710q57 39 88.5 100T600-480q0 69-31.5 130T480-250Z" />
              </svg>
              <p>Overdue Task</p>
              <h1 class="dashboard-overdue-task" id="dashboard-overdue-task">
                {overdueTask.length}
              </h1>
            </div>
          </div>

          <div className="recent-upcoming-x">
            <div className="recent-task" id="recent-task">
              <h3>Recently Added Task</h3>
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="recent-x">
                  <p>{task.title}</p>

                  <div className="recent-r-1">
                    <p className={`${task.priority}`}>{task.priority?.slice(0,1).toUpperCase()}{task.priority?.slice(1)}</p>
                   <hr/>
                    <p className="r-status">{task.status?.toUpperCase()}</p>
<hr/>
                    <div className="r-duedate">
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
                </div>
              ))}
            </div>

            <div className="upcoming-task">
              <h3>Weekly Progress</h3>

              {/* <div> */}
                {/* <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="pv"
                      fill="#8884d8"
                      activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                    <Bar
                      dataKey="uv"
                      fill="#82ca9d"
                      activeBar={<Rectangle fill="gold" stroke="purple" />}
                    />
                  </BarChart>
                </ResponsiveContainer> */}

                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={taskProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" stackId="a" fill="blueviolet" />
              
                  </BarChart>
                </ResponsiveContainer>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
