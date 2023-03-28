import React from "react";
import { useSelector } from "react-redux";
import Home from "./Home";

const Login = () => {
  const auth = useSelector((state) => state.auth.auth);
  return (
    <div className="container my-4">
      {!auth ? (
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              
            </label>
            <input type="password" className="form-control" id="password" />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default Login;
