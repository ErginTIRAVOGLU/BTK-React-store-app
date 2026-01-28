import { Grid } from '@mui/material';
import React from 'react'
import ProductCard from './ProductCard';
import type { Product } from '../types/Product';



type ProductListProps = {
  products: Product[];
};


const ProductList = ({ products }: ProductListProps) => {
  return (
    <Grid container spacing={2}>
        {products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard product={product}>

                </ProductCard>
                
            </Grid>
        ))}
    </Grid>
  )
}

export default ProductList