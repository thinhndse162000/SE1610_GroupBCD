import { useSelector } from "react-redux";
import NavLinks from './NavLinks'
import Logo from './Logo'
import Wrapper from '../../assets/wrappers/BigSidebar'

const BigSidebar = () => {
  const { showSidebar, user } = useSelector((state) => state.base)
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
