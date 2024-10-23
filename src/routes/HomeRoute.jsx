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
import Home from "~/pages/Home/Home";
import Profile from "~/pages/Profile/Profile";
import Results from "~/pages/Results/Results";
import ResultsDetail from "~/pages/Results/ResultsDetail";
import NoVerified from "~/pages/Warnings/NoVerified";

export const HomeRoutes = {
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
            element: <MyExams />,
          loader: () => roleLoader(["teacher","admin"]),
        },
        {
          path: "/classroom-detail/:id",
            element: <ClassroomDetail />,
            loader: () => roleLoader(["teacher","admin"]),
        },
        {
          path: "/student-classroom-detail/:id",
            element: <StudentClassroomDetail />,
            loader: () => roleLoader(["student"]),
        },
        {
          path: "/exam-detail/:id",
            element: <ExamDetail />,
          loader: () => roleLoader(["teacher","admin"]),
        },
        {
          path: "/classrooms-management",
            element: <TeacherClassroom />,
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
          path: "/no-verified",
        element: <NoVerified />,
         loader: () => roleLoader(["teacher"]),

        },
        {
          path: "/exam-management",
            element: <ExamManagement />,
          loader: () => roleLoader(["teacher"]),
        }
      ]
}