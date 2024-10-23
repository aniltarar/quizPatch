import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from '~/components/Header/Header'
import FlexContainer from '~/containers/FlexContainer'

  const Layout = () => {
    return (
      <FlexContainer>
        <ToastContainer/>
        <Header/>
        <Outlet/>
      </FlexContainer>
    )
  }

export default Layout