import React from "react";
import { useNavigate } from "react-router";
import "../styles/mobimenustyle.css";
import img1 from "../styles/images/undraw_good-team_zww8.png";
import img2 from "../styles/images/undraw_completed-tasks_1j9z.png"

export default function MobileMenu() {
  const navigate = useNavigate();

  return (
    <main className="mobi-menu-main">
      <section className="mobi-menu-content">
        {/* <div className="img2-x">
          <img src={img2} alt="undraw_good-team_zww8" />
        </div> */}
      <div className="mobi-hero-x">
        <h1 className="hero">Organize Your Day-to-Day,</h1>
        <h1>
          Manage Tasks with <span>Efficiency</span> and <span>Ease</span>
        </h1>
        <h1 className="hero2">And You are 90% Done</h1>

        <p className="hero3">
          Streamline your workflow, boost productivity,
          {/* <br> */}
          and collaborate seamlessly with our intuitive task management
          platform.
        </p>
        {/* </div> */}
      </div>

      <section className="mobi-section-two">
        <h1>Enjoy Seemless and Easy Navigation</h1>

        <div className="mobi-hero-btn-x">
          <button
            className="mobi-sign-up-btn"
            onClick={() => {
              navigate("taskmaster/register");
            }}
          >
            Start for free
          </button>
          <button
            className="mobi-login"
            onClick={() => {
              navigate("taskmaster/login");
            }}
          >
            Login
          </button>
        </div>
      </section>

      <div className="mobi-img-x">
        <img src={img1} alt="dashboard-image" />
      </div>
      </section>
      
    </main>
  );
}
