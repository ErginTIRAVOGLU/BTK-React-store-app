


export interface  Cart  {
    id: string | string;
    customerId: string | string;
    cartItems: CartItem[];

};

export interface CartItem {
    id: string | string;
    product: ProductItem;
};

export interface ProductItem {
    productId: string;
    title: string;
    price: string;
    quantity: number;
    image: string;
};