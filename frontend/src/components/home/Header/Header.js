import React from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import { NavLink as RouterNavLink } from 'react-router-dom';
// import { NavItem, NavLink } from 'reactstrap';
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';


function Header() {
    return (
        <Navbar style={{ backgroundColor:'#6b42ff'}} expand="lg" className="custom-navbar">
        <Container fluid>
          <Navbar.Brand style={{color:'white'}} href="#">EventEase</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              
              <Link to="/" className="nav-link" style={{color:'white'}}>Home</Link>
              <Link to="/events" className="nav-link" style={{color:'white'}}>Events</Link>
              <Link to="/RegisterEvent" className="nav-link" style={{color:'white'}}>RegisterEvent</Link>
              
                {/* <Router>
                <Link to="/tt" className="nav-link" style={{color:'white'}}>Home</Link>
              

          
                
        
             
                <Link to="/about" className="nav-link" style={{color:'white'}}>About</Link>
           
          
                <Link to="/contact" className="nav-link" style={{color:'white'}}>Contact</Link>
        
              </Router> */}
              {/* <Nav.Link style={{color:'white'}} className="ram" href="#action1">Home</Nav.Link>
              <Nav.Link style={{color:'white'}} href="#action2">Events</Nav.Link>
              <Nav.Link style={{color:'white'}} href="#action3">About Us</Nav.Link>
              <Nav.Link style={{color:'white'}} href="#action4">Contact</Nav.Link>
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link> */}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" style={{backgroundColor:'white', color: 'black'}}>Search</Button>
            </Form>
            <Link to="/Login">
            <Button variant="primary" style={{backgroundColor:'white', color: 'black',margin:'0.25rem'}} type="submit">
        Login
      </Button>
      </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }


export default Header;