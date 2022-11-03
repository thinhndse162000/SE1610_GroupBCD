import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'

const ManagerProtectedRoute = ({ children }) => {
  const { user, role }  = useSelector((state) => state.base)
  // if (!user) {
  //   return <Navigate to='/landing' />
  // }
  // if (role !== "MANAGER") {
  //   return <Navigate to='/error' />
  // }
  return children
}

export default ManagerProtectedRoute
