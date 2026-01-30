import { Alert, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router';

const ServerErrorPage = () => {
    const { state } = useLocation();
    return (
        <Paper sx={{ p: 3 }}> 
            {state?.error ? (
                <>
                    <Typography variant='h4' gutterBottom>
                        {state.error.message} - {state.status}
                    </Typography>
                    <Alert severity='error'>
                        {state.error.detail || 'An unexpected server error has occurred'}
                    </Alert>
                </>
            ) : (
                <>
                    <Typography variant='h4'>
                        Server Error
                    </Typography>
                    <Alert severity='error'>
                        An unexpected server error has occurred
                    </Alert>
                </>
            )}
            <Button variant='contained' component={Link} to={'/'} sx={{ mt: 2 }}>
                Ana Sayfaya Dön
            </Button>
        </Paper>
    )
}

export default ServerErrorPage