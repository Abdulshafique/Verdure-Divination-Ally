import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Custom CSS file for additional styling

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="align-items-center">
          <Col md={4}>
            <h5>Verdure Divination Ally</h5>
            <p>We help you identify your dream plant</p>
            <div className="d-flex social-icons">
              <FaFacebook className="me-3" />
              <FaInstagram className="me-3" />
              <FaTwitter className="me-3" />
            </div>
          </Col>
          <Col md={4}>
            <h5>Information</h5>
            <Nav className="flex-column">
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#product">Product</Nav.Link>
              <Nav.Link href="#blog">Blog</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5>Company</h5>
            <Nav className="flex-column">
              <Nav.Link href="#vda">VDA</Nav.Link>
              <Nav.Link href="#career">Career</Nav.Link>
              <Nav.Link href="#our-story">Our story</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4}>
            <h5>Contact</h5>
            <Nav className="flex-column">
              <Nav.Link href="#getting-started">Getting Started</Nav.Link>
              <Nav.Link href="tel:+92000000000">+92 0000000000</Nav.Link>
              <Nav.Link href="#resources">Resources</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <p className="text-center">&copy; 2023 all Right Reserved Term of use Verdure Divination Ally</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
