import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authaction } from "../store";

const Modala = (props) => {
  const { item } = props;
  const [show, setShow] = useState(false);
  const [data, setdata] = useState({});
  const [alert, setalert] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlecart = async () => {
    const token = localStorage.getItem("authtoken");
    const cart = {
      title: item.title,
      rating: item.rating,
      price: item.price,
      image: item.images[0],
      discount: item.discountPercentage,
      stock: item.stock,
    };

    var data = await fetch("https://ecommerce-server-nodejs.vercel.app/auth/cart", {
      method: "post",
      headers: {
        "content-type": "application/json",
        token: token,
      },
      body: JSON.stringify(cart),
    });
    data = await data.json();
    if (data.success) {
      dispatch(authaction.alert());
      handleClose();
      setTimeout(() => {
        dispatch(authaction.alert());
      }, 2500);
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Detail
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DETAIL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ width: "18rem" }}>
            <div
              id="carouselExampleAutoplaying"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={item.images[0]}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={item.images[1]}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={item.images[2]}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <div className="card-body">
              <h5 className="card-title" id="title">
                {item.title}
              </h5>
              <p className="card-text">{item.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Discount: </b>
                {item.discountPercentage}%
              </li>
              <li className="list-group-item">
                <b>Rating: </b>
                {item.rating}
              </li>
              <li className="list-group-item">
                <b>Stock: </b>
                {item.stock}
              </li>
              <li className="list-group-item">
                <b>Price: </b>
                {item.price}$
              </li>
            </ul>
            <div className="card-body">
              <button type="button" className="btn btn-outline-info">
                BUY NOW
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={handlecart}
          >
            ADD TO CART
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modala;
