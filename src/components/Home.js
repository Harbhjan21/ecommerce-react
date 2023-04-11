import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Productitem } from "./Productitem";
import Userprofile from "./Userprofile";
import InfiniteScroll from "react-infinite-scroll-component";
import { authaction } from "../store";

const Home = (props) => {
  const auth = useSelector((state) => state.auth.auth);
  const alert = useSelector((state) => state.auth.alert);
  const query = useSelector((state) => state.profile.search);
  const dispatch = useDispatch();
  const [info, setinfo] = useState({});
  const [loading, setloading] = useState(true);
  const [product, setproduct] = useState({});
  const [limit, setlimit] = useState(7);
  const [page, setpage] = useState(1);
  const [total, settotal] = useState();

  const fetchmore = () => {
    setTimeout(() => {
      const productslice = info.data.slice(limit, limit + 7);

      const newproductslice = product.productslice.concat(productslice);

      const newdata = {
        productslice: newproductslice,
      };

      setproduct({
        ...product,
        ...newdata,
      });

      setlimit(limit + 7);
      setpage(page + 1);
    }, 1000);
  };

  useEffect(() => {
    async function check() {
      setloading(true);
      var data = await fetch(
        `http://localhost:3030/auth/product${props.category}`
      );

      data = await data.json();
      data = await data.product.products.filter((item) => {
        if (query == "") return item;
        if (
          item.title != "" &&
          item.title.toLowerCase().includes(query.toLowerCase())
        )
          return item;
      });
      const update = {
        data: data,
      };

      settotal(data.limit);

      setinfo({
        ...info,
        ...update,
      });

      setloading(false);

      const productslice = data.slice(0, 7);

      const newdata = {
        productslice,
      };

      setproduct({
        ...product,
        ...newdata,
      });
    }

    if (localStorage.getItem("authtoken")) {
      dispatch(authaction.login());
    }

    check();
  }, [query]);

  return (
    <>
      {!loading && auth && (
        <div>
          <InfiniteScroll
            dataLength={product.productslice.length}
            next={fetchmore}
            hasMore={page <= Math.round(info.data.length / limit)}
            loader={
              <h1 style={{ textAlign: "center", fontSize: "28px" }}>
                Loding.....
              </h1>
            }
          >
            {alert && (
              <div
                className="alert alert-success"
                style={{ marginTop: "8%" }}
                role="alert"
              >
                item added successfully
              </div>
            )}
            <div className="container" style={{ marginTop: "70px" }}>
              <div className="row">
                {product.productslice.map((item) => {
                  return <Productitem key={item.id} item={item} />;
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default Home;
