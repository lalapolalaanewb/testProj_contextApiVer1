import React,  { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingAuth, isAuthenticated } from '../../../redux/actions'
import { setCookie } from '../../../utils/Cookie/Cookie'

const Others = ({ component: Component, ...rest }) => {
  /** redux saga dispatch */
  const dispatch = useDispatch()

  /** auth - states */
  const authenticated = useSelector(state => state.auth.authenticated)
  const loading = useSelector(state => state.auth.loading)

  /** check user existance - function */
  useEffect(() => {
    dispatch(isAuthenticated())
    dispatch(setLoadingAuth(false))
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