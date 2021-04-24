import React, { createContext, useReducer } from 'react'
import GlobalReducer from './GlobalReducer'
import axios from 'axios'
import { config, configPrivate } from '../utils/Header/Header'
import { getCookie, setCookie, removeCookie } from '../utils/Cookie/Cookie'

// Initial state
const initialState = {
  // auth
  authenticated: false,
  // dashboard
  user: {
    id: '',
    name: '',
    email: ''
  },
  // global
  loading: false,
  error: false,
  message: ''
}

//  Create context
export const GlobalContext = createContext(initialState)

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState)

  // Action Global - SET loading status
  async function setLoading(status) {
    dispatch({
      type: 'SET_LOADING',
      payload: status
    })
  }

  // Action Global - SET error status
  async function setError(error) {
    dispatch({
      type: 'SET_ERROR',
      payload: { error: error.status, message: error.message }
    })
  }

  // Action Auth Global - SET auth status
  async function setAuth(status) {
    dispatch({
      type: 'SET_AUTH',
      payload: status
    })
  }

  // Action Auth - SET auth for login (Backend Implementation)
  async function isLogin(email, password) {
    try {
      const res = await axios.post(
        '/api/v1/auth', 
        { uid: '', email, password }, 
        config
      )

      let result = res.data.data; console.log(result)

      setCookie('uid', result.uid, { path: '/', expires: new Date(result.sato) })
      setCookie('onRefresh', '', { path: '/' })
      
      localStorage.setItem('uid', result.uid)

      setAuth(true)
      setLoading(false)
    } catch(err) { console.log(err)
      setError({ status: true, message: err })
    }
  }

  // Action Auth - SET auth for logout (Backend Implementation)
  async function isLogout() {
    let uid = localStorage.getItem('uid')

    try {
      const res = await axios.post(
        '/api/v1/auth/logout', 
        // { uid: uid }, 
        // configPrivate
        { uid: uid },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${uid}`
          }
        }
      )

      let result = res.data

      if(result.success) {
        removeCookie('uid', { path: '/' })
        removeCookie('onRefresh', { path: '/' })
        localStorage.removeItem('uid')
      }

      setAuth(true)
      setLoading(false)
    } catch(err) {
      setError({ status: true, message: err })
    }
  }

  // Action Auth - SET auth for authenticated user (Frontend Implementation)
  async function isAuth() {
    try {
      // const res = getCookie('uid')
      let res = localStorage.getItem('uid')

      let result = res

      if(result) {
        setAuth(true)
      } else {
        setAuth(false)
      }

      setLoading(false)
    } catch(err) {
      setError({ status: true, message: err })
    }
  }

  // Action Dashboard - GET dashboard (Backend Implementation)
  async function getDashboard() {
    try {
      const res = await axios.get(
        '/api/v1/dashboard', 
        // configPrivate
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('uid')}`
          }
        }
      )

      let result = res.data.data

      dispatch({
        type: 'SET_DASHBOARD',
        payload: { id: result.id, email: result.email, name: result.name }
      })

      setLoading(false)
    } catch(err) {
      setError({ status: true, message: err })
    }
  }

  return (
    <GlobalContext.Provider value={{
        // global
        loading: state.loading,
        error: state.error,
        message: state.message,
        // auth states
        authenticated: state.authenticated,
        // dashboard state
        user: state.user,
        // auth actions
        isLogin,
        isLogout,
        isAuth,
        // dashboard actions
        getDashboard
    }}>
        {children}
    </GlobalContext.Provider>
  )
}