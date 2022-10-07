import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'

const ManagerProtectedRoute = ({ children }) => {
  const role  = useSelector((state) => state.base.role)
  if (role !== "MANAGER") {
    return <Navigate to='/landing' />
  }
  return children
}

export default ManagerProtectedRoute
