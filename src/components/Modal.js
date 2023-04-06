import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const Modala = (props) => {
  const { item } = props;
  console.log(item.title);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <div class="card" style={{ width: "18rem" }}>
            <div
              id="carouselExampleAutoplaying"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src={item.images[0]} class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={item.images[1]} class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={item.images[2]} class="d-block w-100" alt="..." />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>

            <div class="card-body">
              <h5 class="card-title">{item.title}</h5>
              <p class="card-text">{item.description}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <b>Discount: </b>
                {item.discountPercentage}%
              </li>
              <li class="list-group-item">
                <b>Rating: </b>
                {item.rating}
              </li>
              <li class="list-group-item">
                <b>Stock: </b>
                {item.stock}
              </li>
              <li class="list-group-item">
                <b>Price: </b>
                {item.price}$
              </li>
            </ul>
            <div class="card-body">
              <button type="button" class="btn btn-outline-info">
                BUY NOW
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="button" class="btn btn-outline-warning">
            ADD TO CART
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modala;
