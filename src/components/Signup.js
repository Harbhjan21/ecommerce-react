import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authaction, profileaction } from "../store";
import Home from "./Home";

const Signup = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);

  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
    PhoneNo: "",
  });
  const handle = async () => {
    const response = await fetch("http://localhost:3030/auth/signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        username: data.username,
        PhoneNo: data.PhoneNo,
      }),
    });

    const res = await response.json();
    console.log(res.profile);

    if (!res.error) {
      localStorage.setItem("authtoken", res.authtoken);
      localStorage.setItem("userinfo", JSON.stringify(res.profile));
      dispatch(profileaction.setprofile(res.profile));
      dispatch(authaction.login());
    } else {
      alert(res.error);
      //hello
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
    <>
      {auth ? (
        <Home />
      ) : (
        <div className="container my-4">
          <form id="form">
            <div className="mb-3" style={{ marginTop: "70px" }}>
              <label htmlFor="username" className="form-label">
                UserName
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={change}
                value={data.username}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                onChange={change}
                className="form-control"
                name="email"
                value={data.email}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={change}
                value={data.password}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                PhoneNo
              </label>
              <input
                type="tel"
                className="form-control"
                name="PhoneNo"
                minLength={10}
                maxLength="10"
                onChange={change}
                value={data.PhoneNo}
                required
              />
            </div>

            <button type="button" className="btn btn-primary" onClick={handle}>
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
