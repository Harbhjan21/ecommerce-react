import React from "react";
import { Overlay } from "react-bootstrap";

const Abc = (props) => {
  return (
    <div
      style={{
        display: "inline-block",
        marginInline: "3%",
      }}
    >
      <img height={400} width={500} src={props.url}></img>
      <button
        style={{ display: "block", margin: "10px" }}
        className="btn btn-outline-dark"
        onClick={() => {
          window.location.assign(props.product);
        }}
      >
        Explore Now
      </button>
    </div>
  );
};

export default Abc;
