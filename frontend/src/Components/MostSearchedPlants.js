import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';
import './MostSearchedPlants.css'; // Custom CSS file for additional styling
import pic5 from '../Assets/coli.jpg';
import pic6 from '../Assets/mango.jpg';
import pic7 from '../Assets/lli.jpg';

const fetchPlantData = () => {
  // Simulating an API call with a promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          image: pic7, // Correct way to pass the imported image
          title: 'Lili'
        },
        {
          id: 2,
          image: pic6, // Correct way to pass the imported image
          title: 'Mango'
        },
        {
          id: 3,
          image: pic5, // Correct way to pass the imported image
          title: 'Cauliflower'
        }
      ]);
    }, 1000);
  });
};

const MostSearchedPlants = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetchPlantData().then(data => setPlants(data));
  }, []);

  return (
    <Container className="mt-5 most-searched-plants-section">
      <Row className="align-items-center">
        <Col md={4}>
          <h2>Most Searched Plants</h2>
          <p>Easiest way to identify plant species by uploading an image.</p>
          <Button variant="outline-primary" className="see-more-button">
            See more <BsArrowRight />
          </Button>
        </Col>
        <Col md={8}>
          <Row>
            {plants.map((plant) => (
              <Col md={4} key={plant.id} className="mb-4">
                <Card className="plant-card">
                  <Card.Img variant="top" src={plant.image} />
                  <Card.Body>
                    <Card.Title>{plant.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MostSearchedPlants;
