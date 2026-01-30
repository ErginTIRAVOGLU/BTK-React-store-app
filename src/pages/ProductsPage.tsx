import React, { useEffect, useState } from 'react'
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';
import requests from '../api/apiClient';
import type { Product } from '../types/Product';


const ProductsPage = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await requests.products.list();
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchProducts();
    
  }, []);

  if(loading) {
    return <Loading message="Loading products..." />
  }

  return <ProductList products={products} />
}

export default ProductsPage

