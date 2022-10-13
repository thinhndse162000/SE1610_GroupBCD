import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Navbar, BigSidebar, SmallSidebar } from '../../components'
import { CHANGE_VIEW } from '../../context/actions'

const SharedLayout = ({ viewType }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: CHANGE_VIEW, payload: { viewType }})
  }, [viewType, dispatch])

  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout
