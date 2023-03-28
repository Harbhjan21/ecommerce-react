import Navbar from "./components/Navbar";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

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
    ],
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
