import React, { Children } from 'react'
import {NavBar} from '../components'

const Layout = ({children}:any) => {
  return (
    <>
    <NavBar/>
    {children}
    </>
  )
}

export default Layout