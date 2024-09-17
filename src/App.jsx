import React, { useEffect } from 'react'
import {Navigate, Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Header from './components/Header/Header'
import Profile from './pages/Profile/Profile'
import { ToastContainer } from 'react-toastify'
import {  useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import FlexContainer from '../containers/FlexContainer'
import ClassroomManagement from './pages/Classrooms/ClassroomManagement'
import Classrooms from './pages/Classrooms/Classrooms'
import Admin from './pages/Admin/Admin'
import Test from './pages/Test'
import ClassroomDetail from './pages/Classrooms/ClassroomDetail'

const App = () => {

  const { user } = useSelector((store) => store.user);


  const Layout = () => {
    return (
      <FlexContainer>
        <ToastContainer/>
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
          path : "register",
          element :<Register/>
        },
        {
          path : "login",
          element :<Login/>
        },
        {
          path :"classrooms",
          element : user && user.userRole === "student" ? <Classrooms/> : <Navigate to="/"/>
        },
        {
          path :"classrooms-management",
          element : user && user.userRole === "teacher" ? <ClassroomManagement/> : <Navigate to="/"/>
        },
        {
          path:"/profile",
          element : user ? <Profile/> : <Navigate to="/login"/>
        },
        {
          path:"/test",
          element : <Test/>
        },
        {
          path : "/admin",
          element : user && user.userRole === "admin" ? <Admin/> : <Navigate to="/login"/>
        },
        {
          path : "classroom/:id",
          element : <ClassroomDetail/>
        }
      ]
    }
  ])

  return <RouterProvider router={router}/>
  
}

export default App