import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileaction } from "../store";

const Userprofile = () => {
  console.log("hello");
  const dispatch = useDispatch();
  const [edit, setedit] = useState(false);
  const [no, seteno] = useState();
  const profile = useSelector((state) => state.profile);

  const handle = async () => {
    const res = await fetch("http://localhost:3030/auth/update", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: profile.email, no }),
    });
    const result = await res.json();
    console.log(result.profile.PhoneNo);
    if (result.success) {
      localStorage.setItem("userinfo", JSON.stringify(result.profile));
      dispatch(profileaction.setprofile(result.profile));
      setedit(false);
    } else {
      alert(result.error);
    }
  };
  useEffect(() => {
    var userinfo = localStorage.getItem("userinfo");
    userinfo = JSON.parse(userinfo);
    dispatch(profileaction.setprofile(userinfo));
  }, []);
  return (
    <>
      <div className="container text-center">
        <h1>Userprofile</h1>
      </div>

      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-black"
                    style={{ bordeRadius: ".5rem", borderRadius: ".5rem" }}
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                    <h5>{profile.username}</h5>

                    <i className="far fa-edit mb-5"></i>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>EMAIL</h6>
                          <p className="text-muted">{profile.email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          <p className="text-muted">
                            {edit ? (
                              <input
                                type="tel"
                                maxLength={10}
                                onChange={(e) => seteno(e.target.value)}
                              />
                            ) : (
                              profile.PhoneNo
                            )}
                            <>
                              {edit ? (
                                <button
                                  className="btn btn-link"
                                  onClick={handle}
                                >
                                  save
                                </button>
                              ) : (
                                <button
                                  className="btn btn-link"
                                  onClick={() => setedit(true)}
                                >
                                  edit
                                </button>
                              )}
                            </>
                          </p>
                        </div>
                      </div>
                      <h6>Linkes</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>instagram</h6>
                          <p className="text-muted">Lorem ipsum</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>youtube</h6>
                          <p className="text-muted">Dolor sit amet</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-start">
                        <a href="#!">
                          <i className="fab fa-facebook-f fa-lg me-3"></i>
                        </a>
                        <a href="#!">
                          <i className="fab fa-twitter fa-lg me-3"></i>
                        </a>
                        <a href="#!">
                          <i className="fab fa-instagram fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Userprofile;
