import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {url} from '../utils';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const theme = createTheme();

export default function SignIn() {
    const [login,setLogin] = useState(false)
    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const curl = url+"users/login";
    axios.post(curl,{
        mail:data.get('email'),"password":data.get('password')
    }).then((res)=>{
        setLogin(true)
        sessionStorage.setItem("current_user_id", res.data.user[0]._id);
        sessionStorage.setItem("token", res.data.token);
        console.log(res)
    }).catch((errer)=>{
        alert("Login ou mot de passe incorrecte!")
    })
    
  };
    if(!login){
    return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Se connecter
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/***
             * <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
             * 
             */

            }
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Je n'ai pas encore un compte - s'enregistrer"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );}else{
      return <Navigate to="/dashboard" />
  }
  
  
}