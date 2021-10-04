import React from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../lib/auth'

function Header() {
  useLocation()
  const isAuth = isAuthenticated()
  // const [isOpen, setIsOpen] = React.useState(false)
  // const { pathname } = useLocation()
  const history = useHistory()

  // const handleToggle = () => {
  //   setIsOpen(!isOpen)
  // }

  // React.useEffect(() => {
  //   setIsOpen(false)
  // }, [pathname])

  const logOut = () => {
    removeToken()
    history.push('/')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>SWAPxSHOP</Navbar.Brand>
        </LinkContainer>  
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ml-auto">
            
            <LinkContainer to='/items/'>
              <Nav.Link>
                <i className="fas fa-tshirt"></i>Shop
              </Nav.Link>
            </LinkContainer>
            
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart'></i>Cart
              </Nav.Link>
            </LinkContainer>
            {!isAuth && (
              <LinkContainer to='/auth/login'>
                <Nav.Link>
                  <i className='fas fa-user'></i>Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {isAuth && (
              <LinkContainer to='/items/new/'>
                <Nav.Link>
                  Sell My Kit
                </Nav.Link>
              </LinkContainer>
            )}
            {isAuth && (
              <LinkContainer to='/auth/profile/'>
                <Nav.Link>
                  My Account
                </Nav.Link>
              </LinkContainer>
            )}
            {isAuth && (
              <Button 
                variant="light" 
                className="btn-outline-secondary" 
                onClick={logOut}>Log Out</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header