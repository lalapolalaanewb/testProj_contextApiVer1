import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorAuth, isLogin } from '../../redux/actions'

const Login = () => {
  /** redux saga dispatch */
  const dispatch = useDispatch()

  /** auth - states */
  const error = useSelector(state => state.auth.error)
  const message = useSelector(state => state.auth.message)
  const loading = useSelector(state => state.auth.loading)

  /** user - states */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submit, setSubmit] = useState(false)

  /** user login - function */
  useEffect(() => {
    (() => {
      if(submit) { console.log(email); console.log(password)
        dispatch(isLogin(email, password))
        
        setPassword('')
        setSubmit(false)
      }
    })()
  }, [submit])

  return (
    <div style={{
      textAlign: 'center'
    }}>
      <h1>Login page</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Message: {message}</p>}
      <form onSubmit={e => {
        e.preventDefault()
        setSubmit(true)
      }}>
        <input 
          type="email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input 
          type="password"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login