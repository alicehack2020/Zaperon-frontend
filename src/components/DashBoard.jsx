import { Button, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import Cookies from 'js-cookie';

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
        await axios.get('http://localhost:8080/auth/isLogin',
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
    await axios.get('http://localhost:8080/auth/logout')
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
    <ToastContainer />
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-around',margin:'10px' }}>
      <Button> Welcome {user}</Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: '200px' }} onClick={logout}>Logout</Button>
    </Stack>
  </>
   
  )
}

export default DashBoard