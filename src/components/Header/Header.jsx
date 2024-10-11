import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { tabs } from '~/data/data';
import { FiUser } from 'react-icons/fi';
import { logout } from '~/redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { IoExitOutline } from "react-icons/io5";
import { MdClass } from "react-icons/md";
import { BiPencil } from "react-icons/bi";

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    

    return (
        <header className='w-full bg-white flex-none min-h-16 px-12 border-b flex justify-between items-center'>
            <Link to="/" className='text-2xl bg-gradient-to-r bg-clip-text text-transparent from-orange-500 to-purple-500 font-bold'>QuizPatch
                <small className='text-xs'>v0.3.7 </small>
            </Link >

            <nav className='flex gap-x-5'>
                {user ? 
                <div className='flex gap-x-2'>
                    <Link to="/profile" className='bg-zinc-100 text-gray-700 hover:bg-zinc-200 border rounded-md text-sm px-4 py-2 transition-colors flex items-center gap-x-2'>
                        <FiUser />
                        {user?.displayName}
                    </Link>
                    
                    <Link to="/my-classrooms" className={`${user.userRole === "student" ? "flex" : "hidden"} bg-zinc-100 text-sm text-gray-700 hover:bg-zinc-200 border rounded-md px-4 py-2 transition-colors  items-center gap-x-2`}>
                        <MdClass />
                        Sınıflarım
                    </Link>
                    <Link to="/my-exams" className={`${user.userRole === "teacher" ? "flex" : "hidden"} bg-zinc-100 text-sm text-gray-700 hover:bg-zinc-200 border rounded-md px-4 py-2 transition-colors  items-center gap-x-2`}>
                        <MdClass />
                        Sınavlarım
                    </Link>
                    <Link to="/enter-exam" className={`flex  bg-zinc-100 text-sm text-gray-700 hover:bg-zinc-200 border rounded-md px-4 py-2 transition-colors  items-center gap-x-2`}>
                        <MdClass />
                        Sınav Çöz
                    </Link>
                

                    <Link to="/classrooms-management" className={`${user.userRole === "teacher" ? "flex" : "hidden"} bg-zinc-100 text-sm text-gray-700 hover:bg-zinc-200 border rounded-md px-4 py-2 transition-colors  items-center gap-x-2`}>
                        <MdClass />
                        Sınıf Yönetimi
                    </Link>
                    
                    <Link to="/exam-management" className={`${user.userRole === "teacher" ? "flex" : "hidden"} bg-zinc-100 text-sm text-gray-700 hover:bg-zinc-200 border rounded-md px-4 py-2 transition-colors  items-center gap-x-2`}>
                        <BiPencil />
                        Sınav Yönetimi
                    </Link>
                    <button onClick={() => dispatch(logout())} className='bg-zinc-100 text-gray-700 hover:bg-zinc-200 border rounded-md px-4 py-2 transition-colors flex items-center gap-x-2'> <IoExitOutline />Çıkış Yap</button>
                </div> : tabs.map((item) => (
                    <Link key={item.id} to={item.to} className='bg-zinc-100 text-gray-700 hover:bg-zinc-200 border rounded-md px-4 py-2 transition-colors flex items-center gap-x-2'>
                        <span><item.icon /></span>
                        <span>{item.title}</span>
                    </Link>
                ))}
            </nav>
        </header>
    );
}

export default Header;
