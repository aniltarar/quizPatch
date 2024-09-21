import { FiUser } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";

export const tabs = [
  {
    id: 1,
    title: "Kayıt Ol",
    to: "/register",
    icon: FiUser,
  },
  {
    id: 2,
    title: "Giriş Yap",
    to: "/login",
    icon: MdAccountCircle,
  },
];


