import React, { useEffect } from 'react'

const Test = () => {
    useEffect(() => {
        console.log('Test')
    }, [])
  return (
    <div>Test</div>
  )
}

export default Test