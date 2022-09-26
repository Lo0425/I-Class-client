import React, { useState, useEffect } from "react";
import plus from "../public/plus.png";
import logo from "../public/logoIcon.png";
import { toast } from "react-toastify";
import { checkAuth } from "../api/users";
import { useNavigate } from "react-router-dom";

const ClassStudent = () => {
  let navigate = useNavigate();

  let data = JSON.parse(localStorage.getItem("class"));
  let students = data.students;

  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState();

  const onGetScoreHistory = (e) => {
    e.preventDefault();
    fetch(
      `${process.env.REACT_APP_API_SERVER}/class/getScoreHistory/` +
        data.classCode,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.value,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.history.history.reverse());
      });
  };

  // students.sort((a, b) => {
  //   return a - b;

  // });
  students.sort((a, b) => {
    return b.score - a.score;
  });
  let highestScore = students[0].score;

  // for (let i = 0; i < students.length; i++) {
  //   console.log(students[i]);
  // }

  useEffect(() => {}, [score]);

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
                {students.map((student, x) => (
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

          <div className="md:grid-cols-6 pt-4 sm:grid-cols-4 flex grid grid-cols-1">
            {students.map((student, i) => (
              <div key={i} className="w-full ">
                <div className="pt-3 px-1 relative">
                  <button
                    type="button"
                    className="py-10 relative w-full border p-5 font-medium text-xs leading-tight uppercase rounded-3xl shadow-lg transition duration-150 ease-in-out bg-white-500 hover:scale-105 hover:bg-blue-300"
                    data-bs-toggle="modal"
                    data-bs-target={`#viewReport-${student._id}`}
                    value={student.email}
                    onClick={onGetScoreHistory}
                  >
                    {student.name}
                  </button>
                  <span className="absolute top-0 right-0 inline-block py-1.5 px-2.5 leading-none whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">
                    {student.score}
                  </span>
                  <div
                    className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                    id={`viewReport-${student._id}`}
                    tabIndex="-1"
                    aria-labelledby="exampleModalScrollableLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-scrollable modal-xl relative w-auto pointer-events-none">
                      <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-gray-200 rounded-t-md">
                          <h5
                            className="text-xl p-5 font-bold font-medium leading-normal text-gray-800"
                            id="exampleModalScrollableLabel"
                          >
                            {student.name}'s Report
                          </h5>
                          <button
                            type="button"
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body modal-xl relative p-4">
                          <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-4 lg:-mx-8">
                              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                  <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                      <tr>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                          Date
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                          Time
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                          Title
                                        </th>
                                        <th
                                          scope="col"
                                          className="text-center text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                          Point
                                        </th>
                                      </tr>
                                    </thead>
                                    {history.map((his, x) => (
                                      <tbody key={x}>
                                        <tr className="bg-gray-100 border-b">
                                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {his.date}
                                          </td>
                                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {his.time}
                                          </td>
                                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {his.pointTitle}
                                          </td>
                                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                            {his.pointsAdded}
                                          </td>
                                        </tr>
                                      </tbody>
                                    ))}
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                          <button
                            type="button"
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                          >
                            <i className="fa fa-download pr-2 pl-0" />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ClassStudent;
