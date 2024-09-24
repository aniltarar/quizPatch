import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '~/firebase/firebaseConfig'
import { useDispatch } from 'react-redux'
import { getClassByID } from '~/redux/slices/classSlice'

const ClassroomDetail = () => {
    const {id} = useParams()
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getClassByID(id))
    },[dispatch])


    return (
    <div>ClassroomDetail - {id}</div>
  )
}

export default ClassroomDetail