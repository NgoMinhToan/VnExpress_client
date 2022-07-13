import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from "react-router-dom";

const Layout = () => {
  useEffect(() => {
    // window.history.scrollRestoration = 'auto';
    
  }, []);
  return (
    <div>
        <Header />
        <div className='body-content'>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Layout