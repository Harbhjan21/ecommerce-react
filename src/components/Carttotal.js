import React from "react";

const Carttotal = (props) => {
  const { length, total } = props;
  return (
    <div>
      <div className="card" style={{ width: "30rem" }}>
        <div className="card-header">PRICE DETAIL</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item" style={{ display: "inline-block" }}>
            Price({length} item){" "}
            <p
              style={{
                float: "right",
                display: "inline-block",
              }}
            >
              ${total}
            </p>
          </li>
          <li className="list-group-item" style={{ display: "inline-block" }}>
            Discount :{" "}
            <p
              style={{
                float: "right",
                display: "inline-block",
                color: "green",
              }}
            >
              0%
            </p>{" "}
          </li>
          <li className="list-group-item" style={{ display: "inline-block" }}>
            Delevery charges:
            <p
              style={{
                float: "right",
                display: "inline-block",
                color: "green",
              }}
            >
              free
            </p>
          </li>
        </ul>
        <div className="card-footer">
          <b>
            Total Price:{" "}
            <p
              style={{
                float: "right",
                display: "inline-block",
              }}
            >
              ${total}
            </p>
          </b>
        </div>
      </div>
      <button
        className="btn btn-primary"
        style={{ background: "orange", float: "right", marginTop: "1px" }}
      >
        Place Order
      </button>
    </div>
  );
};

export default Carttotal;
