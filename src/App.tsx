import { useContext, useEffect } from "react";  
import requests from "./api/apiClient";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { CartContext, useCartContext } from "./context/CartContext";

function App() {

  const  { setCart } = useCartContext();

  useEffect(() => {
    requests.carts.getCart()
      .then(cart => setCart(cart))
      .catch(error => console.log("Error fetching cart:", error));
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
