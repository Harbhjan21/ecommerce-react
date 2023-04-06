import React from "react";
import Modal from "./Modal";

export const Productitem = (props) => {
  return (
    <div className=" container col-4 my-3">
      <div className="card" style={{ width: "18rem" }}>
        <img src={props.item.images[0]} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.item.title}</h5>
          <p className="card-text">{props.item.description}</p>

          <Modal item={props.item} />
        </div>
      </div>
    </div>
  );
};
