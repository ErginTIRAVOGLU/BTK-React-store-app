import { Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
 
import { AddCircleOutline, Delete,  RemoveCircleOutline } from '@mui/icons-material';
 
import { useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import requests from '../../api/apiClient';
import { currencyTRY } from '../../utils/formats';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, deleteItemFromCart, setCart } from './cartSlice';
 


const CartPage = () => {


  //const [status, setStatus] = useState({ loading: false, id: "" });
  const {cart, status} = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  
  const subTotal = cart?.cartItems.reduce((total, item) => total + ((Number(item.product?.price) ?? 0) * (Number(item.product?.quantity) ?? 0)), 0) ?? 0;

  const tax = subTotal * 0.20;
  const total = subTotal + tax;

  if (!cart || cart.cartItems.length === 0) {
    return <Typography component="h4">Ürün Yok</Typography>
  }
/*
  function handleAddItem(productId: string, id: string) {
    setStatus({ loading: true, id: id });
    requests.carts.addItem(productId)
      .then((cart) => dispatch(setCart(cart)))
      .catch((error) => console.log("Error adding item to cart:", error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }

  function handleRemoveItem(productId: string, id:string, quantity: number = 1) {
    setStatus({ loading: true, id: id });
    requests.carts.removeItem(productId, quantity)
      .then((cart) =>  dispatch(setCart(cart)))
      .catch((error) => console.log("Error removing item from cart:", error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }
*/


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Ürün</TableCell>
            <TableCell>Fiyat</TableCell>
            <TableCell>Adet</TableCell>
            <TableCell>Toplam</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            cart?.cartItems.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <img src={`http://localhost:5001/images/${item.product.image}`} alt={item.product.title} width={"50px"} />
                </TableCell>
                <TableCell>{item.product.title}</TableCell>
                <TableCell>{currencyTRY.format(item.product.price)} ₺</TableCell>
                <TableCell>

                  <Button onClick={() => dispatch(addItemToCart({ productId: item.product.productId }))}>
                    {status === "pendingAddItem" + item.product.productId ?
                      (
                        <CircularProgress size={24} />
                      ) :
                      (
                        <AddCircleOutline />
                      )
                    }
                  </Button>
                  {item.product.quantity}
                  <Button onClick={() => dispatch(deleteItemFromCart({ productId: item.product.productId, quantity: 1, key: "single" }))}>
                    {status === "pendingDeleteItem" + item.product.productId + "single" ?
                      (
                        <CircularProgress size={24} />
                      ) :
                      (
                        <RemoveCircleOutline />
                      )
                    }
                  </Button>

                </TableCell>
                <TableCell>{currencyTRY.format(((item.product.price) * item.product.quantity).toFixed(2))} ₺</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => dispatch(deleteItemFromCart({ productId: item.product.productId, quantity: item.product.quantity, key: "all" }))}>
                    {status === "pendingDeleteItem" + item.product.productId + "all" ?
                      (
                        <CircularProgress size={24} />
                      ) :
                      (
                        <Delete />
                      )
                    }
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          }
          <TableRow>
        
            <TableCell align='right' colSpan={5}>Ara Toplam</TableCell>
            <TableCell align='right' >{currencyTRY.format(subTotal)} ₺</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='right' colSpan={5}>KDV (20%)</TableCell>
            <TableCell align='right' >{currencyTRY.format(tax)} ₺</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='right' colSpan={5}>
              <Typography variant="h6">Genel Toplam</Typography>
            </TableCell>
            <TableCell align='right' >
              <Typography variant="h6">{currencyTRY.format(total)} ₺</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CartPage