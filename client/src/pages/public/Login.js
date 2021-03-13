import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState'

const Login = () => {
  /** auth - action */
  const { isLogin } = useContext(GlobalContext)

  /** user - states */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submit, setSubmit] = useState(false)

  /** user login - function */
  useEffect(() => {
    (() => {
      if(submit) { console.log(email); console.log(password)
        isLogin(email, password)
        
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