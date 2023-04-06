import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authaction } from "../store";

const Navbar = () => {
  const auth = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <nav
          className="navbar fixed-top navbar-expand-lg "
          style={{ background: "#9ed1c3"}}
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
              </ul>
            </div>

            {!auth ? (
              <Link className="btn btn-primary mx-1" to="/">
                Login
              </Link>
            ) : (
              <div>
                <Link
                  className="btn btn-primary"
                  onClick={() => {
                    localStorage.removeItem("authtoken");
                    localStorage.removeItem("userinfo");
                    dispatch(authaction.logout());
                  }}
                >
                  Logout
                </Link>
                <Link className="btn btn-primary mx-2" to="/userprofile">
                  useprofile
                </Link>
              </div>
            )}

            {!auth && (
              <Link className="btn btn-primary" to="signup" role="button">
                Signup
              </Link>
            )}
          </div>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
