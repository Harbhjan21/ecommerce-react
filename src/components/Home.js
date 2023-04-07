import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Productitem } from "./Productitem";
import Userprofile from "./Userprofile";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = (props) => {
  const auth = useSelector((state) => state.auth.auth);
  const [info, setinfo] = useState({});
  const [loading, setloading] = useState(true);
  const [product, setproduct] = useState({});
  const [limit, setlimit] = useState(7);
  const [page, setpage] = useState(1);
  const [total, settotal] = useState();

  const fetchmore = () => {
    setTimeout(() => {
      console.log(info.data);

      const productslice = info.data.products.slice(limit, limit + 7);

      const newproductslice = product.productslice.concat(productslice);

      console.log(newproductslice);

      const newdata = {
        productslice: newproductslice,
      };

      setproduct({
        ...product,
        ...newdata,
      });

      setlimit(limit + 7);
      setpage(page + 1);

      console.log(page);
    }, 1000);
  };

  useEffect(() => {
    async function check() {
      setloading(true);
      var data = await fetch(
        `http://localhost:3030/auth/product${props.category}`
      );

      data = await data.json();
      const update = {
        data: data.product,
      };

      settotal(data.product.limit);

      setinfo({
        ...info,
        ...update,
      });

      setloading(false);

      const productslice = data.product.products.slice(0, 7);
      console.log(productslice.length);

      const newdata = {
        productslice,
      };

      setproduct({
        ...product,
        ...newdata,
      });
    }

    check();
  }, []);

  console.log(product);

  return (
    <>
      {!loading && auth && (
        <div>
          <InfiniteScroll
            dataLength={product.productslice.length}
            next={fetchmore}
            hasMore={page <= Math.round(info.data.products.length / limit)}
            loader={
              <h1 style={{ textAlign: "center", fontSize: "28px" }}>
                Loding.....
              </h1>
            }
          >
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
