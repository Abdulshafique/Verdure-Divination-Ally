// PlantCard.js
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { formatImageUrl } from './Plants';

const PlantCard = ({ plant, handlePlantClick }) => {
  const imageUrl = formatImageUrl(plant.imageUrl);
  console.log("Formatted URL in plant card: ", imageUrl);
  return (
    <Col key={plant._id} sm={12} md={6} lg={4} className="mb-4">
      <Card onClick={() => handlePlantClick(plant)}>
        <Card.Img variant="top"  src={imageUrl} alt={plant.name} />
        <Card.Body>
          <Card.Title>{plant.name}</Card.Title>
          <Card.Text>
            <strong>Category:</strong> {plant.category_name}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PlantCard;
