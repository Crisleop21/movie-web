import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
function NavbarComponent({ query, handleSearch, changeHandler }) {
  return (
    <Navbar bg='dark' expand='lg' variant='dark'>
        <Container fluid>
          <Navbar.Brand href='/home'>MovieDB Web</Navbar.Brand>
          <Navbar.Brand href='/home'>
            Trending
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll'></Navbar.Toggle>
            <Navbar.Collapse id='nabarScroll'>
              <Nav 
                className='me-auto my-2 my-lg-3'
                style={{maxHeight: '100px'}}
                navbarScroll
              >
              </Nav>
              <Form className='d-flex' onSubmit={handleSearch}>
                <FormControl
                  type='search'
                  placeholder='Movie Search'
                  className='me-2'
                  aria-label='search'
                  name='query'
                  value={query} 
                  onChange={changeHandler}
                >
                </FormControl>
                <Button variant='secondary' type='submit'>Search</Button>
              </Form>
            </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default NavbarComponent;
