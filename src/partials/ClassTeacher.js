import React, { useState, useEffect } from "react";
import plus from "../public/plus.png";
import logo from "../public/logoIcon.png";
import { toast } from "react-toastify";
import { checkAuth } from "../api/users";
import { useNavigate } from "react-router-dom";
import edit from "../public/edit.png";
import plus2 from "../public/plus2.png";
import Swal from "sweetalert2";
import moment from "moment";
import emailjs from "@emailjs/browser";

const ClassTeacher = () => {
  let navigate = useNavigate();
  let data = JSON.parse(localStorage.getItem("class"));
  let date = moment().format("MMMM Do YYYY");
  let time = moment().format("h:mm:ss a");
  let studentData = data.students;

  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(1);
  const [name, setName] = useState("");
  const [scoreSys, setScoreSys] = useState([]);
  const [students, setStudents] = useState([]);
  const [sScore, setSScore] = useState();
  const [show, setShow] = useState(true);

  let highestScore = 0;
  if (studentData.length > 0) {
    studentData.sort((a, b) => {
      return b.score - a.score;
    });
    highestScore = studentData[0].score;
  }

  const sendEmail = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Email sent",
      timer: 2000,
    });

    emailjs
      .sendForm(
        "service_rk19lll",
        "template_dzcfwlm",
        e.target,
        "QoLDQH_Da8Flz_h5Q"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  const Edit1 = () => {
    setShow(!show);
  };

  const getScoreSys = async () => {
    setIsLoading(true);
    let res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/class/getscoresys/` + data.classCode
    );
    let classRoom = await res.json();
    let scoreTable = classRoom.classroom.scoreSys;

    scoreTable.sort((a, b) => {
      return b.score - a.score;
    });

    setScoreSys(scoreTable);
    setStudents(classRoom.classroom.students);
    setIsLoading(false);
  };

  useEffect(() => {
    getScoreSys();
  }, [sScore]);

  const onChangeHandler = (e) => {
    setScore(e.target.value);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onAddScore = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(
      `${process.env.REACT_APP_API_SERVER}/class/addScore/` + e.target.value,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.id,
          title: e.target.name,
          classCode: data.classCode,
          date: date,
          time: time,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let type = data.status == 400 ? toast.error : toast.success;
        type(data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        setSScore(data);
        setIsLoading(false);
      });
  };

  const onDeleteHandler = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wont be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonColor: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${process.env.REACT_APP_API_SERVER}/class/delete-skill/` +
            e.target.id,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
              classCode: data.classCode,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: data.msg,
              showConfirmButton: true,
              timer: 2000,
            });
            getScoreSys();
          });
      }
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (name.length < 1) {
      toast.error("Reward title is empty", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } else {
      fetch(
        `${process.env.REACT_APP_API_SERVER}/class/add-skill/` + data.classCode,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: name,
            point: score,
          }),
        }
      )
        .then((res) => {
          getScoreSys();
          return res.json();
        })
        .then((data) => {
          let type = data.status == 400 ? toast.error : toast.success;
          type(data.msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
          });

          if (data.status != 400) {
            setName("");
            setScore(1);
            setShow(true);
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
        <div className="p-10 container ">
          <div className="flex justify-between">
            <h1 className="pl-3 font-medium leading-tight text-5xl mt-0 mb-2 text-black-600">
              {data.class}
            </h1>
            <button
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg  focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              Leaderboard
            </button>
            <div
              className="offcanvas offcanvas-start fixed bottom-0 flex flex-col max-w-full bg-white invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 left-0 border-none w-9/12"
              tabIndex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header flex items-center justify-between p-4">
                <h5
                  className="offcanvas-title mb-0 leading-normal font-semibold"
                  id="offcanvasExampleLabel"
                >
                  Leaderboard
                </h5>
                <button
                  type="button"
                  className="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body flex-grow p-4 overflow-y-auto">
                {studentData.map((student, x) => (
                  <div key={x} className="p-1 flex grid-cols-2 justify-between">
                    <p className="pr-3 w-2/12">{student.name}</p>
                    <div className="sm:w-7/12 md:w-9/12 lg:w-full w-6/12 bg-gray-200 rounded-full">
                      <div
                        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-1.5 leading-none rounded-l-full rounded-r-full"
                        style={{
                          maxWidth: { highestScore },
                          width: (student.score / highestScore) * 100 + "%",
                        }}
                      >
                        <p>{student.score}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:grid-cols-6 pt-4 sm:grid-cols-4 flex grid grid-cols-1 ">
            {students.map((student, x) => (
              <div key={x} className=" w-full ">
                <div className="pt-3 px-1 relative">
                  <button
                    type="button"
                    className="py-10 w-full h-24 p-5 border font-medium text-xs leading-tight uppercase rounded-3xl shadow-lg transition duration-150 ease-in-out bg-white-500 hover:scale-105 hover:bg-blue-300"
                    data-bs-toggle="modal"
                    data-bs-target={`#addScore-${student._id}`}
                  >
                    <h1>{student.name}</h1>
                  </button>
                  <span className="absolute top-0 right-0 inline-block py-1.5 px-2.5 leading-none whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">
                    {student.score}
                  </span>
                </div>
                <div
                  className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                  id={`addScore-${student._id}`}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable modal-xl relative w-auto pointer-events-none ">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                      <div className="modal-header flex flex-shrink-0 items-center justify-between p-4  border-gray-200 rounded-t-md">
                        <button
                          type="button"
                          className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            setShow(true);
                          }}
                        ></button>
                      </div>
                      <div
                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current pb-12"
                        key={x}
                      >
                        <h5 className="pb-3 mb-5 pl-3">
                          Give point to <b>{student.name}</b>
                          <p>current Score is: {student.score}</p>
                        </h5>
                      </div>
                      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-5 border-t border-gray-200 rounded-b-md">
                        <div className="flex flex-wrap w-full">
                          {scoreSys.map((scoreS, i) => (
                            <div
                              key={i}
                              className="relative md:w-3/12 w-6/12 p-1"
                            >
                              <button
                                onClick={(e) => {
                                  onAddScore(e);
                                }}
                                disabled={!show}
                                style={{ overflowWrap: "break-word" }}
                                className={`${
                                  !show
                                    ? " h-24 m-1 w-full border relative p-5 font-medium text-xs text-center leading-tight uppercase rounded-xl shadow-lg transition duration-150 ease-in-out bg-white-500 -z-100"
                                    : "h-24 m-1 w-full border relative p-5 font-medium text-xs leading-tight uppercase rounded-xl text-center shadow-lg transition duration-150 ease-in-out bg-white-500 hover:scale-105 -z-100"
                                }`}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                value={scoreS.score}
                                id={student.email}
                                name={scoreS.scoreName}
                              >
                                {scoreS.scoreName}
                                <span
                                  className={`${
                                    scoreS.score > 0
                                      ? "absolute rounded-full border-black top-0 right-0 py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-600 text-white rounded ml-2"
                                      : "absolute rounded-full border-black top-0 right-0 py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded ml-2"
                                  }`}
                                  hidden={!show}
                                >
                                  {scoreS.score}
                                </span>
                                <div
                                  className="absolute rounded-full border-black top-0 right-0 py-1 px-1.5 leading-none text-center whitespace-nowrap cursor-pointer align-baseline font-bold bg-red-600 text-white rounded ml-2 hover:scale-125"
                                  hidden={show}
                                  onClick={onDeleteHandler}
                                  id={scoreS._id}
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                >
                                  X
                                </div>
                              </button>
                            </div>
                          ))}
                        </div>

                        <button
                          className="sm:w-3/12 md:w-3/12 lg:w-2/12 w-4/12 border relative p-5 m-1 font-medium text-xs leading-tight uppercase rounded-xl shadow-lg transition duration-150 ease-in-out bg-white-500 hover:bg-blue-300"
                          type="button"
                          hidden={!show}
                          onClick={Edit1}
                        >
                          <div className="container">
                            <div className=" border rounded-full relative font-medium text-xs leading-tight uppercase  transition duration-150 ease-in-out border-blue-300 hover:scale-105">
                              <div className="m-3">
                                <img src={edit} className="" />
                              </div>
                            </div>
                          </div>
                          <p className="pt-3">Edit</p>
                        </button>

                        <button
                          className="sm:w-3/12 md:w-3/12 lg:w-2/12 w-4/12 border relative p-5 m-1 font-medium text-xs leading-tight uppercase rounded-xl shadow-lg transition duration-150 ease-in-out bg-white-500 hover:bg-blue-300"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#addSkill"
                          hidden={show}
                        >
                          <div className="container">
                            <div className=" border rounded-full relative font-medium text-xs leading-tight uppercase  transition duration-150 ease-in-out border-blue-300 hover:scale-105">
                              <div className="m-3">
                                <img className="" src={plus2} />
                              </div>
                            </div>
                          </div>
                          <p className="pt-3">Add Skills</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                  style={{ width: "800" }}
                  id="addSkill"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog relative w-auto pointer-events-none">
                    <form onSubmit={onSubmitHandler}>
                      <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-body relative p-4 flex justify-end">
                          <button
                            type="button"
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                              setShow(true);
                            }}
                          ></button>
                        </div>
                        <div className="modal-body relative pl-2 justify-center align-middle">
                          <h5 className="pb-3 pl-3">
                            Give point to {student.name}
                          </h5>
                        </div>
                        <div className="modal-body flex flex-shrink-0 flex-wrap items-center justify-between p-4 border-t border-gray-200 rounded-b-md mx-5">
                          <label>Name</label>
                          <input
                            className="form-control
                      block
                      w-10/12
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      my-2
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="e.g , On Task"
                            value={name}
                            required
                            onChange={onNameChange}
                          />

                          <label>Points</label>
                          <input
                            type="number"
                            className="form-control
                      block
                      w-10/12
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none my-2"
                            value={score}
                            onChange={onChangeHandler}
                          />
                        </div>
                        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md mx-5">
                          <button
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                className="overflow-hidden h-24 p-5 md:9/12 sm:w-full w-6/12 border relative m-3 font-medium text-xs leading-tight uppercase rounded-xl shadow-lg transition duration-150 ease-in-out bg-white-500 hover:bg-blue-300"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addStudent"
              >
                <div className="container flex justify-center">
                  <div className=" w-10 border rounded-full relative font-medium text-xs leading-tight uppercase  transition duration-150 ease-in-out border-blue-300 hover:scale-105">
                    <div className="m-3 flex justify-center">
                      <img className="object-cover" src={plus2} />
                    </div>
                  </div>
                </div>
              </button>

              <div
                className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="addStudent"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog relative w-auto pointer-events-none">
                  <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                      <h5
                        className="text-xl font-medium leading-normal text-gray-800"
                        id="exampleModalLabel"
                      >
                        Instruction to join Class
                      </h5>
                      <button
                        type="button"
                        className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div className="modal-body relative p-4">
                      <h4 className="font-medium leading-tight text-2xl mt-0 mb-2 text-black-600">
                        ClassCode
                      </h4>
                      <button className="w-full">
                        <h3
                          className="font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600 p-10 m-5 text-center hover:scale-125"
                          onClick={() => {
                            navigator.clipboard.writeText(data.classCode);
                            toast.success(data.classCode + " copied", {
                              position: "top-center",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                            });
                          }}
                        >
                          {data.classCode}
                        </h3>
                      </button>

                      <hr />
                      <h4 className="text-center pt-3">
                        Invite students thorugh their Email
                      </h4>
                      <form
                        onSubmit={sendEmail}
                        className="pt-2 flex justify-center"
                      >
                        <input
                          type="email"
                          className="form-control
                                      block
                                      w-9/12
                                      px-3
                                      py-1.5
                                      text-base
                                      font-normal
                                      text-gray-700
                                      bg-white bg-clip-padding
                                      border border-solid border-gray-300
                                      rounded
                                      transition
                                      ease-in-out
                                      m-0
                                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                        />
                        <input
                          name="teacherName"
                          defaultValue={data.teacherName}
                          hidden
                        />
                        <input
                          name="classCode"
                          defaultValue={data.classCode}
                          hidden
                        />
                        <button
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                    <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
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

export default ClassTeacher;
