import './App.css'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoginProtectedRoute, OthersProtectedRoute } from './components/Routes/Protected'
import { Login } from './pages/public'
import { Dashboard } from './pages/private'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => "Landing page"} />
        <LoginProtectedRoute exact path="/test-admin" component={Login} />
        <OthersProtectedRoute exact path="/test-admin/dashboard" component={Dashboard} />
        <Route path="*" component={() => "404 Not Found"} />
      </Switch>
    </Router>
  )
}

export default App