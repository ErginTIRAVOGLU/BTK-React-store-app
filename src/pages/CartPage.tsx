import React, { useEffect, useState } from 'react'
import requests from '../api/apiClient';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import type { Product } from '../types/Product';
import type { Cart, CartItem } from '../types/Cart';
import { currencyTRY } from '../utils/formats';
import { Delete } from '@mui/icons-material';
import Loading from '../components/Loading';

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requests.carts.getCart()
      .then(cart => {
        console.log("Cart from API:", cart);
        setCart(cart);
        setLoading(false);
      })
      .catch(error => console.log("Error fetching cart:", error))
      .finally(() => setLoading(false));
  }, []);

  if(loading) {
    return <Loading message="Yükleniyor..." />
  }
  if(!cart) {
    return <Typography component="h4">Ürün Yok</Typography>
  }

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
                <TableCell>{item.product.quantity}</TableCell>
                <TableCell>{currencyTRY.format(((item.product.price) * item.product.quantity).toFixed(2))} ₺</TableCell>
                <TableCell>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CartPage