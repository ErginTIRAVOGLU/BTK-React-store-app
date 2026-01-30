import React from 'react'
import type { Product } from '../types/Product'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import { currencyTRY } from '../utils/formats'

const ProductItem = ({ product }: { product: Product | null }) => {
    return (
        <Grid container spacing={2}>
            <Grid size={{ lg: 4, md: 5, sm: 6, xs: 12 }}>
                <Paper variant='outlined' sx={{ p: 3 }}>
                    <img src={`http://localhost:5001/images/${product?.image}`} style={{ width: "100%" }} alt={product?.title} />
                </Paper>

            </Grid>
            <Grid size={{ lg: 8, md: 7, sm: 6, xs: 12 }}>
                <Paper variant='outlined' sx={{ p: 3 }}>
                    <Typography component="h1" variant='h4' color="secondary.dark">
                        {product?.title}
                    </Typography>
                    <Typography variant='body1'>
                        {product?.description}
                    </Typography>
                    <Typography variant='body1'>
                       {currencyTRY.format(product?.price!)}
                    </Typography>
                </Paper>


            </Grid>
        </Grid>
    )
}

export default ProductItem