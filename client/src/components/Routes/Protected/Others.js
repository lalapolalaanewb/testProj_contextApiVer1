import React,  { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { GlobalContext } from '../../../context/GlobalState'
import { setCookie } from '../../../utils/Cookie/Cookie'

const Others = ({ component: Component, ...rest }) => {
  /** auth - states & actions */
  const {
    // global
    loading,
    // states
    authenticated,
    // actions
    isAuth
  } = useContext(GlobalContext)

  /** check user existance - function */
  useEffect(() => {
    isAuth()
  }, [])
  
  return (
    <Route 
      {...rest} render={
        props => {
          if(loading) return <div className="lds-hourglass"></div>
          if(authenticated) {
            // save last page seen address (url)
            setCookie('onRefresh', props.location.pathname, { path: '/' }) 
            return <Component {...props} />
          }
          else return <Redirect to={
            {
              pathname: "/test-admin",
              state: { from: props.location }
            }
          } />
        }
      } 
    />
  )
}

export default Others