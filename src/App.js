import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Userprofile from "./components/Userprofile";
import Cart from "./components/Cart";
import Showm from "./components/Showm";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Showm />,
      },
      {
        path: "/smartphones",
        element: <Home key={"smartphones"} category={"smartphones"} />,
      },
      {
        path: "/laptops",
        element: <Home key={"laptops"} category={"laptops"} />,
      },
      {
        path: "/skincare",
        element: <Home key={"skincare"} category={"skincare"} />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/userprofile",
    element: <Userprofile />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
