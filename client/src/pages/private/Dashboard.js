import React, { useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalState'

const Dashboard = () => {
  /** dashboard - states & actions */
  const {
    // global
    loading,
    error,
    message,
    // states
    user,
    // actions
    getDashboard
  } = useContext(GlobalContext)

  /** get dashboard - function */
  useEffect(() => {
    (() => {
      getDashboard()
    })()
  }, [])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Message: {message}</p>}
      <h1>Dashboard!</h1>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Name: {user.name}</p>
    </div>
  )
}

export default Dashboard