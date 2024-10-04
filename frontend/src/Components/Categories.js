import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';
import './Categories.css'; // Custom CSS file for additional styling
import pic2 from '../Assets/fruit.jpg';
import pic3 from '../Assets/veg.jpg';
import pic4 from '../Assets/floral.jpg';

const Categories = () => {
  const navigate = useNavigate();

  const navigateToPlants = (category) => {
    navigate(`/plants?category=${category}`);
  };

  const handleExploreClick = () => {
    navigate('/Plants');
  };

  return (
    <Container className="mt-5 text-center categories-section">
      <h2>Categories</h2>
      <p>Find what you are looking for</p>
      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <Card className="category-card" onClick={() => navigateToPlants('Vegetable')}>
            <Card.Img variant="top" src={pic3} /> 
            <Card.Body>
              <Card.Title>Vegetable Plants</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="category-card" onClick={() => navigateToPlants('fruits')}>
            <Card.Img variant="top" src={pic2} />
            <Card.Body>
              <Card.Title>Fruit Plant</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="category-card" onClick={() => navigateToPlants('Floral')}>
            <Card.Img variant="top" src={pic4} />
            <Card.Body>
              <Card.Title>Floral Plants</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} className="text-center mt-3">
          <Button variant="outline-primary" size="med" onClick={handleExploreClick}>
            Explore <BsArrowRight />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Categories;
