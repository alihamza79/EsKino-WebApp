/* eslint-disable no-unused-vars */
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, signOutUser } from "../services/authService";
import {
  logo,
  baricon,
  baricon1,
  searchnormal,
  imguser,
  noteicon,
  user06,
  settingicon01,
  noteicon1,
} from "./imagepath";

const Header = () => {

  const [username, setUsername] = useState(""); 

  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUsername(user.displayName);
      // console.log(user);  // Assume user object has displayName or email
    }})

  const handlesidebarmobilemenu = () => {
    document.body.classList.toggle("slide-nav");
    document.getElementsByTagName("html")[0].classList.toggle("menu-opened");
    document
      .getElementsByClassName("sidebar-overlay")[0]
      .classList.toggle("opened");
  };

  const openDrawer = () => {
    const div = document.querySelector(".main-wrapper");
    if (div?.className?.includes("open-msg-box")) {
      div?.classList?.remove("open-msg-box");
    } else {
      div?.classList?.add("open-msg-box");
    }
  };

  useEffect(() => {
    const handleClick = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    const maximizeBtn = document.querySelector(".win-maximize");
    // maximizeBtn.addEventListener('click', handleClick);

    return () => {
      // maximizeBtn.removeEventListener('click', handleClick);
    };
  }, []);
  return (
    <div className="main-wrapper">
      <div className="header">
        <div className="header-left">
          <Link to="/admin-dashboard" className="logo">
            <img src={logo} width={35} height={35} alt="" /> <span>Eskino</span>
          </Link>
        </div>
        <Link id="toggle_btn" to="#" onClick={handlesidebar}>
          <img src={baricon} alt="" />
        </Link>
        <Link
          id="mobile_btn"
          className="mobile_btn float-start"
          to="#"
          onClick={handlesidebarmobilemenu}
        >
          <img src={baricon1} alt="" />
        </Link>
        <div className="top-nav-search mob-view">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
            />
            <Link className="btn">
              <img src={searchnormal} alt="" />
            </Link>
          </form>
        </div>

        <ul className="nav user-menu float-end">
          <li className="nav-item dropdown has-arrow user-profile-list">
            <Link
              to="#"
              className="dropdown-toggle nav-link user-link"
              data-bs-toggle="dropdown"
            >
              <div className="user-names">
                <h5>{username} </h5>
                <span>Admin</span>
              </div>
              <span className="user-img">
                <img src={user06} alt="Admin" />
              </span>
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/admin-dashboard">
                My Profile
              </Link>
              <Link className="dropdown-item" to="/admin-dashboard">
                Edit Profile
              </Link>
              <Link className="dropdown-item" to="/settingschangepassword">
                Change Password
              </Link>
              <Link onClick={()=> {signOutUser()}} className="dropdown-item" to="/login">
                Logout
              </Link>
            </div>
          </li>
        </ul>
        <div className="dropdown mobile-user-menu float-end">
          <Link
            to="#"
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-ellipsis-vertical" />
          </Link>
          <div className="dropdown-menu dropdown-menu-end">
            <Link className="dropdown-item" to="/profile">
              My Profile
            </Link>
            <Link className="dropdown-item" to="edit-profile.html">
              Edit Profile
            </Link>
            <Link className="dropdown-item" to="/settings">
              Settings
            </Link>
            <Link className="dropdown-item" to="/login">
              Logout
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Header;
