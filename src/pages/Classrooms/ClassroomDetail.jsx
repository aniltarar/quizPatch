import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ClassroomDetail = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  const findClassroom = user?.classrooms?.find((classroom) => classroom.id === id);

  if (!findClassroom) {
    return <div>Classroom not found or loading...</div>; 
  }

  return (
    <div>
      ClassroomDetail - {findClassroom.className}
    </div>
  );
};

export default ClassroomDetail;
