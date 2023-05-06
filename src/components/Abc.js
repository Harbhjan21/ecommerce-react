import React from "react";


const Abc = (props) => {
  return (
    <div
      style={{
        display: "inline-block",
        marginInline: "1%",
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
