import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import { authaction, profileaction } from "../store";
import Showm from "./Showm";

const Login = () => {
  const auth = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  //console.log('prefinal')
  const handle = async () => {
    const response = await fetch("http://localhost:3030/auth/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const res = await response.json();

    if (!res.error) {
      dispatch(authaction.login());
      localStorage.setItem("authtoken", res.authtoken);
      localStorage.setItem("userinfo", JSON.stringify(res.profile));
      dispatch(profileaction.setprofile(res.profile));
    } else {
      alert(res.error);
    }
  };
  const change = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      console.log(token);
      dispatch(authaction.login());
    }
  }, []);
  return (
    <div className="container my-4">
      {!auth ? (
        <form>
          <div className="mb-3" style={{ marginTop: "70px" }}>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={change}
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={change}
              required
            />
          </div>

          <button type="button" onClick={handle} className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <Showm />
      )}
    </div>
  );
};

export default Login;
