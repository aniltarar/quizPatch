import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { db } from "~/firebase/firebaseConfig";
import Layout from "~/layouts/Layout";
import { roleLoader } from "~/loaders/roleLoader";
import ClassroomDetail from "~/pages/Classrooms/Detail/ClassroomDetail";
import StudentClassroom from "~/pages/Classrooms/Student/StudentClassroom";
import StudentClassroomDetail from "~/pages/Classrooms/Student/StudentClassroomDetail";
import TeacherClassroom from "~/pages/Classrooms/Teacher/TeacherClassroom";
import ExamDetail from "~/pages/Exam/Detail/ExamDetail";
import EnterExam from "~/pages/Exam/EnterExam/EnterExam";
import ExamManagement from "~/pages/Exam/ExamManagament/ExamManagement";
import MyExams from "~/pages/Exam/MyExams/MyExams";
import Feedback from "~/pages/Feedback/Feedback";
import Home from "~/pages/Home/Home";
import Profile from "~/pages/Profile/Profile";
import Results from "~/pages/Results/Results";
import ResultsDetail from "~/pages/Results/ResultsDetail";
import Test from "~/pages/Test/Test";
import NoVerified from "~/pages/Warnings/NoVerified";

export const HomeRoutes = () => {


    const [teacher,setTeacher] = useState(null)
    const {user} = useSelector((state) => state.user);

    

    const fetchTeacher = async () => { 
        try{
        const teacherRef = doc(db, "teachers", user.uid);
            const teacherData = await getDoc(teacherRef);
            setTeacher(teacherData.data())
      }
      catch(e){
        console.log(e)
      }
    }

    useEffect(()=>{
      fetchTeacher()

    },[])

    return  {
    path: "/",
    element: <Layout />,
    children: [
        {
          path: "/",
          element: <Home />,
          loader: () => roleLoader(["teacher", "student","admin"]),
         },
        {
         path:"/profile",
         element: <Profile />,
         loader: () => roleLoader(["teacher", "student","admin"]),
        },
        {
          path:"/my-exams",
            element: teacher?.isVerified === true ?  <MyExams /> : <Navigate to="/un-verified"/>,
          loader: () => roleLoader(["teacher"]),
        },
        {
          path: "/classroom-detail/:id",
            element: teacher?.isVerified === true ?  <ClassroomDetail /> : <Navigate to="/un-verified"/>,
            loader: () => roleLoader(["teacher"]),
        },
        {
          path: "/student-classroom-detail/:id",
            element: <StudentClassroomDetail />,
            loader: () => roleLoader(["student"]),
        },
        {
          path: "/exam-detail/:id",
            element: teacher?.isVerified === true ?  <ExamDetail /> : <Navigate to="/un-verified"/>,
          loader: () => roleLoader(["teacher"]),
        },
        {
          path: "/classrooms-management",
            element: teacher?.isVerified === true ?  <TeacherClassroom /> : <Navigate to="/un-verified"/>,
          loader: () => roleLoader(["teacher"]),
        },
        {
          path: "/enter-exam/:id",
            element: <EnterExam />,
          loader: () => roleLoader(["student"]),
        },
        {
          path: "/my-classrooms",
            element: <StudentClassroom />,
           loader: () => roleLoader(["student"]),
        },
        {
          path: "/results",
          element :  <Results/>,
               loader: () => roleLoader(["student"]),
        },
        {
          path: "/results/:id",
        element: <ResultsDetail />,
         loader: () => roleLoader(["student"]),

        },
          {
          path: "/un-verified",
        element: <NoVerified />,
         loader: () => roleLoader(["teacher"]),

        },
        {
          path: "/exam-management",
            element: teacher?.isVerified === true ?  <ExamManagement /> : <Navigate to="/un-verified"/>,
          loader: () => roleLoader(["teacher"]),
        },
        {
          path:"/feedback",
          element: <Feedback/>,
          loader: () => roleLoader(["teacher", "student"]),
        },
        {
          path:"/test",
          element: <Test/>,
          loader: () => roleLoader(["teacher", "student"]),
        }
      ]
}
}