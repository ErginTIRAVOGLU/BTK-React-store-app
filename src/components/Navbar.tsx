import { AppBar, Badge, Box, Button, IconButton, Toolbar } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, NavLink } from 'react-router';
import { useCartContext } from '../context/CartContext';
import { useSelector } from 'react-redux';
 

const links = [
  { title: 'Home', path: '/' },
  { title: 'Products', path: '/products' },
  { title: 'Errors', path: '/errors' },
]

const authLinks = [
  { title: 'Login', path: '/login' },
  { title: 'Register', path: '/register' },
]


const Navbar = () => {
  const { cart } = useSelector((state: any) => state.cart);
  const itemCount = cart?.cartItems?.reduce((total, item) => total + (item.product?.quantity ?? 0), 0) ?? 0;

  return (
    <AppBar position='static' sx={{ backgroundColor: 'secondary.light' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <IconButton color='inherit'>
            <StorefrontIcon />
          </IconButton>
          {
            links.map((link) => (
              <Button key={link.title} component={NavLink} to={link.path} color='inherit'>{link.title}</Button>
            ))
          }
        </Box>

        <Box>
          <IconButton color='inherit' component={Link} to='/cart' size='large' edge='start'>
            <Badge badgeContent={itemCount} color='secondary'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {
            authLinks.map((link) => (
              <Button key={link.title} component={NavLink} to={link.path} color='inherit'>{link.title}</Button>
            ))
          }
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar