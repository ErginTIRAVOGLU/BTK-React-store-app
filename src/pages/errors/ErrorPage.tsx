import { Alert, AlertTitle, Box, Button, List, ListItem, ListItemText } from '@mui/material'
import { useState } from 'react'
import requests from '../../api/apiClient'


const ErrorPage = () => {

  type ValidationError = {
    errors: string[];
    message?: string;
  };

  const [validationError, setValidationError] = useState<ValidationError | null>(null);

  function getValidationErrors() {
    requests.errors.get403Error().catch((data) => {

      setValidationError(data);

    });
  }

  return (
    <Box>
      {
        validationError && validationError.errors && (
          <Alert severity='error' sx={{ mb: 2 }}>
            <AlertTitle>
              {validationError.message}
            </AlertTitle>
            <List>
              {validationError.errors.map((error: string, index: number) => (
                <ListItem key={index}>
                  <ListItemText>{error}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Alert>
        )
      }
      <Button sx={{ mr: 2 }} variant='outlined' color='error' onClick={() => requests.errors.get400Error()}>Bad Request</Button>
      <Button sx={{ mr: 2 }} variant='outlined' color='error' onClick={() => requests.errors.get401Error()}>Unauthorized</Button>
      <Button sx={{ mr: 2 }} variant='outlined' color='error' onClick={() => { getValidationErrors() }}>Forbidden</Button>
      <Button sx={{ mr: 2 }} variant='outlined' color='error' onClick={() => requests.errors.get404Error()}>Not Found</Button>
      <Button sx={{ mr: 2 }} variant='outlined' color='error' onClick={() => requests.errors.get500Error()}>Server Error</Button>
      <Button sx={{ mr: 2 }} variant='outlined' color='error' onClick={() => requests.errors.getValidationError()}>Validation Error</Button>
    </Box>
  )
}

export default ErrorPage