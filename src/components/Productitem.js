import React from "react";

import { useRef } from "react";
import Modala from "./Modal";

export const Productitem = (props) => {
  const { item } = props;
  return (
    <div className=" container col-4 my-3">
      <div className="card" style={{ width: "18rem" }}>
        <img src={item.images[0]} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-text">{item.description}</p>

          <Modala item={item} />
        </div>
      </div>
    </div>
  );
};
