import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Header from './components/Header/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {  useSelector } from 'react-redux'

const App = () => {


  const {user} = useSelector(state => state.user)


  return (
    <Router>
      <Header/>
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App