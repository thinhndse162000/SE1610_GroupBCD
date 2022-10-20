import Wrapper from "../../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Logo from "./Logo";
import { useState } from "react";
import { Link } from "react-router-dom";
import { changeView, toggleSidebar } from "../../context/service/utilService";
import { logoutUser } from "../../context/service/authService";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, role } = useSelector((state) => state.base);
  const dispatch = useDispatch();

  return (
    <Wrapper id="navbar" className="sticky">
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="navigation-link">
          {role === "MANAGER" ? (
            <Link
              to="/manager"
              onClick={(e) => dispatch(changeView("manager"))}
            >
              Manager
            </Link>
          ) : (
            <>
              <Link to="/" onClick={(e) => dispatch(changeView("member"))}>
                Home
              </Link>
              <Link
                to="/author"
                onClick={(e) => dispatch(changeView("author"))}
              >
                Author
              </Link>
              <Link
                to="/reviewer"
                onClick={(e) => dispatch(changeView("reviewer"))}
              >
                Reviewer
              </Link>
              <Link
                to="/Profile"
                onClick={(e) => dispatch(changeView("profile"))}
              >
                Profile
              </Link>
            </>
          )}
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(logoutUser())}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
