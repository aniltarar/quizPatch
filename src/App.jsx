import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Header from './components/Header/Header'
import Classrooms from './pages/Classrooms/Classrooms'
import Profile from './pages/Profile/Profile'
import { ToastContainer } from 'react-toastify'
import {  useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import FlexContainer from '../containers/FlexContainer'

const App = () => {


  const {user} = useSelector(state => state.user)


  return (
    <Router>
      <FlexContainer>
      <Header/>
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/classrooms" element={<Classrooms/>}/>
        <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </FlexContainer>
    </Router>
  )
}

export default App