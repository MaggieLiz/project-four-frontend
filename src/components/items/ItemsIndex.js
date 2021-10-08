import React from 'react'
// import { ButtonGroup } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { Container, Row, Col, Button } from 'react-bootstrap'

import { getAllItems } from '../lib/api'
import ItemCard from './ItemCard'
// import TeamOptions from '../common/TeamOptions'

function ItemsIndex() {
  const [items, setItems] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !items && !isError
  const [searchValue, setSearchValue] = React.useState('')
  const history = useHistory()
  const rootElement = document.documentElement
  // const teamOptions = TeamOptions()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllItems()
        setItems(response.data)
      } catch (err) {
        setIsError(true)
      } 
    }
    getData()
  }, [])

  const compareRecentlyAdded = (a, b) => {
    const bandA = a.id
    const bandB = b.id
    let comparison = 0
    
    if (bandA > bandB) {
      comparison = 1
    } else {
      comparison = -1
    }
    return comparison
  }

  // * SEARCH by TEAM

  const teamOptions = [
    { value: '', label: 'All Teams' },
    { value: 'arsenal', label: 'Arsenal Football Club' },
    { value: 'aston', label: 'Aston Villa Football Club' },
    { value: 'brentford', label: 'Brentford Football Club' },
    { value: 'brighton', label: 'Brighton & Hove Albion Football Club' },
    { value: 'burnley', label: 'Burnley Football Club' },
    { value: 'chelsea', label: 'Chelsea Football Club' },
    { value: 'crystal', label: 'Crystal Palace Football Club' },
    { value: 'everton', label: 'Everton Football Club' },
    { value: 'leeds', label: 'Leeds United Football Club' },
    { value: 'leicester', label: 'Leicester City Football Club' },
    { value: 'liverpool', label: 'Liverpool Football Club' },
    { value: 'manchester city', label: 'Manchester City Football Club' },
    { value: 'manchester united', label: 'Manchester United Football Club' },
    { value: 'newcastle', label: 'Newcastle United Football Club' },
    { value: 'norwich', label: 'Norwich City Football Club' },
    { value: 'southampton', label: 'Southampton Football Club' },
    { value: 'tottenham', label: 'Tottenham Hotspur Football Club' },
    { value: 'watford', label: 'Watford Football Club' },
    { value: 'west', label: 'West Ham United Football Club' },
    { value: 'wolverhampton', label: 'Wolverhampton Football Club' }
  ]
  // * SEARCH by TEAM
  const handleTeamSearch = (e) => {
    setSearchValue(e.value)
    // const selectedItems = selected ? selected.value : []
    // setFormData({ ...formData, [name]: selectedItems })
  }

  // * SEARCH by PLAYER
  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  
  const filteredItems = () => {
    return items.sort(compareRecentlyAdded).filter(item => {
      return (item.playerName.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      item.teamName.toLowerCase().includes(searchValue))
    })
  }
  // * NAV from bottom of page
  const handleHome = () => {
    history.push('/')
  }

  const handleScrollToTop = () => {
    rootElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Container className="Container">
      <Row className="search-bar-row">
        <Col className="search-bar-col">
          <Col className="search-bar player">
            <label htmlFor="header-search">
              Find a player or team
            </label>
            <div>
              <input  
                type="text"
                id="header-search"
                placeholder="Search"
                name="s"
                onChange={handleSearch}
              />
            </div>  
          </Col>
        </Col>
        <Col className="search-bar-col">
          <div className="form-group search-bar">
            <label htmlFor="teamName">Search by Team</label>
            <Select
              options={teamOptions}
              defaultValue="Search by Team"
              onChange={selected =>
                handleTeamSearch(selected, 'teamName')
              }
            />
          </div>
        </Col>        
      </Row> 
      <div className="card-deck">
        {isLoading && <p>...loading</p>}
        {items && filteredItems().map(item => (
          <Link key={item.id} to={`/items/${item.id}/`}>
            <ItemCard item={ item } />
          </Link>
        )
        )}
      </div> 
      <Container>
        <Row className="bottom-buttons">
          <Button 
            variant="light"
            className="btn-outline-secondary" 
            onClick={handleHome}>
            Home
          </Button>
          <Button
            variant="light"
            className="btn-outline-secondary"
            onClick={handleScrollToTop}
          >
          ↑ to top
          </Button>  
        </Row>
      </Container>         
    </Container>
    
  )
}

export default ItemsIndex