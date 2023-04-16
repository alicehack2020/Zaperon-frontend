import { Button, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const DashBoard = () => {

  const [user,setUser]=useState('')
  const navigate = useNavigate()
  
  useEffect(() => {
    checkUserLoginStatus()
  }, [])
  


  const checkUserLoginStatus = async() => {
    try {
      const token = localStorage.getItem("token");
      if (token)
      {
        await axios.get('http://localhost:8080/auth/isLogin',
        { headers: { "Authorization": `Bearer ${token}` } })
        .then((res) => {
          toast.success('Welcome', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        localStorage.setItem("token",res.data.data.token);
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
  



  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('userName');
    navigate('/login') 
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