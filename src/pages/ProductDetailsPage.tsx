import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import ProductItem from '../components/ProductItem';
import Loading from '../components/Loading';
import requests from '../api/apiClient';
import type { Product } from '../types/Product';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState<Product | null>(null);


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
    <ProductItem product={product} />
  )
}

export default ProductDetailsPage