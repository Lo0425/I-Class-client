import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "./api/users";

const TeacherRoutes = () => {
  const { isAuth, user } = checkAuth();
  return isAuth && user.data.teacher == true ? <Outlet /> : <Navigate to="/classroomStudent" />;
};

export default TeacherRoutes;
