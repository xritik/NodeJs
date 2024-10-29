import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = ({loginUser}) => {
  return (
    <>
      <h1>Welcome <i>{loginUser}</i>!</h1>
      <Link to={'/'} style={{display: 'flex', justifyContent: 'center'}}><button>Logout</button></Link>
      
    </>
  )
}

export default Dashboard