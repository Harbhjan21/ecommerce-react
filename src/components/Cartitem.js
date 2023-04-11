import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authaction } from "../store";

const Cartitem = (props) => {
  const { item } = props;
  const [reload, setreload] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("authtoken");

  const remove = async () => {
    var data = await fetch("http://localhost:3030/auth/cartdelete", {
      method: "post",
      headers: { "content-type": "application/json", token: token },
      body: JSON.stringify({ id: item._id }),
    });
    data = await data.json();
    if (data.success) dispatch(authaction.remove());
  };

  return (
    <>
      <li className="list-group-item">
        <div className="card" style={{ width: "35rem" }}>
          <img src={item.image} className="card-img-top" alt="..." />
          <div className="card-body">
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
                <b
                  onClick={remove}
                  style={{
                    float: "right",
                    border: "2px solid black",
                    padding: "2px",
                  }}
                >
                  RemoveItem
                </b>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </>
  );
};

export default Cartitem;
