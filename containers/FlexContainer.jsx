import React from 'react';

const FlexContainer = ({ children }) => {
  return (
    <div className='flex flex-col w-full h-screen bg-[#f9f9f9]'>
      {children}
    </div>
  );
};

export default FlexContainer;
