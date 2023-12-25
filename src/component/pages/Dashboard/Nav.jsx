import React, { useState, useEffect } from "react";
import universityLogo from "../../../assets/university.png";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {FaUserAlt} from 'react-icons/fa';
import { AiOutlineHome, AiOutlineLogout, AiOutlineClose } from "react-icons/ai";
import { useNavigate,  } from "react-router-dom";
import { signOutUser } from "../../../redux/user/user";

import "./header.css"
import { useDispatch } from "react-redux";
function Nav() {
  const [toggleMenu, setToggleMenu] = useState(false);
  let pathname = window.location.pathname;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = ()=>{
    setTimeout(() => {
      dispatch(signOutUser());
      localStorage.clear();
      sessionStorage.clear();
    }, 3000);
    navigate('/login')
}

  return (
    <header>
      <div className="top">
        <div className="logo">
          <Link>
            <img src={universityLogo} alt="logo" />
          </Link>
        </div>
        <div className="hamburger-menu">
          {!toggleMenu && (
            <GiHamburgerMenu
              cursor="pointer"
              fontSize={27}
              className="hamburger"
              onClick={() => setToggleMenu(!toggleMenu)}
            />
          )}
          {toggleMenu && (
            <AiOutlineClose
              cursor="pointer"
              fontSize={27}
              className="close"
              onClick={() => setToggleMenu(false)}
            />
          )}
        </div>
      </div>
      <nav>
        <ul>
          <Link
            className={pathname === "/intern" ? "active" : ""}
            to="/intern"
          >
            <FaUserAlt />
            <li>Interns</li>
          </Link>

          <Link onClick={logout}>
          <AiOutlineLogout color="#fff"/>
          <li>Logout</li>
          </Link>
          {/* <Link
            className={pathname === "/interns" ? "active" : ""}
            to="/interns"
          >
            <FaUserAlt />
            <li>Interns</li>
          </Link> */}
          {/* <Link
            className={pathname === "/user" ? "active" : ""}
            to="/users"
          >
            <FaUserAlt />
            <li>Users</li>
          </Link> */}
        </ul>
        {/* <p onClick={logout}>
            <AiOutlineLogout color="#fff"/>
            <span>Logout</span>
        </p> */}
      </nav>
    </header>
  );
}

export default Nav;
