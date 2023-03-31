import react from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const auth = useSelector((state) => state.auth.auth);

  return auth && <div>Home</div>;
};

export default Home;
