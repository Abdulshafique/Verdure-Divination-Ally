// PlantModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PlantModal = ({ showModal, handleCloseModal, selectedPlant, formatImageUrl }) => (
  <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>{selectedPlant && selectedPlant[0].name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {selectedPlant && selectedPlant.map((plant, index) => (
        <div key={index}>
          <img src={formatImageUrl(plant.imageUrl)} alt={plant.name} style={{ width: '100%', marginBottom: '10px' }} />
        </div>
      ))}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default PlantModal;
