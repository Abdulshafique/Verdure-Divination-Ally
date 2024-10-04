import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const CustomNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/"><strong>Verdure Divination Ally</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/Home">Home</Nav.Link>
            <Nav.Link as={Link} to="/Plants">Plants</Nav.Link>
            <Nav.Link as={Link} to="/Upload">Upload</Nav.Link>
            <Nav.Link as={Link} to="/Signup">Signup</Nav.Link>
            <Nav.Link as={Link} to="/Login">Login</Nav.Link>
            <Nav.Link as={Link} to="/Profile"><FaUser /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
