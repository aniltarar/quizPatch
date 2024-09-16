import React, { useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate, Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom'
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


  const { user } = useSelector((store) => store.user);





  const Layout = () => {
    return (
      <FlexContainer>
        <Header/>
        <Outlet/>
      </FlexContainer>
    )
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element : <Layout/>,
      children: [
        {
          path: "/",
          element : user ? <Home/> : <Navigate to="/login"/>
         },
        {
          path : "/register",
          element :<Register/>
        },
        {
          path : "/login",
          element :<Login/>
        },
        {
          path :"classrooms",
          element : user ? <Classrooms/> : <Navigate to="/"/>
        },
        {
          path:"/profile",
          element : user ? <Profile/> : <Navigate to="/login"/>
        }
        
      ]
    }
  ])

  return <RouterProvider router={router}/>
  
}

export default App