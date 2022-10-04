import links from '../../utils/links'
import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";

const NavLinks = ({ toggleSidebar }) => {
  const { viewType } = useSelector((state) => state.base)
  return (
    <div className='nav-links'>
      {links[viewType].map((link) => {
        const { text, path, id, icon } = link

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks
