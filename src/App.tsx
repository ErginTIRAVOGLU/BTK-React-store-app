import { useEffect } from "react";
import requests from "./api/apiClient";
import { RouterProvider } from "react-router";
import { router } from "./router"; 
import { useDispatch } from "react-redux";
import { setCart } from "./pages/cart/cartSlice";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    requests.carts.getCart()
      .then(cart => dispatch(setCart(cart)))
      .catch(error => console.log("Error fetching cart:", error));
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
