import logo from "../public/logo.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ logoutHandler }) {
  let navigate = useNavigate();

  return (
    <nav className="navbar relative sticky top-0 ">
      <div className="navbar-container container">
        <input type="checkbox" name="" id="qwe" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="menu-items">
          <li
            className="pt-2"
            onClick={() => {
              document.getElementById("qwe").click();
            }}
          >
            <Link to="/classroom">Classroom </Link>
          </li>
          <li
            className="pt-2"
            onClick={() => {
              document.getElementById("qwe").click();
            }}
          >
            <Link to="/about">About us</Link>
          </li>

          {!localStorage.getItem("token") ? (
            <li className="pt-1">
              <Link to="/login">
                <button
                  className="sm:rounded-lg md:rounded-full inline-block px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-lg leading-tight uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                  onClick={() => {
                    document.getElementById("qwe").click();
                  }}
                >
                  Login
                </button>
              </Link>
            </li>
          ) : (
            <>
              <li className="pt-1">
                <Link to="/">
                  <button
                    onClick={logoutHandler}
                    className="sm:rounded-lg md:rounded-full inline-block px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-lg leading-tight uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                  >
                    Logout
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
        <Link to="/">
          <img
            className="logo pt-2
             md:pt-0"
            src={logo}
            style={{ width: "200px" }}
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
