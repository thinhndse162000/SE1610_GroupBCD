import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";

const NavLinks = ({ toggleSidebar }) => {
  const {
    member: { journalDetailId: journalId },
  } = useSelector((state) => state);

  const links = {
    author: [
      { id: 1, text: "papers", path: "/author", icon: <IoBarChartSharp /> },
      // TODO: line below
      // { id: 2, text: 'reviews', path: `paper-detail/:id`, icon: <MdQueryStats /> },
      {
        id: 2,
        text: "submit paper",
        path: "submit-paper",
        icon: <FaWpforms />,
      },
    ],

    member: [
      { id: 1, text: "search", path: "/", icon: <IoBarChartSharp /> },
      {
        id: 2,
        text: "journal",
        path: `journal/${journalId}`,
        icon: <IoBarChartSharp />,
        isActive: journalId === "" ? false : true,
      },
      {
        id: 3,
        text: "issues",
        path: `journal/${journalId}/issue`,
        icon: <IoBarChartSharp />,
        isActive: journalId === "" ? false : true,
      },
      {
        id: 4,
        text: "publications",
        path: `journal/${journalId}/publish`,
        icon: <IoBarChartSharp />,
        isActive: journalId === "" ? false : true,
      },
    ],

    reviewer: [
      { id: 1, text: "reviews", path: "/reviewer", icon: <IoBarChartSharp /> },
      {
        id: 2,
        text: "invitations",
        path: "invitation",
        icon: <MdQueryStats />,
      },
    ],

    manager: [
      { id: 1, text: "papers", path: "/manager", icon: <IoBarChartSharp /> },
      { id: 2, text: "invite", path: "invite", icon: <IoBarChartSharp /> },
    ],
  };

  const { viewType } = useSelector((state) => state.base);
  return (
    <div className="nav-links">
      {links[viewType].map((link) => {
        const { text, path, id, icon, isActive } = link;

        if (isActive == null || isActive) {
          return (
            <NavLink
              to={path}
              key={id}
              onClick={toggleSidebar}
              className="nav-link active"
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          );
        } else {
          return (
            <div key={id} className="nav-link inactive">
              {" "}
              <span className="icon">{icon}</span> {text}{" "}
            </div>
          );
        }
      })}
    </div>
  );
};

export default NavLinks;
