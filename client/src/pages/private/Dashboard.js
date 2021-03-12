import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorDashboard, setLoadingDashboard, isDashboard } from '../../redux/actions'

const Dashboard = () => {
  /** redux saga dispatch */
  const dispatch = useDispatch()

  /** dispatch - states */
  const error = useSelector(state => state.dashboard.error)
  const message = useSelector(state => state.dashboard.message)
  const loading = useSelector(state => state.dashboard.loading)
  const id = useSelector(state => state.dashboard.user.id)
  const email = useSelector(state => state.dashboard.user.email)
  const name = useSelector(state => state.dashboard.user.name)

  /** get dashboard - function */
  useEffect(() => {
    (() => {
      dispatch(isDashboard())
    })()
  }, [])

  return (
    <div>
      <h1>Dashboard!</h1>
      <p>ID: {id}</p>
      <p>Email: {email}</p>
      <p>Name: {name}</p>
    </div>
  )
}

export default Dashboard