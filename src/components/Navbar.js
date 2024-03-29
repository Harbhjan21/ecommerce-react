import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authaction, profileaction } from "../store";

const Navbar = () => {
  const auth = useSelector((state) => state.auth.auth);
  const [query, setquery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(profileaction.setsearch(query));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);
  return (
    <>
      <div>
        <nav
          className="navbar fixed-top navbar-expand-lg "
          style={{ background: "#9ed1c3" }}
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
            {auth && (
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="smartphones">
                      Smartphone
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link className="dropdown-item" to="laptops">
                      Laptop
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link className="dropdown-item" to="skincare">
                      Skincare
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="cart">
                          Cart
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <form className="d-flex mx-2" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    onChange={(e) => {
                      setquery(e.target.value);
                    }}
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            )}

            {!auth ? (
              <div>
                <Link className="btn btn-primary mx-1 btn-sm" to="/">
                  Login
                </Link>
                <Link
                  className="btn btn-primary btn-sm"
                  to="signup"
                  role="button"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    localStorage.removeItem("authtoken");
                    localStorage.removeItem("userinfo");
                    dispatch(authaction.logout());
                    window.location.assign("/");
                  }}
                >
                  Logout
                </Link>
                <Link className="btn btn-primary mx-2 btn-sm" to="/userprofile">
                  useprofile
                </Link>
              </div>
            )}
          </div>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
