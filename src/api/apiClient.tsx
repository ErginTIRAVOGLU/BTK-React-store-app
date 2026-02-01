import axios from "axios";
import type { Product } from "../types/Product";
import { toast } from "react-toastify";
import { router } from "../router";
import type { Cart } from "../types/Cart";
 

axios.defaults.baseURL = "http://localhost:5001/";
axios.defaults.withCredentials = true;

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const { data, status } = error.response;
    switch (status) {
        case 400:
            toast.error("Bad request");
            break;
        case 401:
            toast.error("Unauthorized access");
            break;
        case 403:
            if(data.errors) {
                const errors = [];

                for (const key in data.errors) {
                    errors.push(data.errors[key]);
                }
                
                let result = { errors: errors, message: data.message}
                throw result;
            } else {
                toast.error("Forbidden resource");
            }
            break;
        case 404:
            router.navigate("/errors/not-found");
            break;
        case 500:
            router.navigate("/errors/server-error", {
                state: { error: data, status: status },
            });
            break;
        default:
            router.navigate("/errors/server-error", {
                state: { error: data, status: status },
            });
            break;
    }
    return Promise.reject(error.message);
});




const methods = {
    get<T>(url: string) {
        return axios.get<T>(url).then(res => res.data)
    },
    post<T>(url: string, body: {}) {
        return axios.post<T>(url, body).then(res => res.data)
    },
    put<T>(url: string, body: {}) {
        return axios.put<T>(url, body).then(res => res.data)
    },
    delete<T>(url: string) {
        return axios.delete<T>(url).then(res => res.data)
    },
};

const products = {
    list: () => methods.get<Product[]>('products'),
    details: (id: number) => methods.get<Product>(`products/${id}`),
};

const errors = {
    get400Error: () => methods.get('errors/bad-request').catch(err => { console.log(err) }),
    get401Error: () => methods.get('errors/unauthorized').catch(err => { console.log(err) }),
    get403Error: () => methods.get('errors/validation-error'),
    get404Error: () => methods.get('errors/not-found').catch(err => { console.log(err) }),
    get500Error: () => methods.get('errors/server-error').catch(err => { console.log(err) }),
    getValidationError: () => methods.get('errors/validation-error').catch(err => { console.log(err) }),
};

const carts = { 
    getCart: () =>  methods.get<Cart>('carts'),
    addItem: (productId: string, quantity = 1) => 
        methods.post<void>(`carts?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: string, quantity = 1) => 
        methods.delete<void>(`carts?productId=${productId}&quantity=${quantity}`),
};

const requests = {
    products,
    errors,
    carts,
};

export default requests;