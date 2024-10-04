import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import './LandingSection.css'; // Make sure to adjust the import path as needed
import pic10 from '../Assets/back.jpg';

const LandingSection = () => {
  return (
    <div className="landing-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="landing-title">Identify Your Dream Plants</h1>
            <p className="landing-stats">
              <span>300+ Plant Species</span> | <span>100+ Customers</span>
            </p>
            <Button variant="primary" className="landing-button">
              Identify the Plant Species <FaSearch />
            </Button>
          </Col>
          <Col md={6} className="text-center">
            <div className="landing-image-container">
              <img src={pic10} alt="Plant" className="landing-image" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingSection;
