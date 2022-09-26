import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../public/logoIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    password2: "",
    teacher: false,
    student: false,
    parent: false,
  });

  const [viewPass, setViewPass] = useState(true);
  const [viewPass2, setViewPass2] = useState("password");

  let onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSelectHandler = (e) => {
    setUser({ ...user, [e.target.value]: true });
  };

  const roleOption = [
    {
      label: "Student",
      value: "student",
    },
    {
      label: "Teacher",
      value: "teacher",
    },
    {
      label: "Parent",
      value: "parent",
    },
  ];

  let onSubmitHandler = (e) => {
    e.preventDefault();
    if (user.username.length < 8) {
      toast.error("username should be more than 8", {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } else if (user.password.length < 8) {
      toast.error("password should be more then 8", {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } else if (user.password !== user.password2) {
      toast.error("password should be match", {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } else if (
      user.teacher == false &&
      user.student == false &&
      user.parent == false
    ) {
      toast.error("Please select your role", {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } else {
      fetch(`${process.env.REACT_APP_API_SERVER}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          let type = data.status == 400 ? toast.error : toast.success;
          type(data.msg, {
            position: "top-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
          });
          if (!data.code) {
            localStorage.setItem("users", JSON.stringify(user));
            navigate("/login");
          }

          e.preventDefault();
        });
    }
  };

  return (
    <div className="relative mt-5 pt-5">
      <form
        onSubmit={onSubmitHandler}
        method="POST"
        className="lg:w-4/12 md:w-6/12 sm:w-10/12 w-11/12 mx-auto m-10 p-10 border border-light rounded-2xl"
      >
        <div className="absolute top-0 left-0 w-screen mx-auto">
          <img
            src={logo}
            style={{ height: "120px" }}
            className="mx-auto z-10"
          />
        </div>
        <h1 className="text-center text-3xl font-bold pt-10">REGISTER</h1>
        <div className="form-control my-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="form-control my-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="form-control my-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="form-control my-3">
          <label>Password</label>

          <div className="flex relative">
            <input
              type={viewPass ? "password" : "text"}
              name="password"
              className="sm:text-sm bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "
              onChange={onChangeHandler}
              required
            />
            <button
              className="absolute mr-3 right-0 top-0 bottom-0"
              type="button"
              onClick={() => setViewPass(!viewPass)}
            >
              <FontAwesomeIcon icon={viewPass ? faEye : faEyeSlash} />
            </button>
          </div>
        </div>

        <div className="form-control my-3">
          <label>Confirm Password</label>
          <div className="relative">
            <input
              type={viewPass2 ? "password" : "text"}
              name="password2"
              className="bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              onChange={onChangeHandler}
              required
            />
            <button
              className="absolute mr-3 right-0 top-0 bottom-0"
              type="button"
              onClick={() => setViewPass2(!viewPass2)}
            >
              <FontAwesomeIcon icon={viewPass2 ? faEye : faEyeSlash} />
            </button>
          </div>
        </div>

        <div className="sm:flex justify-center form-control my-3 block">
          <p className="my-auto font-bold pr-3">I am a </p>
          <select
            name="role"
            className="
          px-2
          py-2.5
          bg-green-500
          font-bold
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-green-600 hover:shadow-lg
          focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-green-700 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap"
            onChange={onSelectHandler}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled hidden>
              Select your role
            </option>
            {roleOption.map((option, i) => (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex">
          <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Register
          </button>
          <a
            href="/login"
            className="my-auto ml-auto text-blue-400  text-right hover:text-violet-600"
          >
            I have an account
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
