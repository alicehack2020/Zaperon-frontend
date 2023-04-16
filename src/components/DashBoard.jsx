import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userImage from "../img/ic_user.svg"
import companyIcon from "../img/zaperon_logo.png"
import axios from "axios"
import Cookies from 'js-cookie';
import { url } from '../constants/constants';
const DashBoard = () => {

  const [user,setUser]=useState('')
  const navigate = useNavigate()
  
  useEffect(() => {
    checkUserLoginStatus()
  }, [])
  


  const checkUserLoginStatus = async() => {
    try {
      const token = Cookies.get("token");    
      if (token)
      {
        await axios.get(`${url}/auth/isLogin`,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then((res) => {
          toast.success('Welcome', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          Cookies.set('token', res.data.data.token, { expires: 7, path: '/' });
          localStorage.setItem("userName",res.data.data.name);
          navigate('/')
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          setTimeout(() => {
            navigate('/login')
          },1000)
     })
    }
      
    }
    
    catch (error) {
    toast.error('Session Expired! Please Login', {
      position: toast.POSITION.BOTTOM_RIGHT
    });
      setTimeout(() => {
        navigate('/login')
      },1000)
    }
  } 



  useEffect(() => {
   try {
     let userName = localStorage.getItem('userName')
     setUser(userName)
   } catch (error) {
    
   }
  }, [])
  



  const logout = async () => {
    try {
    await axios.get(`${url}/auth/logout`)
      .then((res) => {
      
      toast.success(res.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      Cookies.remove('token');
      localStorage.removeItem('userName');
      navigate('/login') 
    })
    .catch((error) => {
      toast.error('Logout successful', {
        position: toast.POSITION.BOTTOM_RIGHT
      });

      setTimeout(() => {
        navigate('/login')
      },1000)
 })
    
    } catch (error) {
      
    }
    
  }

  return (<>
    <Grid
    container
    spacing={0}
    direction="column"
    justifyContent="center"
    style={{ minHeight: '90vh' }}>
          
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
              src={userImage}
                
              />
        <ToastContainer /> 
        <Typography style={{ color: '#0B3558', fontWeight: 'bold', fontSize: '3rem' }} align='center'>Welcome {user} !</Typography>     
        <Button variant='contained' onClick={logout}>logout</Button>
           
              </center>
          
                  
       
              
           
        
      
    </Grid>   
   
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
   
  </>
   
  )
}

export default DashBoard