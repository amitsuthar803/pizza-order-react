// step1 import
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";

import { action as updateOrderAction } from "./features/order/UpdateOrder";

// function where we define our routes, we pass array of object where each object is 1  router
// this is imerative way 6.4
// this enable data fetching data loading with react router
const router = createBrowserRouter([
  {
    // this is technically called a layout route.
    element: <AppLayout />,
    // error handling
    errorElement: <Error></Error>,

    // define child route or nested route.
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        // 2) provide the loader
        loader: menuLoader,
        errorElement: <Error></Error>,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        // for post req on new form submmition
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error></Error>,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

// fetching data with react router loaders pizza menu. in 3 steps ->
// 1) create loader
// 2) provide the loader
// 3) we provide data to page

// loader are to read data and action are use to write data or to mutate data.
// action allow us to manage this remote server state using action function and forms. then we wire up
// to routes.
