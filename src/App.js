import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from './components/DashBoard'
import NotFound from './components/NotFound';
import Protected from './protect/Protected ';
import Login from './components/Login';
const App = () => {
  return (
    <>
       <Routes>
      <Route element={<Login />} path='/login' />
      <Route path="/" element={<Protected><DashBoard /></Protected>} /> 
       <Route element={<NotFound />} path='*' />
    </Routes>
    </>
  )
}

export default App