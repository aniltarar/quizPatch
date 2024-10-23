import AdminLayout from "~/layouts/AdminLayout";
import { roleLoader } from "~/loaders/roleLoader";
import Admin from "~/pages/Admin/Admin";
import AdminStudents from "~/pages/Admin/AdminStudents";
import AdminTeachers from "~/pages/Admin/AdminTeachers";
import AdminExams from "~/pages/Admin/AdminExams";
import AdminClassrooms from "~/pages/Admin/AdminClassrooms";

export const AdminRoutes = {
  path: "/",
  element: <AdminLayout />,
    children: [
      {path:"/admin" , element: <Admin/>, loader: () => roleLoader(["admin"])},
      {path:"/admin/students" , element: <AdminStudents/>, loader: () => roleLoader(["admin"])},
      {path:"/admin/teachers" , element: <AdminTeachers/>, loader: () => roleLoader(["admin"])},
      {path:"/admin/exams" , element: <AdminExams/>, loader: () => roleLoader(["admin"])},
      {path:"/admin/classrooms" , element: <AdminClassrooms/>, loader: () => roleLoader(["admin"])},
  ]
}