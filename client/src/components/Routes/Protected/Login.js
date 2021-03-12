import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLoadingAuth, isAuthenticated } from '../../../redux/actions'
import { getCookie } from '../../../utils/Cookie/Cookie' 

const Login = ({ component: Component, ...rest }) => {
  /** redux dispatch */
  const dispatch = useDispatch()

  /** auth states */
  const authenticated = useSelector(state => state.auth.authenticated)
  const loading = useSelector(state => state.auth.loading)

  /** check user authentication - function */
  useEffect(() => {
    dispatch(isAuthenticated())
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