import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react'
import { Link } from 'react-router';
import { currencyTRY } from '../utils/formats';
import type { Product } from '../types/Product';

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card>
            <CardActionArea component={Link} to={`/products/${product.id}`}>
                <CardMedia sx={{ height: 160, backgroundSize: "contain" }} image={`http://localhost:5001/images/${product.image}`} />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" color="primary.dark">
                        {product.title} <br />
                        {currencyTRY.format(product.price)}
                    </Typography>
                    <Typography variant="body1" color="secondary.dark">
                        {product.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton><FavoriteIcon color="secondary" /></IconButton>
                <Button variant="contained" color="secondary">Add to Cart</Button>
            </CardActions>
        </Card>


    )
}

export default ProductCard


