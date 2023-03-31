import React, { useState } from "react";


const Signup = () => {
  
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
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
      }),
    });

    const res = await response.json();

    if (!res.error) {
      localStorage.setItem("authtoken", res.authtoken);
      window.location.assign("/home");
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
  return (
    <div className="container my-4">
      <form id="form">
        <div className="mb-3">
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

        <button type="button" className="btn btn-primary" onClick={handle}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
