import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Shop from "./pages/Shop";
import HeaderUser from "./pages/HeaderUser";
import BookTable from "./pages/BookTable";

import UpDateUser from "./pages/UpDateUser";

import Search from "./pages/Search";
import AboutUs from "./pages/AboutUs";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/menu",
        element: <Menu />
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/booktable",
        element: <BookTable />
      },
      {
        path: "/login",
        element: <HeaderUser />
      },
      {

        path: "/update",

        element: <UpDateUser />
      },

{
        path: "/search",
        element: <Search />
      },
      {
        path: "/about",
        element: <AboutUs />
      }

    ]
  }
])

function App(){
  return (
    <RouterProvider router={router} />
  )
}
export default App;