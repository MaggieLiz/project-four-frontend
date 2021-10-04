import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'

import { createComment, getSingleItem } from '../lib/api'
import ItemCard from './ItemCard'

function ItemComment() {
  const { itemId } = useParams()
  const history = useHistory()
  const [item, setItem] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !item && !isError
  const [formData, setFormData] = React.useState(
    {
      text: '',
    }
  )

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSingleItem(itemId)
        setItem(response.data)
      } catch (err) {
        setIsError(true)
      } 
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createComment(itemId, formData)
      history.push(`/items/${itemId}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <Row className="comments-container">
        <Col>
          <h1>Comments</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="leave a comment">Leave a comment</label>
              <Form.Control
                type="textarea"
                as="textarea"
                rows={3}
                className="form-control textarea"
                id="comment"
                placeholder="What do you think of this kit?"
                onChange={handleChange}
                name="text"
                value={formData.text}
              />  
            </div>
            <div className="field">
              <Button 
                variant="light"
                type="submit"
                className="btn-outline-secondary show-btn"
              >
            Submit  
              </Button>   
            </div>
          </form>
        </Col>
        <Col>
          {isError && <p>Something went wrong.</p>}
          {isLoading && <p>...loading</p>}
          {item && (
            <Container className="item-card-container">           
              <ItemCard item={ item } className="comment-card" />
            </Container>
          )}
        </Col>
      </Row>  
    </Container>
  )  
}

export default ItemComment