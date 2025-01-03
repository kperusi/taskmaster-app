import React, { useEffect, useState } from "react";
// import "../styles/styles.css";
// import '../styles/homepagestyle.css'
import './homepagestyle/homepagestyle.css'
import img1 from "../../styles/images/TaskMaster.png";
import { NavLink, useNavigate } from "react-router";
import Hambuger from "../Hambuger";
import MobileMenu from "../mobimenu/MobileMenu";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState();
  const [showRegister, setShowRegister] = useState();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [user, setUser] = useState({});
  const [mainDisplay, setMainDisplay] = useState(true);
  const [showMobiMenu, setShowMobiMenu] = useState("");

  const handleShowMobiMenu = () => {
    if (showMobiMenu === true) {
      setShowMobiMenu(false);
      setMainDisplay(true);
    } else {
      setShowMobiMenu(true);
    }
  };
  console.log(showMobiMenu);

  return (
    <main>
      

      <section className="container" id="app">
        <div className="page">
          <div className="home-main">
            <div className="home-tool-bar-x">
              <div className="tool-bar-x">
                <div className="logo-x">
                  <h1 className="logo">TASKMASTER</h1>
                  <p>...Orgainizing your day</p>
                </div>
                <nav className="non-mobi">
                  <Hambuger
                    user={user}
                    handleShowMobiMenu={handleShowMobiMenu}
                  />
                </nav>
                {showMobiMenu && <MobileMenu />}
                <div className="login-btn-x mobi">
                  <button
                    className="login-btn"
                    id="showLogin"
                    onClick={() => {
                      navigate("taskmaster/login");
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="sign-up-btn"
                    id="showRegister"
                    onClick={() => {
                      navigate("taskmaster/register");
                    }}
                  >
                    Start for free
                  </button>
                </div>
              </div>
              <div className="hero-x">
                <h1 className="hero">Organize Your Day-to-Day,</h1>
                <h1>
                  Manage Tasks with <span>Efficiency</span> and{" "}
                  <span>Ease</span>
                </h1>
                <h1 className="hero2">And You are 90% Done</h1>

                <p className="hero3">
                  Streamline your workflow, boost productivity,
                  {/* <br> */}
                  and collaborate seamlessly with our intuitive task management
                  platform.
                </p>
              </div>
            </div>

            <section className="home-section-two">
              <h1>Enjoy Seemless and Easy Navigation</h1>
              <div className="img-x">
                <img src={img1} alt="dashboard-image" />
              </div>

              <div className="hero-btn-x">
                <button className="learn-more">Learn More</button>
                <button
                  className="sign-up-btn"
                  onClick={() => {
                    navigate("taskmaster/register");
                  }}
                >
                  Start for free
                </button>
              </div>
            </section>

            <section className="home-section-three">
              <div className="section-three-title-x">
                <h1 className="section-three-title">
                  Everything You Need to Stay Organized
                </h1>
                <p>
                  Powerful features to help you manage tasks, collaborate with
                  your team, and achieve your goals.
                </p>
              </div>

              <div className="feature-card color1">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                  <path
                    fill="black"
                    d="M36.406 11.719c.648 0 1.172.524 1.172 1.172v24.765h1.25a1.172 1.172 0 110 2.344H1.172a1.172 1.172 0 110-2.344h1.25V24.61c0-.647.524-1.172 1.172-1.172H8.28c.648 0 1.172.525 1.172 1.172v13.047h2.344v-8.36c0-.646.524-1.171 1.172-1.171h4.687c.648 0 1.172.525 1.172 1.172v8.36h2.344V19.921c0-.647.524-1.172 1.172-1.172h4.687c.648 0 1.172.525 1.172 1.172v17.734h2.344V12.891c0-.648.524-1.172 1.172-1.172zm-1.172 2.344h-2.343v23.593h2.343V14.063zm-9.375 7.03h-2.343v16.563h2.343V21.094zm-9.375 9.376h-2.343v7.187h2.343V30.47zM7.11 25.78H4.766v11.875h2.343V25.781zM34.062 0a3.52 3.52 0 013.516 3.516 3.52 3.52 0 01-3.516 3.515c-.72 0-1.389-.217-1.947-.59l-4.073 3.055a3.52 3.52 0 01-3.355 4.567 3.496 3.496 0 01-1.514-.344l-4.689 4.688c.22.459.344.973.344 1.515a3.52 3.52 0 01-3.515 3.515 3.52 3.52 0 01-3.488-3.949l-3.45-1.724a3.503 3.503 0 01-2.438.986 3.52 3.52 0 01-3.515-3.516 3.52 3.52 0 013.515-3.515 3.52 3.52 0 013.488 3.949l3.45 1.725a3.503 3.503 0 013.952-.643l4.689-4.688a3.496 3.496 0 01-.344-1.515 3.52 3.52 0 013.515-3.516c.72 0 1.39.218 1.948.59l4.073-3.054A3.52 3.52 0 0134.063 0zm-18.75 18.75c-.646 0-1.171.526-1.171 1.172 0 .646.525 1.172 1.171 1.172.647 0 1.172-.526 1.172-1.172 0-.646-.525-1.172-1.172-1.172zm-9.374-4.688c-.647 0-1.172.526-1.172 1.172 0 .646.525 1.172 1.171 1.172.647 0 1.172-.526 1.172-1.172 0-.646-.525-1.171-1.171-1.171zm18.75-4.687c-.647 0-1.172.526-1.172 1.172 0 .646.525 1.172 1.172 1.172.646 0 1.171-.526 1.171-1.172 0-.646-.525-1.172-1.172-1.172zm9.375-7.031c-.647 0-1.172.526-1.172 1.172 0 .646.525 1.171 1.172 1.171.646 0 1.171-.525 1.171-1.171s-.525-1.172-1.172-1.172z"
                  />
                </svg>
                <h1>Task Management</h1>
                <p>
                  Create, organize, and track tasks with ease. Set priorities
                  and deadlines.
                </p>
              </div>

              <div className="feature-card color2">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                  <path
                    fill="black"
                    d="M19.968 0c11.01 0 19.969 8.958 19.969 19.968s-8.958 19.969-19.969 19.969C8.958 39.937 0 30.979 0 19.968 0 8.958 8.958 0 19.968 0zm7.805 35.579c-4.863-2.402-10.746-2.402-15.609 0a17.339 17.339 0 007.804 1.862 17.34 17.34 0 007.805-1.862zm-6.556-33.02V6.24H18.72V2.56a17.362 17.362 0 00-9.492 3.656l2.798 2.797-1.765 1.765L7.373 7.89a17.41 17.41 0 00-4.678 9.582h4.793v2.497H2.496c0 5.805 2.857 10.943 7.227 14.122 6.217-3.714 14.274-3.714 20.49 0 4.37-3.179 7.228-8.317 7.228-14.123h-4.992v-2.496h4.793a17.41 17.41 0 00-4.678-9.582l-2.888 2.888-1.765-1.765 2.798-2.797a17.362 17.362 0 00-9.492-3.657zm-2.437 8.292c.332-1.034 2.045-1.034 2.377 0 .635 1.978 3.804 11.955 3.804 14.11a4.997 4.997 0 01-4.993 4.992 4.997 4.997 0 01-4.992-4.992c0-2.155 3.17-12.132 3.804-14.11zm1.188 4.567c-1.233 4.047-2.496 8.522-2.496 9.543a2.5 2.5 0 002.496 2.496 2.5 2.5 0 002.497-2.496c0-1.02-1.263-5.496-2.497-9.543z"
                  />
                </svg>
                <h1>Team Collaboration</h1>
                <p>
                  Work together seamlessly with real-time updates and
                  communication.
                </p>
              </div>

              <div className="feature-card color3">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
                  <path
                    fill="black"
                    d="M46.608 6.02a.975.975 0 00-.927-.047l-7.624 3.591a8.283 8.283 0 00-4.728 6.837l-.196 2.436-3.95 6.561v-2.801c0-.01-.006-.017-.006-.027a.974.974 0 00-.046-.284l-1.838-5.514 3.753-7.504a.984.984 0 00-.099-1.03l-5.9-7.867a1.019 1.019 0 00-1.573 0L17.573 8.24a.984.984 0 00-.093 1.03l3.753 7.503-1.838 5.514a.974.974 0 00-.047.284v3.951l-6.127-9.299c-.007-.01-.02-.017-.026-.026a.995.995 0 00-.211-.215c-.02-.013-.036-.03-.056-.042-.02-.013-.022-.02-.035-.027l-3.605-2.085-1.497-2.271L5.628 9.27a.983.983 0 00-1.147-.386L.654 10.227a.983.983 0 00-.491 1.468l2.705 4.107 1.492 2.27.492 4.137a.36.36 0 00.01.04c.004.02.009.041.015.061a.973.973 0 00.116.295c.007.01.007.023.014.033.007.01 14.624 22.165 14.695 22.225A4.87 4.87 0 0024.255 48c.4 0 .8-.05 1.19-.145a4.886 4.886 0 003.028-2.235l13.08-21.698 2.065-1.307a8.343 8.343 0 002.66-2.721 8.259 8.259 0 001.18-4.651l-.383-8.42a.984.984 0 00-.467-.803zm-7.122 17.524l-1.522 2.527-5.054-3.048 1.524-2.527 5.052 3.048zM21.315 38.446V23.58h5.9v5.08l-5.9 9.786zm1.693-20.766h2.515l1.31 3.933h-5.136l1.31-3.933zm1.257-6.885a.983.983 0 110-1.966.983.983 0 010 1.966zm0-8.194l4.75 6.331-3.39 6.78h-.377v-3.13a2.95 2.95 0 10-1.966 0v3.13h-.376l-3.39-6.78 4.75-6.331zM10.53 17.818l-.29.19-3.621 2.387-.333-2.787a.982.982 0 00-.156-.424l-1.081-1.642L6.69 14.46l1.081 1.642a.988.988 0 00.329.31l2.429 1.406zm-6.122-6.826l1.2 1.822-1.642 1.082-1.475-2.232 1.917-.672zm5.249 9.755l2.458-1.624 7.233 10.972v10.726L7.193 22.371l2.464-1.624zm17.135 23.851a2.95 2.95 0 11-5.052-3.048l7.425-12.315h.017v-.027l2.712-4.499 2.527 1.526 2.53 1.52-10.16 16.843zm17.807-25.724a6.353 6.353 0 01-2.028 2.073l-1.747 1.107-2.852-1.717-2.852-1.717.162-2.065a6.318 6.318 0 013.604-5.213L45.18 8.38l.125 2.74a.973.973 0 00-.295.014l-2.382.59a5.986 5.986 0 00-4.425 4.524.983.983 0 001.919.43 4.032 4.032 0 012.977-3.043l2.297-.57.103 2.262a6.304 6.304 0 01-.9 3.548z"
                  />
                </svg>
                <h1>Progress Tracking</h1>
                <p>
                  Monitor project progress with intuitive charts and analytics.
                </p>
              </div>

              <div className="feature-card color4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40px"
                  viewBox="0 -960 960 960"
                  width="40px"
                  fill="#000000"
                >
                  <path d="M480-80q-139.67-35-229.83-161.5Q160-368 160-520v-240l320-120 320 120v240q0 152-90.17 278.5Q619.67-115 480-80Zm0-69.33q103-33.34 171-125.17T730.67-480H480v-328.33l-253.33 94.66V-520q0 11.67.33 19.67.33 8 2.33 20.33H480v330.67Z" />
                </svg>
                <h1>Security</h1>
                <p>
                  "Enterprise-grade security to keep your data safe and
                  protected.
                </p>
              </div>
            </section>

            <section className="home-section-four">
              <div className="section-four-title">
                <h1>What Our Users Say</h1>
                <p>Trusted by thousands of teams worldwide</p>
              </div>

              <div className="testimony-x">
                <div className="testimony-card">
                  <div className="svg-x">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="35px"
                      viewBox="0 -960 960 960"
                      width="35px"
                      fill="#F19E39"
                    >
                      <path d="m626.67-258-39-166.67 129-112-170-15L480-709v362l146.67 89ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="35px"
                      viewBox="0 -960 960 960"
                      width="35px"
                      fill="#F19E39"
                    >
                      <path d="m626.67-258-39-166.67 129-112-170-15L480-709v362l146.67 89ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="35px"
                      viewBox="0 -960 960 960"
                      width="35px"
                      fill="#F19E39"
                    >
                      <path d="m626.67-258-39-166.67 129-112-170-15L480-709v362l146.67 89ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </div>

                  <p>
                    TASKMASTER has transformed how our team collaborates. It's
                    incredibly intuitive and powerful.
                  </p>
                  <h4>Sarah Jones</h4>
                  <p>CEO homeMade</p>
                </div>

                <div className="testimony-card">
                  <div className="svg-x">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="35px"
                      viewBox="0 -960 960 960"
                      width="35px"
                      fill="#F19E39"
                    >
                      <path d="m626.67-258-39-166.67 129-112-170-15L480-709v362l146.67 89ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="35px"
                      viewBox="0 -960 960 960"
                      width="35px"
                      fill="#F19E39"
                    >
                      <path d="m626.67-258-39-166.67 129-112-170-15L480-709v362l146.67 89ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="35px"
                      viewBox="0 -960 960 960"
                      width="35px"
                      fill="#F19E39"
                    >
                      <path d="m626.67-258-39-166.67 129-112-170-15L480-709v362l146.67 89ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </div>

                  <p>
                    TASKMASTER has transformed how our team collaborates. It's
                    incredibly intuitive and powerful.
                  </p>
                  <h4>Alex Deckson</h4>
                  <p>CEO Giratee</p>
                </div>
              </div>
            </section>
            <footer>
              <div className="footer-content-x">
                <h1>Taskmaster</h1>

                <div>
                  <h3>Product</h3>
                  <ul>
                    <li>
                      <a href="#" className="link">
                        Features
                      </a>
                    </li>
                    <li>
                      <a href="#" className="link">
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a href="#" className="link">
                        Security
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3>Company</h3>
                  <ul>
                    <li>
                      <a href="#" className="link">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" className="link">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="link">
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3>Resources</h3>
                  <ul>
                    <li>
                      <a href="#" className="link">
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="link">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#" className="link">
                        Guides
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Contact</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="link">
                        Support
                      </a>
                    </li>
                    <li>
                      <a href="#" className="link">
                        Sales
                      </a>
                    </li>
                    <li>
                      <a href="#" className="link">
                        Partners
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="copy-right-x">
                <p>&copy; 2024 TaskFlow. All rights reserved.</p>
                <div>
                  <a href="#" className="link">
                    Privacy
                  </a>
                  <a href="#" className="link">
                    Terms
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}
