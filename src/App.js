import React, { useState } from 'react';
import user from "./img/ic_user.svg"
import companyIcon from "./img/zaperon_logo.png"
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Typography,
  Box,
  Container,
  Grid,
  Avatar,
  Stack,
} from '@mui/material';
import { Image, Visibility, VisibilityOff } from '@mui/icons-material';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (!email || !password) {
      if (!email) setEmailError('Please enter email');
      if (!password) setPasswordError('Password must be at least 8 characters long');
      return;
    }
    // Email validation using regex
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    setLoading(true);
    // Simulating an API call
    setTimeout(() => {
      setLoading(false);
      // Handle successful login here
    }, 2000);
  };

  return (

    <>
      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}>
            


        <Grid item xs={3} style={{ margin: '10px' }}>
              <center>
            <Box
                component="img"
                sx={{
                  height: 233,
                  width: 350,
                  backgroundColor: '#EFEFEF',
                  borderRadius: '50%',
                  padding:'30px',
                  maxHeight:'100px',
                  maxWidth: '100px',
                  }}
                alt="The house from the offer."
                src={user}
                  
                />
                
                </center>
            
                    
              
          <Typography style={{color:'#0B3558',fontWeight:'bold',fontSize:'3rem'}} align='center'>Welcome!</Typography>     
          <Typography style={{color:'#0B3558'}} align='center'>Let's connect to your workspace.</Typography>     
          <Typography style={{color:'#0B3558'}} align='center'>Please enter your email to continue.</Typography>     

                
              <form >
                
              <TextField
              sx={{fontWeight: '1px',color: '#0B3558',
              '& label': {
              fontWeight: 'bold'
              },
              '& input': {  
              fontWeight: 'bold',
              color: '#395B78'
              }
              }}
              label="Email Address"
              type="email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              margin="normal"
              error={!!emailError}
              helperText={emailError}
            />
              <TextField
                sx={{
              fontWeight: '1px',
              color: '#0B3558',
              '& label': {
              fontWeight: 'bold'
              },
              '& input': {  
              fontWeight: 'bold',
              color: '#395B78'
              }
              }}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} style={{ color: '#395B78' }}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!passwordError}
              helperText={passwordError}
                  />
                    
              <Typography style={{color:'#0E3B93',fontWeight:'bold'}} align='right'>Forgot Password</Typography>     
                  
              <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              onClick={handleSubmit}
              style={{ marginTop: '1rem',fontWeight:'bold',backgroundColor:'#003FB9' }}
            >
              {loading ? <CircularProgress size={24}/> : 'Sign In'}
            </Button>
          </form>
          
        
      </Grid>   
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-around',margin:'10px' }}>
        
        <Stack direction="row" sx={{alignItems:'center'}}>
          <Typography style={{ color: '#96A2AD' }}>Powered by</Typography> 
          <Box
                component="img"
                sx={{
                  height: 233,
                  width: 350,
                  padding:'30px',
                  maxHeight:'23px',
                  maxWidth: '100px',
                  }}
                alt="The house from the offer."
                src={companyIcon}
                  
                />
          

        </Stack>

        <Stack direction="row" spacing={2}>
          <Typography style={{fontWeight:'bold',color:'#003FB9' }}>Need Helps?</Typography>     
          <Typography style={{fontWeight:'bold',color:'#003FB9' }}>Privacy Policy <span style={{color:'gray'}}>&</span> Terms</Typography>     
        </Stack>

      </Stack>
      </Grid>
     
    </>
    
  );
};

export default App;