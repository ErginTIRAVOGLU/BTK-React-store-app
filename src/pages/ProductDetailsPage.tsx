import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import ProductItem from '../components/ProductItem';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState(null);


  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:5001/products/${id}`);
        const data = await response.json();
        setProduct(data);
        console.log(data);
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
    return <div>Loading...</div>;
  }

  return (
    <ProductItem product={product} />
  )
}

export default ProductDetailsPage