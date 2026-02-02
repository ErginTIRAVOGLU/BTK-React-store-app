import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import ProductItem from '../components/ProductItem';
import Loading from '../components/Loading';
import requests from '../api/apiClient';
import type { Product } from '../types/Product';
import { useCartContext } from '../context/CartContext';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const {cart, setCart} = useCartContext();

  const cartItem = cart?.cartItems.find(item => item.product?.productId === product?.id);

  function handleAddItem(productId: string) {
    setIsAdding(true);
     requests.carts.addItem(productId)
       .then((cart) => setCart(cart))
       .catch((error) => console.log("Error adding item to cart:", error))
       .finally(() => setIsAdding(false));
  }

  useEffect(() => {
    async function fetchProduct() {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const productId = Number(id);
        if (isNaN(productId)) {
          throw new Error('Invalid product id');
        }
        const response = await requests.products.details(productId);
        setProduct(response); 
        
      } catch (error) {
        console.error('Error fetching product:', error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);
  
  if (loading) {
    return <Loading message="Loading product details..." />
  }

  if(!product) {
    return <div>Product not found.</div>
  }

  return (
    <ProductItem product={product} handleAddItem={handleAddItem} cartItem={cartItem} isAdding={isAdding} />
  )
}

export default ProductDetailsPage