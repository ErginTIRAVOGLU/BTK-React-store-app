import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Cart } from "../types/Cart";

export type CartContextValue = {
    cart: Cart | null;
    setCart: Dispatch<SetStateAction<Cart | null>>;
};

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within CartContextProvider");
    }
    return context;
}

export function CartContextProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart | null>(null);

    return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
}

