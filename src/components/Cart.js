import React, { useEffect, useState } from "react";
import Cartitem from "./Cartitem";
import Carttotal from "./Carttotal";
import { useSelector } from "react-redux";
import Check from "./Check";
import Payment from "./Stripe/Payment";

const Cart = () => {
  const [data, setdata] = useState();
  const [pro, setpro] = useState(false);
  const [loading, setloading] = useState(true);
  const [total, settotal] = useState(0);
  const reload = useSelector((state) => state.auth.remove);
  const card = useSelector((state) => state.profile.card);

  const totalprice = () => {
    var ans = 0;
    if (data) {
      data.cart.map((item) => {
        ans = ans + parseInt(item.price);
      });
    }
    settotal(ans);
  };

  useEffect(() => {
    const fetchdata = async () => {
      setloading(true);
      const token = localStorage.getItem("authtoken");

      const response = await fetch("http://localhost:3030/auth/cartdetail", {
        method: "post",
        headers: {
          "content-type": "application/json",
          token: token,
        },
      });

      const data = await response.json();
      console.log(data);

      if (data.success == true) {
        const update = {
          cart: data.cart,
        };

        setdata({
          ...data,
          ...update,
        });
      } else {
        setpro(true);
        console.log("pro");
      }

      setloading(false);
    };

    fetchdata();
  }, [reload]);
  useEffect(() => {
    if (!loading) {
      totalprice();
    }
  }, [loading]);
  return (
    <>
      {pro ? (
        <Check />
      ) : card ? (
        <Payment />
      ) : (
        !loading &&
        !pro && (
          <div style={{ marginTop: "7%" }}>
            <div className="conatiner" style={{ display: "inline-block" }}>
              <div className="row">
                <div className="col">
                  <div className="card" style={{ width: "40rem" }}>
                    <ul className="list-group list-group-flush">
                      {data.cart.map((item) => {
                        return <Cartitem key={item._id} item={item} />;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="position-fixed"
              style={{
                display: "inline-block",
                marginTop: "9px",
                marginLeft: "10%",
              }}
            >
              {" "}
              <Carttotal length={data.cart.length} total={total} />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Cart;
