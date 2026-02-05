import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router';
import { currencyTRY } from '../utils/formats';
import type { Product } from '../types/Product';
import { useDispatch, useSelector } from 'react-redux';
import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { addItemToCart } from '../pages/cart/cartSlice';

const ProductCard = ({ product }: { product: Product }) => {
    //const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, UnknownAction>>();
    const {status,cart} = useSelector((state: any) => state.cart);
    /*
        function handleAddItem(productId: string) {
            setLoading(true);
            requests.carts
                .addItem(productId)
                .then(cart => dispatch(setCart(cart)))
                .catch(error => console.log("Error adding item to cart:", error))
                .finally(() => setLoading(false));
        }
    */
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
                {
                    
                    status === 'pendingAddItem' + product.id ? (<CircularProgress size={20} color="secondary" />) : (
                    <Button onClick={() => dispatch(addItemToCart({ productId: product.id }))} variant="contained" color="secondary">
                        "Add to Cart"
                    </Button>
                )}
            </CardActions>
        </Card>


    )
}

export default ProductCard


