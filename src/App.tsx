import { useEffect } from "react";  
import requests from "./api/apiClient";
import { RouterProvider } from "react-router";
import { router } from "./router";

function App() {
  useEffect(() => {
    requests.carts.getCart()
      .then(cart => console.log(cart))
      .catch(error => console.log("Error fetching cart:", error));
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
