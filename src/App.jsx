import {Navigate, Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Header from './components/Header/Header'
import Profile from './pages/Profile/Profile'
import { ToastContainer } from 'react-toastify'
import {  useSelector } from 'react-redux'
import FlexContainer from './containers/FlexContainer'
import TeacherClassroom from './pages/Classrooms/Teacher/TeacherClassroom'
import StudentClassroom from './pages/Classrooms/Student/StudentClassroom'
import ClassroomDetail from './pages/Classrooms/Detail/ClassroomDetail'
import ExamManagement from './pages/Exam/ExamManagament/ExamManagement' 
import MyExams from './pages/Exam/MyExams/MyExams'
import ExamDetail from './pages/Exam/Detail/ExamDetail'
import EnterExam from './pages/Exam/EnterExam/EnterExam'
import StudentClassroomDetail from './pages/Classrooms/Student/StudentClassroomDetail'
import Results from './pages/Results/Results'
import ResultsDetail from './pages/Results/ResultsDetail'
import 'react-toastify/dist/ReactToastify.css';
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
          path:"/my-exams",
          element : user ? <MyExams/> : <Navigate to="/login"/>
        },
        {
          path: "/classroom-detail/:id",
          element : user ? <ClassroomDetail/> : <Navigate to="/login"/>
        },
        {
          path: "/student-classroom-detail/:id",
          element : user ? <StudentClassroomDetail/> : <Navigate to="/login"/>
        },
        {
          path: "/exam-detail/:id",
          element : user ? <ExamDetail/> : <Navigate to="/login"/>
        },
        {
          path: "/classrooms-management",
          element : user?.userRole === "teacher" ? <TeacherClassroom/> : <Navigate to="/login"/>
        },
        {
          path: "/enter-exam/:id",
          element : user?.userRole === "student" ? <EnterExam  /> : <Navigate to="/login"/>
        },
        {
          path: "/my-classrooms",
          element : user?.userRole === "student" ? <StudentClassroom/> : <Navigate to="/login"/>
        },
        {
          path: "/results",
          element : user?.userRole === "student" ? <Results/> : <Navigate to="/login"/>
        },
        {
          path: "/results/:id",
          element : user?.userRole === "student" ? <ResultsDetail/> : <Navigate to="/login"/>
        },
        {
          path: "/exam-management",
          element : user?.userRole === "teacher" ? <ExamManagement/> : <Navigate to="/login"/>
        }
      ]
    }
  ])

  return <RouterProvider router={router}/>
  
}

export default App