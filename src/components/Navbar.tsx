import { AppBar, Badge, Box, Button, IconButton, Toolbar } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from 'react'
import { Link, NavLink } from 'react-router';

const links = [
  { title: 'Home', path: '/' },
  { title: 'Products', path: '/products' },
]

const authLinks = [
  { title: 'Login', path: '/login' },
  { title: 'Register', path: '/register' },
]


const Navbar = () => {
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
            <Badge badgeContent={2} color='secondary'>
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