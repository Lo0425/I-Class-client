import React, { useState, useEffect } from "react";
import plus from "../public/plus.png";
import logo from "../public/logoIcon.png";
import { toast } from "react-toastify";
import { checkAuth } from "../api/users";
import { useNavigate } from "react-router-dom";
import OtpInput from "react18-input-otp";

const StudentClassroom = () => {
  let navigate = useNavigate();
  const [classRoom, setClassRoom] = useState([]);
  const { user } = checkAuth();
  const [otp, setOtp] = useState("");
  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  const [isLoading, setIsLoading] = useState(false);

  const getClasses = async () => {
    setIsLoading(true);
    let res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/class/find/` + user.data.email
    );
    let data = await res.json();
    setClassRoom(data.classroom);
    setIsLoading(false);
  };

  useEffect(() => {
    getClasses();
  }, []);

  let onSubmitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (otp.length < 6) {
      toast.error("Class code should be 6 digit", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } else {
      fetch(`${process.env.REACT_APP_API_SERVER}/class/join/` + otp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.data.email,
          name: user.data.name,
          score: 0,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          let type = data.status == 400 ? toast.error : toast.success;
          type(data.msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
          });
          if (data.status != 400) {
            localStorage.setItem("class", JSON.stringify(otp));
            setOtp("");
            navigate("/classroomStudent");
            setIsLoading(false);
          }
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="loader book">
            <figure className="page"></figure>
            <figure className="page"></figure>
            <figure className="page"></figure>
          </div>
          <h1 className="text-slate-700 text-center" id="loader-text">
            Loading ...
          </h1>
        </>
      ) : (
        <div className="md:grid-cols-3 sm:grid-cols-2 container flex grid grid-cols-1">
          {classRoom.map((classR, i) => (
            <div key={i} className="w-full ">
              <div className="pt-3 px-1">
                <button
                  type="button"
                  className=" h-48 relative w-full p-5 font-medium text-xs leading-tight uppercase rounded-3xl shadow-lg transition duration-150 ease-in-out"
                  onClick={() => {
                    navigate("/class-student");
                    localStorage.setItem("class", JSON.stringify(classR));
                  }}
                >
                  <p className="absolute left-0 right-0 font-bold">
                    {classR.class}
                  </p>
                </button>
              </div>
            </div>
          ))}

          <div className="w-full pt-3 px-1">
            <button
              type="button"
              className="p-5 h-48 w-full font-medium text-xs leading-tight uppercase rounded-3xl shadow-lg transition duration-150 ease-in-out"
              data-bs-toggle="modal"
              data-bs-target="#addClass"
            >
              <img src={plus} className="w-3/12 mx-auto hover:scale-110" />
              <p className="pt-5 font-bold">Join Class</p>
            </button>

            <div
              className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
              id="addClass"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
              onClick={() => setOtp("")}
            >
              <div className="modal-dialog relative w-auto pointer-events-none">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                  <div className="modal-body relative p-4 flex justify-center align-middle">
                    <img src={logo} className="w-3/12 mx-auto" />
                    <button
                      type="button"
                      className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body relative p-4 justify-center align-middle">
                    <h5 className="pb-3 text-center pr-3">
                      ENTER THE CLASS CODE
                    </h5>
                    <div>
                      <div className="flex justify-center">
                        <OtpInput
                          value={otp}
                          onChange={handleChange}
                          numInputs={6}
                          className="border rounded-lg mx-1 w-2/12 m-1 text-6xl"
                          inputStyle={{ textTransform: "uppercase" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                    <button
                      type="button"
                      className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                      data-bs-dismiss="modal"
                      onClick={() => setOtp("")}
                    >
                      Close
                    </button>
                    <button
                      onClick={onSubmitHandler}
                      className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      data-bs-dismiss="modal"
                    >
                      Join Class
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentClassroom;
