import React, { createContext, useReducer } from 'react'
import GlobalReducer from './GlobalReducer'
import axios from 'axios'
import { config, configPrivate } from '../utils/Header/Header'
import { getCookie } from '../utils/Cookie/Cookie'

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

        let result = res.data.data

        setCookie('uid', result.uid, { path: '/', expires: new Date(result.sato) })
        setCookie('onRefresh', '', { path: '/' })
        
        localStorage.setItem('uid', result.uid)

        setAuth(true)
        setLoading(false)
      } catch(err) {
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
        const res = getCookie('uid')

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

    // Action - GET data from Image DB (Backend Implementation)
    async function getImages() {
        try {
            const res = await axios.get('/api/v1/images')

            let images = res.data.data.images
            
            dispatch({
                type: 'GET_IMAGES',
                payload: images
            })
        } catch (err) {
            dispatch({
                type: 'IMAGES_ERROR',
                payload: err.response
            })
        }
    }

    // Action - DELETE an Image
    async function deleteImage(id) {
        try {
            await axios.delete(`/api/v1/images/${id}`)

            dispatch({
                type: 'DELETE_IMAGE',
                payload: id
            })
        } catch (err) {
            dispatch({
                type: 'IMAGES_ERROR',
                payload: err.response
            })
        }
    }

    // Action - Add an Image
    async function addImage(image) {
        // encapsulate in formdata
        const imageFormData = new FormData()
        imageFormData.append('file', image)

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        try {
            const res = await axios.post('/api/v1/images', imageFormData, config)    

            dispatch({
                type: 'ADD_IMAGE',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'IMAGES_ERROR',
                payload: err.response
            })
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
            // dashboard actions
        }}>
            {children}
        </GlobalContext.Provider>
    )
}