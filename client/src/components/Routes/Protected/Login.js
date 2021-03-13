import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { GlobalContext } from '../../../context/GlobalState'
import { getCookie } from '../../../utils/Cookie/Cookie' 

const Login = ({ component: Component, ...rest }) => {
  /** auth - states & actions */
  const {
    // global
    loading,
    // states
    authenticated,
    // actions
    isAuth
  } = useContext(GlobalContext)

  /** check user authentication - function */
  useEffect(() => {
    isAuth()
  }, [])

  return (
    <Route 
      { ...rest } render={
        props => {
          if(loading) return <div className="lds-hourglass"></div>
          if(!authenticated) return <Component {...props} />
          else {
            let url = getCookie('onRefresh')
            
            return <Redirect exact to={{
              pathname: url !== '' ? url : '/test-admin/dashboard',
              state: { from: props.location }
            }} />
          }
        }
      }
    />
  )
}

export default Login