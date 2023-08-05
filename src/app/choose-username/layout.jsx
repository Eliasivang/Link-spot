import React from 'react'
import Header from '../components/Header'

function layout({children}) {
  return (
    <>
    <Header/>
    {children}
    </>
  )
}

export default layout