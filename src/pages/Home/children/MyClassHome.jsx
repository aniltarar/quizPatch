import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiDetail,BiTrash } from "react-icons/bi";
import ReactPaginate from 'react-paginate';
import { db } from '~/firebase/firebaseConfig';
import { deleteDoc, doc ,updateDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClassrooms } from '~/redux/slices/classSlice';

const MyClassHome = ({ user }) => {
  const [currentPage, setCurrentPage] = useState(0); 
  const dispatch = useDispatch()
  const itemsPerPage = 4; 

  const {classrooms} = useSelector(state => state.classrooms.classrooms)


  const offset = currentPage * itemsPerPage;

  const currentItems = user?.classrooms?.slice(offset, offset + itemsPerPage) || [];

  const pageCount = Math.ceil((user?.classrooms?.length || 0) / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  const deleteClassRoom = (id) => {
    dispatch(deleteClassrooms({id,classrooms,user}))
  }


  return (
    <div className="col-span-3 row-span-2 border rounded-md bg-gradient-to-r from-orange-500 to-purple-500 p-[3px]">
      <div className="h-full w-full bg-white rounded flex flex-col">
        <div className='w-full bg-zinc-100 border-b h-10 rounded-t flex justify-start items-center px-3'>
          <h1 className='text-center text-xs '>Sınıflarım</h1>
        </div>
        <div className='p-4 grid grid-cols-2 gap-3 '>
          {currentItems.map((classroom) => (
            <div key={classroom?.id} className='bg-white border rounded-md text-sm w-full py-1 px-4 flex justify-between items-center'>
              <div className='flex flex-col gap-y-1'>
                <span>{classroom?.className}</span>
                <span>Öğretmenler : {classroom.teachers.map((teacher) => teacher.displayName).join(', ')}</span>
                <span>Öğrenci Sayısı : {classroom.students.length}</span>
                <span>ID : {classroom.id}</span>
              </div>
              <div className='flex gap-x-1'>
              <Link to={`/classroom/${classroom.id}`} className='text-xl  text-blue-600  flex justify-center items-center  rounded-md'>
                <BiDetail />
              </Link>
              <button onClick={() => deleteClassRoom(classroom.id)} to={`/classroom/${classroom.id}`} className='text-xl  text-red-600  flex justify-center items-center  rounded-md'>
                <BiTrash/>
              </button>
              </div>
            </div>
          ))}
        </div>

        {/* React Paginate Component */}
        <div className='flex  mt-auto h-10'>
          <ReactPaginate
            previousLabel={"Geri"}
            nextLabel={"İleri"}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={" w-full flex justify-center items-center gap-x-5 text-blue-500"}
            pageLinkClassName={"text-sm  px-5 py-1 rounded"}
            activeClassName={'bg-blue-100 text-green-500 rounded'}

          />
        </div>
      </div>
    </div>
  );
};

export default MyClassHome;
