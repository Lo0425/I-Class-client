import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "./api/users";

const StudentRoutes = () => {
  const { isAuth, user } = checkAuth();
  return isAuth && user.data.student == true ? <Outlet /> : <Navigate to="/" />;
};

export default StudentRoutes;
