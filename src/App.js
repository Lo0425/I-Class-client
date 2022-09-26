import React, { useState } from "react";
import Navbar from "./partials/Navbar";
import Main from "./partials/Main";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./form/Login";
import Register from "./form/Register";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClassRoom from "./partials/ClassRoom";
import TeacherRoutes from "./TeacherRoutes";
import StudentClassroom from "./partials/StudentClassroom";
import StudentRoutes from "./StudentRoutes";
import ClassStudent from "./partials/ClassStudent";
import ClassTeacher from "./partials/ClassTeacher";
import AboutUs from "./partials/AboutUs";

function App() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setAuth(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  // window.onunload = () => {
  //   // Clear the local storage
  //   window.localStorage.clear();
  // };

  return (
    <>
      <Navbar logoutHandler={logoutHandler} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
            </>
          }
        />

        <Route element={<TeacherRoutes />}>
          <Route path="/classroom" element={<ClassRoom />} />
          <Route path="/class-teacher" element={<ClassTeacher />} />
        </Route>
        <Route element={<StudentRoutes />}>
          <Route path="/classroomStudent" element={<StudentClassroom />} />
          <Route path="/class-student" element={<ClassStudent />} />
        </Route>

        <Route path="/login" element={<Login setAuth={setAuth} />} />

        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
