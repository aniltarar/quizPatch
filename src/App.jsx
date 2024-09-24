import {Navigate, Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Header from './components/Header/Header'
import Profile from './pages/Profile/Profile'
import { ToastContainer } from 'react-toastify'
import {  useSelector } from 'react-redux'
import FlexContainer from '../containers/FlexContainer'
import 'react-toastify/dist/ReactToastify.css';
import TeacherClassroom from './pages/Classrooms/Teacher/TeacherClassroom'
import StudentClassroom from './pages/Classrooms/Student/StudentClassroom'
import ClassroomDetail from './pages/Classrooms/Detail/ClassroomDetail'

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
          path : "/register",
          element :<Register/>
        },
        {
          path : "/login",
          element :<Login/>
        },
        {
          path:"/profile",
          element : user ? <Profile/> : <Navigate to="/login"/>
        },
        {
          path: "/classroom-detail/:id",
          element : user? <ClassroomDetail/> : <Navigate to="/login"/>
        },
        {
          path: "/classrooms-management",
          element : user?.userRole === "teacher" ? <TeacherClassroom/> : <Navigate to="/login"/>
        },
        {
          path: "/my-classrooms",
          element : user?.userRole === "student" ? <StudentClassroom/> : <Navigate to="/login"/>
        }
      ]
    }
  ])

  return <RouterProvider router={router}/>
  
}

export default App