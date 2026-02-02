import React from 'react'
import type { Product } from '../types/Product'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import ReportIcon from '@mui/icons-material/Report'
import { currencyTRY } from '../utils/formats'
import type { CartItem } from '../types/Cart'

const ProductItem = ({
    product,
    handleAddItem,
    cartItem,
    isAdding }: { product: Product | null, handleAddItem: (productId: string) => void, cartItem: CartItem, isAdding: boolean }) => {
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
                    <Typography variant='h5' color="secondary" sx={{ mt: 3 }}>
                        {currencyTRY.format(product?.price!)}
                    </Typography>
                    <Stack direction={'row'} display={"flex"} alignItems="center" gap={2} sx={{ mt: 3 }}>
                        <Button onClick={() => handleAddItem(product?.id!)} variant='contained' color='secondary' sx={{ mt: 3 }}>
                            Add to Cart
                        </Button>
                        {cartItem && (
                            <Typography variant='body2' sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                               <ReportIcon color="secondary" /> In Cart: {cartItem.product.quantity}
                            </Typography>
                        )}
                        {
                            isAdding && <CircularProgress size={24} />
                        }
                    </Stack>
                </Paper>


            </Grid>
        </Grid>
    )
}

export default ProductItem