import React from 'react'
import Navbar from '../components/Navbar'
import Formd from '../components/Formd'

const Dashboard = ({setToken}) => {
  return (
    <div>
      <Navbar setToken={setToken} />
      <Formd/>
    </div>
  )
}

export default Dashboard
