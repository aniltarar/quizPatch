import {FiUser} from "react-icons/fi"
import { MdAccountCircle } from "react-icons/md";


export const tabs = [
    {
        id:1,
        title : "Register",
        to : "/register",
        icon : FiUser
    },
    {
        id:2,
        title : "Login",
        to : "/login",
        icon : MdAccountCircle
    }
]