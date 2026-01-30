import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import { Container } from '@mui/material'
import { ToastContainer } from 'react-toastify'


const MainLayout = () => {
  return (
    <>
    <ToastContainer position='bottom-right' />
      <Navbar />
      <Container sx={{ marginTop: 4 }}>
        <Outlet />
      </Container> 
    </>
  )
}

export default MainLayout