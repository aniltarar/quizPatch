import AdminLayout from "~/layouts/AdminLayout";
import { roleLoader } from "~/loaders/roleLoader";
import Admin from "~/pages/Admin/Admin";

export const AdminRoutes = {
  path: "/",
  element: <AdminLayout />,
    children: [
      {path:"/admin" , element: <Admin/>, loader: () => roleLoader(["teacher"])
 }
  ]
}