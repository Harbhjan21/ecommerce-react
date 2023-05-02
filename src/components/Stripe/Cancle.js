import React from "react";

const Cancle = () => {
  return (
    <div
      style={{
        height: "500px",
        width: "500px",
        backgroundColor: "gray",
        marginLeft: "30%",
        textAlign: "center",
        padding: "150px",
      }}
    >
      <span style={{ display: "inline-block", fontSize: "20px" }}>
        <b> Cancle Payment</b>
      </span>
      <button
        style={{ display: "block", marginLeft: "40%", marginTop: "5px" }}
        className="btn btn-primary"
        onClick={() => window.location.assign("/cart")}
      >
        Retry
      </button>
    </div>
  );
};

export default Cancle;
