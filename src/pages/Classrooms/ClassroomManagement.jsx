
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddClassroom from '~/components/ClassroomsComps/AddClassroom'
import MyClassrooms from '~/components/ClassroomsComps/MyClassrooms'


const ClassroomManagement = () => {


    return (
        <div className='w-full  px-5 py-10 flex flex-col md:flex-row gap-5'>
            <div className="leftSide w-full  md:w-4/6">
                <AddClassroom />
            </div>
            <div className="rightSide w-full md:w-2/6">
                <MyClassrooms/>
            </div>
        </div>
    )
}

export default ClassroomManagement