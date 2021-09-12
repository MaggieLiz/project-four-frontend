import React from 'react'
import { useHistory } from 'react-router'
import { Button } from 'react-bootstrap'

import { registerUser } from '../lib/api'

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  profileImage: '',
}

function Register() {
  const history = useHistory()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  
  const handleChange = event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setFormData({ ...formData, [event.target.name]: value })
    setFormErrors({ ...formErrors, [event.target.name]: '' })
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await registerUser(formData)
      history.push('/login')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <section>
      <h1>This is the register user page</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            className="form-control" 
            aria-describedby="emailHelp" 
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />  
          <small className="form-text text-muted">We never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image</label>
          <input 
            type="file" 
            className="form-control" 
            id="profileImage"
            placeholder="Profile Image"
            onChange={handleChange}
            name="profileImage"
            value={formData.profileImage}
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
        <div className="form-group">
          <label htmlFor="inputPassword">Confirm Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="inputPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
          />    
        </div>
        <div className="btn-group">
          <Button className="btn-info" type="submit">Sign me up!</Button>
        </div>
      </form>
    </section>
    
  )
}

export default Register