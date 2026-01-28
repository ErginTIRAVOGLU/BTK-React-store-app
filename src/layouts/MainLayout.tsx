import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import { Container } from '@mui/material'


const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: 4 }}>
        <Outlet />
      </Container> 
    </>
  )
}

export default MainLayout