import React, { useEffect, useState } from 'react'
import ProductList from '../components/ProductList';


const ProductsPage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:5001/products');
        const data = await response.json();
        setProducts(data);
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
    return <div>Loading...</div>
  }

  return <ProductList products={products} />
}

export default ProductsPage

