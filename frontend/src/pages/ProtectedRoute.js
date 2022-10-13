import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, role } = useSelector((state) => state.base);
  // TODO: role manager redirect
  if (!user) {
    return <Navigate to="/landing" />;
  }
  if (role !== "MEMBER") {
    return <Navigate to="/error" />;
  }
  return children;
};

export default ProtectedRoute;
