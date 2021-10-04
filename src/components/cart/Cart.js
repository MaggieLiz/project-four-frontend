import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
// import { isAuthenticated } from '../lib/auth'

function Cart() {
  const history = useHistory()
  const [cart, setCart] = React.useState(JSON.parse(localStorage.getItem('cartItem')) || [])
  const [isEmpty, setIsEmpty ] = React.useState(true)
  // const isAuth = isAuthenticated()
  // const { itemId } = useParams()

  React.useEffect(() => {
    const getCart = () => {
      if (cart.length !== 0)
        setIsEmpty(!isEmpty)
    }
    getCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeFromCart = (itemId) => {
    const newItems = cart.filter(item => item.id !== itemId)
    setCart(newItems)
    localStorage.setItem('cartItem', JSON.stringify(newItems))
  }

  const checkout = () => {
    history.push('/cart/checkout')
  }

  const backToShop = () => {
    history.push('/items')
  }

  return (
    <section>
      <div>
        {cart.length === 0 && (
          <Container>
            <h1>Your cart is empty</h1>
          </Container>
          
        )}
      </div>
      
      <Container className="cart-wrapper">
        <div className="cart-left">
          {cart.map(item => (
            <Container className="cart" key={item.id}>
              <Row className="cart-item">
                <Col>
                  <Link  to={`/items/${item.id}/`}>
                    <img 
                      src={item.image} 
                      alt={item.playerName}
                      className="cart-image"
                    />
                  </Link>
                </Col>
                <Col>
                  <div>{item.playerName}</div>
                  <div>{item.teamName}</div>
                  <div>{item.price}</div>
                  <Button variant="light" 
                    className="btn-outline-secondary show-btn"
                    onClick={() => removeFromCart(item.id)}>
                  Remove from Cart
                  </Button>
                </Col>
              </Row>
            </Container>
          ))}

        </div>
        
        <div className="cart-right">
          <Col>
            {!isEmpty && (
              <div>
                <Button 
                  variant="light" 
                  className="btn-outline-secondary show-btn" 
                  onClick={checkout}>
                Proceed to Checkout
                </Button>
              </div>
            )}
            <div><Button 
              variant="light" 
              className="btn-outline-secondary show-btn" 
              onClick={backToShop}>
            Continue Shopping
            </Button></div>
            <div className="price-wrapper">
          Total: £<span className="price"> {cart.reduce((sum, price) => {
                return sum + Number(price.price)
              }, 0)}</span>
            </div>
          </Col>

        </div>

      </Container>
    </section>
  )
}
export default Cart
