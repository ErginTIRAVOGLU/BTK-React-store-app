import { Alert, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router';

const NotFoundPage = () => {
    const { state } = useLocation();
    return (
        <Paper sx={{ p: 3 }}>

            <>
                <Typography variant='h4'>
                    Not Found
                </Typography>
                <Alert severity='error'>
                    The requested resource was not found
                </Alert>
            </>

            <Button variant='contained' component={Link} to={'/'} sx={{ mt: 2 }}>
                Ana Sayfaya Dön
            </Button>
        </Paper>
    )
}

export default NotFoundPage