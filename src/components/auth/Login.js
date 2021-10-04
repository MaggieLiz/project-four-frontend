import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Button, Container, Row } from 'react-bootstrap'

import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'

function Login() {
  const history = useHistory()
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })
  const [isError, setIsError] = React.useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser(formData)
      setToken(data.token)
      history.push('/items')
      location.reload()
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <Container className="form-container">
      <Row className="register-wrapper">
        <h1 className="comment-title">Login</h1>
      </Row>   
      <Row className="register-wrapper">     
        <form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-group">
            <label htmlFor="inputPassword">Username</label>
            <input 
              type="username" 
              className="form-control" 
              id="username"
              placeholder="Username"
              onChange={handleChange}
              name="username"
              value={formData.username}
            /> 
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="inputPassword"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={formData.password}
            />    
          </div>
          {isError && (
            <p>Incorrect Email or Password</p>
          )}
          <div className="btn-group btn-block">
            <Button 
              className="btn btn-block" 
              variant="secondary"
              type="submit"
            >
              Login
            </Button>
          </div>
          <p className="text-center">No account? Sign up <Link to="/auth/register">here</Link>.</p>
        </form>
      </Row>
    </Container>      
  )
}

export default Login