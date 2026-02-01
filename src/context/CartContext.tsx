import { createContext, useContext, useState } from "react";
import type { Cart } from "../types/Cart";

export const CartContext = createContext<Cart | null>(null);

export function useCartContext() {
    const context = useContext(CartContext);
    return context;
}

export function CartContextProvider({ children }) {
    const [cart, setCart] = useState(null);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}

